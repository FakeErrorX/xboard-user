import { PaymentPeriod } from "@/types/plan";

export default interface Coupon {
  id: number;
  code: string;
  name: string;
  type: 1 | 2; // @enum 1: amount, 2: discount
  value: number; // Deduction amount or discount (0-1)
  show: 0 | 1; // @enum 0: hidden, 1: visible
  limit_use: null | number; // Maximum usage count @enum null: unlimited, number: limited count
  limit_use_with_user: null | number; // Max usage per user @enum null: unlimited, number: limited count
  limit_plan_ids: null | string[];
  limit_period: null | PaymentPeriod[];
  started_at: number | null;
  ended_at: number | null;
  created_at: number | null;
  updated_at: number | null;
}

export interface CouponPayload {
  code: string;
  plan_id: number;
}
