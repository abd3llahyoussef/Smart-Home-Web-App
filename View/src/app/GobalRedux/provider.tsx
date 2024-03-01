"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import react, { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
