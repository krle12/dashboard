import { LoginForm } from "@/src/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Prijava za Admina
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
