import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { Send, Sparkles, User, RefreshCw, Layers, ArrowRight, CloudLightning } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db, ensureSignedIn, handleFirestoreError, OperationType } from "../firebase";
import { collection, doc, setDoc, getDocs, query, orderBy, serverTimestamp, updateDoc } from "firebase/firestore";

const SUGGESTED_PROMPTS = [
  "What was Sophorn's role in the WHO Malaria Elimination campaign?",
  "Tell me about his GIS & mapping background with NPA",
  "Is he available for regional IT coordination positions?",
  "What is his academic credentials, and what is he currently studying?"
];

export default function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hi there! I am Sophorn's Interactive AI Assistant. I can tell you all about his 20+ years of IT network administration, DHIS2 setup, ArcGIS spatial dashboards, and leadership experience. Ask me anything!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isFirebaseSync, setIsFirebaseSync] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    async function initChat() {
      try {
        const user = await ensureSignedIn();
        if (!user) return;

        let activeSessionId = localStorage.getItem("portfolio_chat_session_id");
        let loadedMessages: Message[] = [];

        if (activeSessionId) {
          // Attempt to load historic messages from Firestore to restore session State
          const messagesRef = collection(db, "sessions", activeSessionId, "messages");
          const q = query(messagesRef, orderBy("timestamp", "asc"));
          try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                loadedMessages.push({
                  id: docSnap.id,
                  role: data.role as "user" | "model",
                  text: data.text,
                  timestamp: data.timestamp?.toDate() || new Date()
                });
              });
            }
          } catch (err) {
            console.warn("Could not load previous session, creating a new session", err);
            activeSessionId = null;
          }
        }

        if (!activeSessionId) {
          activeSessionId = "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
          localStorage.setItem("portfolio_chat_session_id", activeSessionId);

          const sessionDocRef = doc(db, "sessions", activeSessionId);
          try {
            await setDoc(sessionDocRef, {
              id: activeSessionId,
              userId: user.uid,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, `sessions/${activeSessionId}`);
          }
        }

        setSessionId(activeSessionId);
        setIsFirebaseSync(true);

        if (loadedMessages.length > 0) {
          setMessages(loadedMessages);
        }
      } catch (err) {
        console.error("Failed to initialize Firebase Chat session", err);
      }
    }
    initChat();
  }, []);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessageId = "msg_user_" + Date.now();
    const userMsg: Message = {
      id: userMessageId,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 1. Persist the User's Message in Firestore
      if (sessionId) {
        const userMsgRef = doc(db, "sessions", sessionId, "messages", userMessageId);
        try {
          await setDoc(userMsgRef, {
            id: userMessageId,
            role: "user",
            text: textToSend,
            timestamp: serverTimestamp()
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `sessions/${sessionId}/messages/${userMessageId}`);
        }
      }

      const chatHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        text: m.text
      }));

      // 2. Fetch the Gemini AI reply
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!res.ok) {
        throw new Error("Unable to retrieve model generated text.");
      }

      const data = await res.json();
      
      const aiMessageId = "msg_ai_" + Date.now();
      const aiMsg: Message = {
        id: aiMessageId,
        role: "model",
        text: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);

      // 3. Persist the Model's Message in Firestore
      if (sessionId) {
        const aiMsgRef = doc(db, "sessions", sessionId, "messages", aiMessageId);
        const sessionRef = doc(db, "sessions", sessionId);
        try {
          await setDoc(aiMsgRef, {
            id: aiMessageId,
            role: "model",
            text: data.text,
            timestamp: serverTimestamp()
          });
          await updateDoc(sessionRef, {
            updatedAt: serverTimestamp()
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `sessions/${sessionId}/messages/${aiMessageId}`);
        }
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: String(Date.now() + 2),
        role: "model",
        text: "My apologies! I experienced a connection lag. Please verify that your Gemini API key is active in AI Studio Secrets, or re-submit your prompt in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    localStorage.removeItem("portfolio_chat_session_id");
    const welcomeMsg: Message = {
      id: "welcome",
      role: "model",
      text: "Hi there! I am Sophorn's Interactive AI Assistant. Ask me anything about his technical history, certifications, or previous projects!",
      timestamp: new Date()
    };
    setMessages([welcomeMsg]);
    setSessionId(null);
    setIsFirebaseSync(false);

    try {
      const user = await ensureSignedIn();
      if (!user) return;
      
      const activeSessionId = "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("portfolio_chat_session_id", activeSessionId);
      setSessionId(activeSessionId);

      const sessionDocRef = doc(db, "sessions", activeSessionId);
      await setDoc(sessionDocRef, {
        id: activeSessionId,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setIsFirebaseSync(true);
    } catch (err) {
      console.error("Failed to reset session in Firebase:", err);
    }
  };

  return (
    <div className="bg-navy/85 border border-teal-dark/30 rounded-2xl flex flex-col h-[520px] shadow-2xl relative overflow-hidden backdrop-blur-md" id="ai-recruiter-assistant">
      {/* Header */}
      <div className="bg-deep/90 border-b border-teal-dark/20 p-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-dark/30 border border-teal-light/40 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-gold animate-[pulse_2s_infinite]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-off-white flex items-center gap-1.5">
              Sophorn's AI Career Assistant
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_1.5s_infinite]"></span>
              <span className="text-[10px] text-muted-blue font-mono font-medium uppercase tracking-wider">
                Online • Powered by Gemini 3.5
              </span>
              {isFirebaseSync && (
                <span className="text-[9px] text-teal-light font-mono flex items-center gap-0.5" title="Conversations secured in Firebase Firestore">
                  <CloudLightning className="w-2.5 h-2.5 text-gold fill-gold" />
                  Synced
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleReset}
          title="Reset conversation history"
          className="text-muted-blue hover:text-gold p-1.5 rounded-md hover:bg-teal-dark/10 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ scale: 0.96, opacity: 0, y: 5 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              {/* Avatar Icon */}
              <div className={`w-7.5 h-7.5 rounded-full border shrink-0 flex items-center justify-center text-xs font-mono font-bold ${
                m.role === "user"
                  ? "bg-teal-dark border-teal-light/35 text-white"
                  : "bg-deep border-gold/30 text-gold"
              }`}>
                {m.role === "user" ? <User className="w-3.5 h-3.5" /> : "SL"}
              </div>

              {/* Text Bubble */}
              <div className={`rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed relative ${
                m.role === "user"
                  ? "bg-teal-dark/40 border border-teal-light/25 text-off-white rounded-tr-none"
                  : "bg-deep/70 border border-teal-dark/30 text-off-white/90 rounded-tl-none whitespace-pre-line"
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 max-w-[85%] mr-auto"
            >
              <div className="w-7.5 h-7.5 rounded-full bg-deep border border-gold/30 text-gold shrink-0 flex items-center justify-center text-xs font-mono font-bold">
                SL
              </div>
              <div className="rounded-2xl px-4 py-3 bg-deep/50 border border-teal-dark/25 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 border-t border-teal-dark/10 pt-3 bg-deep/20">
          <span className="text-[10px] uppercase font-mono text-muted-blue tracking-wider block mb-2 flex items-center gap-1">
            <Layers className="w-3 h-3 text-gold" />
            Suggested Recruiter Questions:
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-left text-[11px] bg-deep/90 hover:bg-teal-dark/20 text-teal-light hover:text-white border border-teal-dark/40 rounded-full px-3 py-1 font-sans transition-all flex items-center gap-1 cursor-pointer"
              >
                {prompt}
                <ArrowRight className="w-3 h-3 text-gold shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="bg-deep/90 border-t border-teal-dark/20 p-3 flex gap-2 shrink-0 items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about DHIS2, maps, demining, or references..."
          className="flex-1 bg-navy/60 border border-teal-dark/40 rounded-xl px-4 py-2 text-xs text-off-white outline-none focus:border-teal-light transition-all placeholder-muted-blue"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2 rounded-xl bg-teal-dark hover:bg-teal-light text-white disabled:bg-deep disabled:text-muted-blue/30 disabled:border-teal-dark/20 transition-all flex items-center justify-center border border-teal-light/25 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
