import { features } from "@/constants/features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function FeaturesSection() {
  return (
    <section id="features" className='mx-auto max-w-6xl py-20'>
      <div className="reveal-on-scroll mb-10 max-w-2xl space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-800 dark:text-amber-200">
          Features
        </p>

        <h2 className="text-4xl font-bold">
          Everything the short link flow needs.
        </h2>

        <p className="text-muted-foreground">
          The app stays focused on the requested test scope: auth, link
          creation, redirects, click tracking, and dashboard management.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} variant="glass" className="reveal-on-scroll">
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
  );
}