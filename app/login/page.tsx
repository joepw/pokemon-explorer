import { login } from "@/features/auth/actions";

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-12">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="mt-2 text-sm text-stone-500">
        Demo mode: any username is accepted; a unique session token is generated.
      </p>
      <form action={login} className="mt-6 space-y-4">
        <input type="hidden" name="from" value="/pokemon" />
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            className="mt-1 w-full rounded-md border px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}

