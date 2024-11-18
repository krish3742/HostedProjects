"use client";
import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore, AppStore } from "./store";
import { setInput } from "./features/searchSlice";

function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
