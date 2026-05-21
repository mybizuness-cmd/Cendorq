export type RepairQueuePriority = "urgent" | "high" | "standard";

export type RepairQueuePriorityInput = Readonly<{
  trustWeakness: number;
  choiceWeakness: number;
  actionWeakness: number;
  proofRisk: number;
}>;

export type RepairQueuePriorityResult = Readonly<{
  priority: RepairQueuePriority;
  reason: string;
  recommendedDepth: "Deep Review" | "Build Fix" | "Ongoing Control";
}>;

export function prioritizeRepairQueue(input: RepairQueuePriorityInput): RepairQueuePriorityResult {
  const weightedRisk = input.trustWeakness * 0.3 + input.choiceWeakness * 0.3 + input.actionWeakness * 0.2 + input.proofRisk * 0.2;

  if (weightedRisk >= 75) {
    return {
      priority: "urgent",
      reason: "Trust, choice, action, or proof weakness may justify cause diagnosis before repair.",
      recommendedDepth: "Deep Review",
    };
  }

  if (weightedRisk >= 50) {
    return {
      priority: "high",
      reason: "The public signal likely needs a focused repair path once the weak point is confirmed.",
      recommendedDepth: "Build Fix",
    };
  }

  return {
    priority: "standard",
    reason: "The business should keep the signal watched before deeper work.",
    recommendedDepth: "Ongoing Control",
  };
}
