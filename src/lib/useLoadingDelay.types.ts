import type { RefObject } from "react";

export type LoadingDelay = {
  loading: boolean;
  start: () => void;
};

export type TimerRef = RefObject<number | undefined>;
