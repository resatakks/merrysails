"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

type AddToast = (type: ToastType, message: string) => void;

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const ToastContext = createContext<AddToast | null>(null);

/* ------------------------------------------------------------------ */
/*  Imperative API — singleton backed by the nearest provider          */
/* ------------------------------------------------------------------ */

let globalAdd: AddToast | null = null;

function registerGlobal(fn: AddToast) {
  globalAdd = fn;
}

export const toast = {
  success: (msg: string) => globalAdd?.("success", msg),
  error: (msg: string) => globalAdd?.("error", msg),
  info: (msg: string) => globalAdd?.("info", msg),
  warning: (msg: string) => globalAdd?.("warning", msg),
};

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useToast() {
  const add = useContext(ToastContext);

  return {
    success: (msg: string) => (add ?? globalAdd)?.("success", msg),
    error: (msg: string) => (add ?? globalAdd)?.("error", msg),
    info: (msg: string) => (add ?? globalAdd)?.("info", msg),
    warning: (msg: string) => (add ?? globalAdd)?.("warning", msg),
  };
}

/* ------------------------------------------------------------------ */
/*  Toast list — framer-motion is ~36KB gzipped and was previously     */
/*  loaded on every page via this provider even though most page loads */
/*  never show a toast. Deferred so it's only fetched once a toast     */
/*  actually needs to render (perf fix 2026-07-14).                    */
/* ------------------------------------------------------------------ */

const ToastList = dynamic(() => import("./ToastList"), { ssr: false });

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const addToast: AddToast = useCallback((type, message) => {
    const id = `toast-${++counterRef.current}-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  useEffect(() => {
    registerGlobal(addToast);

    return () => {
      if (globalAdd === addToast) {
        globalAdd = null;
      }
    };
  }, [addToast]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      {toasts.length > 0 && <ToastList toasts={toasts} dismiss={dismiss} />}
    </ToastContext.Provider>
  );
}
