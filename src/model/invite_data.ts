export interface InviteCodeData {
  code: string;
  created_at: number;
  id: number;
  pv: number;
  status: InviteCodeStatus;
  updated_at: number;
  user_id: number;
}

export enum InviteCodeStatus {
  OK = 0
}

export default interface InviteData {
  codes: InviteCodeData[];
  stat: {
    0: number; // Registered users count
    1: number; // Total commission earned
    2: number; // Commission pending confirmation
    3: number; // Commission rate
    4: number; // Current remaining commission
  };
}
