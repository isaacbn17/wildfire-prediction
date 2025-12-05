import { Suspense } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";

async function requireUser() {
  if (!hasEnvVars) {
    redirect("/");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return data.user;
}

async function PredictContent() {
  await requireUser();

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-16">
      <h1 className="text-3xl font-semibold">Predict</h1>
      <p className="text-muted-foreground">
        Use this page to generate wildfire risk predictions. Add your inputs and
        models here.
      </p>
    </section>
  );
}

export default function PredictPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-5xl px-5 py-16 text-muted-foreground">
          Loading predict page...
        </section>
      }
    >
      <PredictContent />
    </Suspense>
  );
}
