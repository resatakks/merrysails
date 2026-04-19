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
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ToastType = "success" | "error" | "info" | "warning";

interface ToastItem {
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
/*  Styling helpers                                                    */
/* ------------------------------------------------------------------ */

const styleMap: Record<
  ToastType,
  { bg: string; border: string; text: string; icon: ReactNode }
> = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />,
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />,
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
  },
};

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

      {/* Toast container — fixed top-right */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => {
            const s = styleMap[t.type];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`pointer-events-auto flex items-start gap-2.5 px-4 py-3 rounded-xl border shadow-lg ${s.bg} ${s.border}`}
              >
                {s.icon}
                <span className={`text-sm font-medium ${s.text} flex-1`}>
                  {t.message}
                </span>
                <button
                  onClick={() => dismiss(t.id)}
                  className={`${s.text} opacity-60 hover:opacity-100 transition-opacity`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
