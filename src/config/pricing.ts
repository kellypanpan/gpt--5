// 统一的定价配置文件
export interface PricingPlan {
  price: number;
  period: string;
  dailyCost: number;
  popular?: boolean;
  savings?: string;
  creemUrl?: string;
}

// 新的统一定价方案：只有 Free 和 Pro，Pro 有三种时长选择
export const UNIFIED_PRICING_PLANS: Record<string, PricingPlan> = {
  monthly: {
    price: 19.99,
    period: "1 Month",
    dailyCost: 0.67,
    creemUrl: "https://www.creem.io/payment/prod_5qvMIer7xgjLkg1lpgdmxL"
  },
  quarterly: {
    price: 39.99,
    period: "3 Months", 
    dailyCost: 0.44,
    popular: true,
    creemUrl: "https://www.creem.io/payment/prod_6LX36QdDi0G9OKoFiRxY2h"
  },
  yearly: {
    price: 69.99,
    period: "1 Year",
    dailyCost: 0.19,
    savings: "Save 70%",
    creemUrl: "https://www.creem.io/payment/prod_3X0YJVzza8jlBTPC2DqbA5"
  }
};

// Pro 功能列表
export const PRO_FEATURES = [
  "Unlimited conversations",
  "All premium AI tools",
  "Priority response speed", 
  "Export chat history",
  "Advanced prompts library",
  "Dedicated customer support"
];

// 统计数据
export const PLATFORM_STATS = [
  { label: "Active users", value: "50K+" },
  { label: "Conversations", value: "1M+" },
  { label: "Satisfaction", value: "95%" }
];

// 获取指定方案的价格信息
export const getPlanInfo = (planKey: keyof typeof UNIFIED_PRICING_PLANS) => {
  return UNIFIED_PRICING_PLANS[planKey];
};

// 获取所有方案
export const getAllPlans = () => {
  return UNIFIED_PRICING_PLANS;
};