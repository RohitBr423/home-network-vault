import { useState, type FormEvent } from "react";
import { Lock, Terminal } from "lucide-react";

export function LoginScreen({ onUnlock }: { onUnlock: () => void }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (passcode === "Overide2026") {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8 text-primary">
          <Terminal className="h-5 w-5" />
          <span className="font-mono text-sm tracking-widest uppercase">homenet.docs</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`bg-card border border-border rounded-lg p-8 shadow-2xl transition-transform ${shake ? "animate-[shake_0.4s]" : ""}`}
          style={{ boxShadow: "0 20px 60px -20px oklch(0 0 0 / 0.6)" }}
        >
          <h1 className="text-xl font-semibold mb-1">Restricted Access</h1>
          <p className="text-sm text-muted-foreground mb-6">Enter passcode to continue.</p>

          <label htmlFor="passcode" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
            Passcode
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="passcode"
              type="password"
              autoFocus
              value={passcode}
              onChange={(e) => { setPasscode(e.target.value); setError(false); }}
              className="w-full bg-input border border-border rounded-md pl-10 pr-3 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="••••••••••"
            />
          </div>

          <div className="h-5 mt-2">
            {error && (
              <p className="text-xs text-destructive font-mono">Invalid passcode.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-primary text-primary-foreground font-medium py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Unlock
          </button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
          authorized personnel only
        </p>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
    </main>
  );
}
