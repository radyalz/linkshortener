import { Link2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EmptyLinksState() {
  return (
    <Card className="border-dashed border-amber-500/25 bg-amber-500/[0.03] dark:bg-amber-300/[0.04]">
      <CardContent className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-200">
          <Link2 className="size-5" />
        </div>

        <h3 className="mt-4 text-lg font-semibold">No short links yet</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Create your first short link above. It will show up here with copy, detail, click count, and delete actions.</p>
      </CardContent>
    </Card>
  );
}
