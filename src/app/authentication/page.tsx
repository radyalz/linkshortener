
import { AuthWizard } from "@/components/auth/authWizard";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <AuthWizard />
    </main>
  );
}