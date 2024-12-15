// "use client";

import { signIn as serverSignIn } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import getSession from "@/lib/session";
import { signIn as clientSignIn, useSession } from "next-auth/react";

{
  /* ******Fetch the user session as a server component******** */
}

export default async function NavBar() {
  // Fetch the currently logged-in user
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="font-bold">
          Next Auth v5
        </Link>
        {user ? <UserButton user={user} /> : <SignInButton />}
      </nav>
    </header>
  );
}

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await serverSignIn();
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}

{
  /* ******Fetch the user session as a client component ****** */
}
// export default function NavBar() {
//   // Fetch the currently logged-in user
//   const { data, status } = useSession();
//   const { user } = data ?? {};

//   return (
//     <header className="sticky top-0 bg-background px-3 shadow-sm">
//       <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
//         <Link href="/" className="font-bold">
//           Next Auth v5
//         </Link>
//         {user && <UserButton user={user} />}
//         {!user && status !== "loading" && <SignInButton />}
//       </nav>
//     </header>
//   );
// }

// function SignInButton() {
//   return (
//     <form
//       onSubmit={() => {
//         clientSignIn();
//       }}
//     >
//       <Button type="submit">Sign in</Button>
//     </form>
//   );
// }
