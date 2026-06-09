import { workflowSteps } from "@/constants/workflowSteps";
import { Card, CardContent } from "@/components/ui/card";
export function WorkflowSection() {
  return (
    <section id="workflow" className='mx-auto max-w-6xl py-20'>
      <Card variant="glass" className="reveal-on-scroll">
        <CardContent className="grid gap-8 p-8 md:grid-cols-3">
          {workflowSteps.map((step) => (
            <div key={step.number}>
              <p className="text-4xl font-bold text-amber-800 dark:text-amber-200">{step.number}</p>

              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>

              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
