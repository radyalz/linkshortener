import Link from "next/link";

import { ThemeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Create short links",
    description: "Turn long destination URLs into clean short links with optional custom slugs.",
  },
  {
    title: "Track every click",
    description: "Redirect visits are recorded so you can see total clicks and recent activity.",
  },
  {
    title: "Manage from dashboard",
    description: "Copy, inspect, and delete your links from a responsive authenticated dashboard.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-6">
      <header className="glass-panel sticky top-4 z-20 mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="gold-gradient-text">ShortLink</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition hover:text-foreground">
            Features
          </a>
          <a href="#workflow" className="transition hover:text-foreground">
            Workflow
          </a>
          <Link href="/dashboard" className="transition hover:text-foreground">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button asChild variant="outline" size="sm">
            <Link href="/login">Log in</Link>
          </Button>

          <Button asChild size="sm">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl items-center py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="reveal-on-load inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">Production-quality short link manager</p>

            <h1 className="reveal-on-load reveal-delay-1 max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
              Short links with <span className="gold-gradient-text">golden clarity</span> and real click tracking.
            </h1>

            <p className="reveal-on-load reveal-delay-2 max-w-2xl text-lg leading-8 text-muted-foreground">
              Create clean short URLs, redirect visitors, track click counts, and manage everything from a polished authenticated dashboard.
            </p>

            <div className="reveal-on-load reveal-delay-3 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">Create your first link</Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>

          <Card className="glass-panel reveal-on-load reveal-delay-2 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">Live link preview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-muted-foreground">Short URL</p>
                <p className="mt-1 break-all text-lg font-medium text-amber-100">https://localhost:3000/r/gold42</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-muted-foreground">Destination</p>
                <p className="mt-1 break-all text-sm">https://example.com/very/long/product/campaign/link</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-purple-500/10 p-4">
                  <p className="text-sm text-muted-foreground">Clicks</p>
                  <p className="mt-2 text-3xl font-bold">128</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-amber-500/10 p-4">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="mt-2 text-lg font-semibold text-amber-100">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl py-20">
        <div className="reveal-on-scroll mb-10 max-w-2xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-200">Features</p>

          <h2 className="text-4xl font-bold">Everything the short link flow needs.</h2>

          <p className="text-muted-foreground">The app stays focused on the requested test scope: auth, link creation, redirects, click tracking, and dashboard management.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="glass-panel reveal-on-scroll">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-6xl py-20">
        <Card className="glass-panel reveal-on-scroll">
          <CardContent className="grid gap-8 p-8 md:grid-cols-3">
            <div>
              <p className="text-4xl font-bold text-amber-200">01</p>
              <h3 className="mt-4 text-xl font-semibold">Sign up</h3>
              <p className="mt-2 text-muted-foreground">Create an account with Neon Auth and access the protected dashboard.</p>
            </div>

            <div>
              <p className="text-4xl font-bold text-amber-200">02</p>
              <h3 className="mt-4 text-xl font-semibold">Create link</h3>
              <p className="mt-2 text-muted-foreground">Submit a valid URL, add an optional title, or choose a custom slug.</p>
            </div>

            <div>
              <p className="text-4xl font-bold text-amber-200">03</p>
              <h3 className="mt-4 text-xl font-semibold">Track clicks</h3>
              <p className="mt-2 text-muted-foreground">Redirect visitors through `/r/[slug]` and review click counts from the dashboard.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
