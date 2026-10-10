export const SELECT_NAVIGATION_KEYS: Record<string, (activeIndex: number, optionCount: number) => { from: number; step: 1 | -1 }> = {
  ArrowDown: (activeIndex) => ({ from: activeIndex + 1, step: 1 }),
  ArrowUp: (activeIndex) => ({ from: activeIndex - 1, step: -1 }),
  Home: () => ({ from: 0, step: 1 }),
  End: (_activeIndex, optionCount) => ({ from: optionCount - 1, step: -1 }),
};

export const NO_ACTIVE_INDEX = -1;
