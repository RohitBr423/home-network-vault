import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoginScreen } from "@/components/LoginScreen";
import { Dashboard } from "@/components/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HomeNet Docs — Secure IT Portal" },
      { name: "description", content: "Internal IT documentation portal for the home network." },
    ],
  }),
  component: Index,
});

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  return unlocked
    ? <Dashboard onLogout={() => setUnlocked(false)} />
    : <LoginScreen onUnlock={() => setUnlocked(true)} />;
}
