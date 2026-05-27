# Firebase Security Specification (TDD SPEC)

## 1. Data Invariants
- An **Inquiry** must possess a valid name (1-200 chars), email (1-200 chars), message (1-5000 chars), and a `createdAt` timestamp matching `request.time`.
- Inquiries can only be created by public visitors; reading, modifying, or deleting inquiries is strictly blocked for the public to isolate PII.
- A **ChatSession** has an owner `userId` which must match `request.auth.uid`. No session can be accessed or list-queried by other users.
- A **ChatMessage** resides in `/sessions/{sessionId}/messages/{messageId}` and must belong to a session where the user is the owner (`parent.userId == request.auth.uid`).

## 2. The "Dirty Dozen" Payloads (Aesthetic Anti-Spoof test cases)
1. **Malicious Public Read on Inquiries**: Attempting to grab list of all contact inquiries. (Expect `PERMISSION_DENIED`)
2. **PII Leakage on Single Inquiry**: Trying to read someone else's specific inquiry document. (Expect `PERMISSION_DENIED`)
3. **Inquiry with Spoofed CreatedAt**: Submitting a contact option where `createdAt` is a pre-determined date string instead of `request.time`. (Expect `PERMISSION_DENIED`)
4. **Giant Inquiry Body**: Attempting a Denial of Wallet with a 10MB contact message. (Expect `PERMISSION_DENIED` due to size constraints)
5. **Session Injection**: Creating a chat session where `userId` is a different user's UID. (Expect `PERMISSION_DENIED`)
6. **Anonymous Hijacking**: Reading others' chat history by guessing session IDs. (Expect `PERMISSION_DENIED`)
7. **Ghost fields on session create**: Adding an unrequested field `isAdmin: true` inside a user's session doc. (Expect `PERMISSION_DENIED` via strict key-size and type validation)
8. **Message Injection**: Writing a chatbot bubble message into another recruiter's session. (Expect `PERMISSION_DENIED`)
9. **Role Escalation in Chat**: Injecting messages on behalf of the `model` as a client write. (Expect `PERMISSION_DENIED` unless writing valid role)
10. **Session Update-Gap**: Attempting to change the `createdAt` value of an existing chat session. (Expect `PERMISSION_DENIED` due to immutability constraints)
11. **Malicious ID Poisoning**: Specifying an ID path containing 1MB junk special characters like `%%%%%...` or deep paths. (Expect `PERMISSION_DENIED` via `isValidId()`)
12. **Blanket Query Scraping**: Submitting a general list query on `/sessions` without a `where` check for `userId`. (Expect `PERMISSION_DENIED` on the security rules match layer)

## 3. Security Rules Validation Strategy
We will implement safe, strong helper functions covering the fields to block every spoof attempt.
