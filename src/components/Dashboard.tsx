import { Terminal, LogOut, Shield, Server, RefreshCw } from "lucide-react";

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-4 rounded-md border border-border bg-[oklch(0.12_0.01_250)] overflow-hidden">
      {label && (
        <div className="px-4 py-1.5 border-b border-border text-xs font-mono text-muted-foreground bg-card/50">
          {label}
        </div>
      )}
      <pre className="px-4 py-3 text-sm overflow-x-auto"><code className="text-[oklch(0.85_0.15_145)]">{children}</code></pre>
    </div>
  );
}

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card/40 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Terminal className="h-4 w-4" />
            <span className="font-mono text-sm tracking-widest uppercase">homenet.docs</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Lock
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
          <span className="text-primary">●</span>
          <span>NETWORK / DNS / PI-HOLE</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Pi-hole Standard Operating Procedure</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Operational runbook for installation, maintenance, and recovery of the Pi-hole DNS sinkhole on the home network.
        </p>

        <div className="flex flex-wrap gap-2 mb-12 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-secondary border border-border">v1.0</span>
          <span className="px-2.5 py-1 rounded-full bg-secondary border border-border">Raspberry Pi 4</span>
          <span className="px-2.5 py-1 rounded-full bg-secondary border border-border">Debian 12</span>
        </div>

        <article className="prose-custom">
          <section className="mb-10">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 pb-2 border-b border-border">
              <Server className="h-5 w-5 text-primary" /> 1. Overview
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pi-hole acts as a network-wide ad-blocker and DNS resolver.
              Replace this section with deployment context, hardware notes, and the responsible operator.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 pb-2 border-b border-border">
              <Shield className="h-5 w-5 text-primary" /> 2. Initial Installation
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-2">Run the official installer on a fresh Debian-based system:</p>
            <CodeBlock label="bash">{`curl -sSL https://install.pi-hole.net | bash`}</CodeBlock>
            <p className="text-foreground/90 leading-relaxed mb-2">Set the admin password after install:</p>
            <CodeBlock label="bash">{`sudo pihole -a -p`}</CodeBlock>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border">3. Routine Maintenance</h2>
            <ul className="space-y-2 text-foreground/90 list-disc pl-5 marker:text-primary">
              <li>Verify uptime and query volume weekly via the admin console.</li>
              <li>Update gravity (blocklists) every 7 days.</li>
              <li>Confirm upstream DNS resolvers are responsive.</li>
              <li>Review client query logs for anomalies.</li>
            </ul>
            <CodeBlock label="bash">{`# Update blocklists
pihole -g

# Update Pi-hole core + web + FTL
sudo pihole -up`}</CodeBlock>
          </section>

          <section className="mb-10">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 pb-2 border-b border-border">
              <RefreshCw className="h-5 w-5 text-primary" /> 4. Recovery Procedure
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-2">
              If DNS resolution fails network-wide, follow these steps in order:
            </p>
            <ol className="space-y-2 text-foreground/90 list-decimal pl-5 marker:text-primary marker:font-mono">
              <li>SSH into the Pi and check service status.</li>
              <li>Restart the DNS resolver.</li>
              <li>If still failing, repair the installation.</li>
              <li>Last resort — point router DNS to <code className="px-1.5 py-0.5 rounded bg-secondary text-primary">1.1.1.1</code> temporarily.</li>
            </ol>
            <CodeBlock label="bash">{`sudo systemctl status pihole-FTL
sudo pihole restartdns
sudo pihole -r   # repair`}</CodeBlock>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border">5. Backup &amp; Restore</h2>
            <p className="text-foreground/90 leading-relaxed mb-2">Export Teleporter archive monthly to encrypted storage:</p>
            <CodeBlock label="bash">{`pihole -a -t           # create teleporter backup
# Restore via Web UI: Settings → Teleporter → Restore`}</CodeBlock>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border">6. Contacts &amp; Escalation</h2>
            <p className="text-foreground/90 leading-relaxed">
              Placeholder for on-call contact, ISP support number, and router admin credentials reference.
            </p>
          </section>
        </article>

        <footer className="mt-16 pt-6 border-t border-border text-xs font-mono text-muted-foreground flex justify-between">
          <span>last reviewed: placeholder</span>
          <span>classification: internal</span>
        </footer>
      </main>
    </div>
  );
}
