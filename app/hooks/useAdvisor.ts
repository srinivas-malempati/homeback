"use client";
import { useState } from "react";
import { AIState, AdvisorType } from "../types";

export function useAdvisor(type: AdvisorType) {
  const [ai, setAI] = useState<AIState>({ loading: false, result: null, error: null });

  const analyze = async (prompt: string) => {
    setAI({ loading: true, result: null, error: null });
    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAI({ loading: false, result: null, error: data.error ?? "Something went wrong." });
      } else {
        setAI({ loading: false, result: data.result, error: null });
      }
    } catch {
      setAI({ loading: false, result: null, error: "Network error. Please check your connection." });
    }
  };

  return { ai, analyze };
}
