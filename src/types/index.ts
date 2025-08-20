export interface Announcement {
  id: string;
  title: string;
  body: string;
  link?: string;
  pinned: boolean;
  createdAt: string;
}

export interface Material {
  id: string;
  title: string;
  desc: string;
  url: string;
  type: string;
  module: string;
  createdAt: string;
}

export type UserRole = "Student" | "Professor" | "Class Representative";

export interface Module {
  key: string;
  title: string;
  desc: string;
}

export interface ScheduleItem {
  unit: number;
  topic: string;
  sessions: number;
}