export interface WorkExperience {
  id: string;
  period: string;
  organization: string;
  role: string;
  description: string[];
  tags: string[];
  location?: string;
  badge?: string;
}

export interface Education {
  id: string;
  period: string;
  degree: string;
  institution: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: string[];
}

export interface ProjectShowcase {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metric?: string;
  metricLabel?: string;
  details?: string;
}

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
