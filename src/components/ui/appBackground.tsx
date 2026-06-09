export function AppBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute -left-32 -top-32 h-[38rem] w-[38rem] rounded-full bg-purple-700/35 blur-3xl animate-float-slow" />

      <div className="absolute -right-32 bottom-0 h-[42rem] w-[42rem] rounded-full bg-amber-500/25 blur-3xl animate-float-slower" />

      <div className="absolute left-1/4 top-1/3 h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/20 blur-3xl animate-float-medium" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(0,0,0,0.65)_75%)]" />

      <div className="absolute inset-0 opacity-[0.055] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      <div className="absolute inset-0">
        {Array.from({ length: 55 }).map((_, index) => (
          <span
            key={index}
            className="absolute size-1 rounded-full bg-white/50 shadow-[0_0_12px_rgba(255,255,255,0.45)] animate-star-drift"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 53) % 100}%`,
              animationDelay: `${(index % 12) * 0.7}s`,
              animationDuration: `${10 + (index % 8)}s`,
              opacity: 0.18 + (index % 4) * 0.08,
            }}
          />
        ))}
      </div>
    </div>
  );
}
