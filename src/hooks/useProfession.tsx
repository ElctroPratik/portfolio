"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ProfessionMode = "design" | "video";

interface ProfessionContextType {
  activeMode: ProfessionMode;
  setActiveMode: (mode: ProfessionMode) => void;
}

const ProfessionContext = createContext<ProfessionContextType>({
  activeMode: "design",
  setActiveMode: () => {},
});

export function ProfessionProvider({ children }: { children: ReactNode }) {
  const [activeMode, setActiveMode] = useState<ProfessionMode>("design");
  return (
    <ProfessionContext.Provider value={{ activeMode, setActiveMode }}>
      {children}
    </ProfessionContext.Provider>
  );
}

export function useProfession() {
  return useContext(ProfessionContext);
}
