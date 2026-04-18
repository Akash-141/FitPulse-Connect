export interface LocationPoint {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  username: string;
  bio: string | null;
  fitness_level: string | null;
  location: LocationPoint | null;
  avatar_url: string | null;
}

export interface WorkoutExercise {
  name: string;
  sets?: number;
  reps?: number;
  duration?: number;
  notes?: string;
}

export interface Workout {
  id: string;
  user_id: string;
  title: string;
  exercises: WorkoutExercise[];
  duration: number;
  date: string;
}

export type MatchStatus = "pending" | "accepted";

export interface Match {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: MatchStatus;
}