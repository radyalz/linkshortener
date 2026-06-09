"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { createLinkAction } from "@/lib/actions/links";
import { initialLinkActionState } from "@/lib/actions/link-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateLinkForm() {
  const [state, formAction, isPending] = useActionState(createLinkAction, initialLinkActionState);
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }

    if (state.data) {
      toast.success(`Created short link: /r/${state.data.slug}`);
    }
  }, [state]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create short link</CardTitle>
        <CardDescription>Shorten a long URL with an optional custom slug.</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="destinationUrl">Long URL</Label>
            <Input id="destinationUrl" name="destinationUrl" type="url" placeholder="https://example.com/very/long/url" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" placeholder="Optional title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Custom slug</Label>
            <Input id="slug" name="slug" type="text" placeholder="optional-slug" />
          </div>

          {state.error ? <p className="text-sm text-destructive md:col-span-2">{state.error}</p> : null}

          {state.data ? (
            <p className="text-sm text-muted-foreground md:col-span-2">
              Created short link with slug: <span className="font-medium">{state.data.slug}</span>
            </p>
          ) : null}

          <Button type="submit" disabled={isPending} className="md:col-span-2">
            {isPending ? "Creating..." : "Create short link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
