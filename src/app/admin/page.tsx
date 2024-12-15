import getSession from "@/lib/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin dashboard",
};

export default async function Page() {
  {
    /* calling getSession() and not auth(), as getSession() is the cached version of auth() 
        const { user } = (await auth()) ?? {};
    */
  }
  const { user } = (await getSession()) ?? {};
  const { role, name } = user ?? {};

  // Redirect non-admin users
  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  if (role !== "admin") {
    return (
      <main className="mx-auto my-10 ">
        <p className="text-center">You are not authorized to view this page</p>
      </main>
    );
  }

  return (
    <main className="mx-auto my-10 space-y-3">
      <h1 className="text-center text-xl font-bold">Admin Page</h1>
      <p className="text-center">Welcome, {name || "admin"}!</p>
    </main>
  );
}
