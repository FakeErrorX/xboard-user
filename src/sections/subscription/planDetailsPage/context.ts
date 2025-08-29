import { useEffect, useMemo, useState } from "react";
import constate from "constate";
import { useSnackbar } from "notistack";

// project imports
import { useGetPlanQuery } from "@/store/services/api";
import { PaymentPeriod } from "@/types/plan";
import Coupon from "@/model/coupon";
import { getFirstPayment, getMode } from "@/utils/plan";

export interface PlanDetailContextProps {
  id: number;
}

const usePlanDetail = ({ id }: PlanDetailContextProps) => {
  const planQuery = useGetPlanQuery(id);
  const [period, setPeriod] = useState<PaymentPeriod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState<Coupon | null>(null);

  // After request completion, automatically select the first period
  useEffect(() => {
    if (planQuery.data && !period) {
      setPeriod(getFirstPayment(planQuery.data));
    }
  }, [planQuery.data, period]);

  // Selected original plan price
  const originPrice = useMemo(() => {
    if (!planQuery.data) {
      return -1;
    }

    if (!period) {
      return -1;
    }

    const price = getMode(planQuery.data)[period];
    if (!price) {
      return -1;
    }

    return price / 100;
  }, [planQuery.data, period]);

  // Price after using coupon
  const price = useMemo(() => {
    if (!couponCode) {
      // No coupon
      return originPrice;
    } else if (couponCode.type === 1) {
      // Amount deduction
      return originPrice - couponCode.value / 100;
    } else if (couponCode.type === 2) {
      // Discount
      return originPrice * (1 - couponCode.value / 100);
    } else {
      return -1;
    }
  }, [couponCode, originPrice]);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (planQuery.error) {
      enqueueSnackbar(planQuery.error.message, { variant: "error" });
    }
  }, [planQuery.error, enqueueSnackbar]);

  return {
    id,
    originPrice,
    price,
    planQuery,
    period,
    setPeriod,
    isSubmitting,
    setIsSubmitting,
    couponCode,
    setCouponCode
  };
};

const [PlanDetailProvider, usePlanDetailContext] = constate(usePlanDetail);
export { PlanDetailProvider, usePlanDetailContext };
