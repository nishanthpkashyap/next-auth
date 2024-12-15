import { Metadata } from "next";
import Settings from "./sections/settings";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Page() {
  {
    /* calling getSession() and not auth(), as getSession() is the cached version of auth() 
        const session = await auth();
    */
  }
  const session = await getSession();
  const user = session?.user;

  // Protect this page via authentication
  if (!user) redirect("/api/auth/signin?callbackUrl=/settings");

  return <Settings user={user} />;
}
