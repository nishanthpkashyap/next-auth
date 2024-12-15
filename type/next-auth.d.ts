import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Sessions {
    user: User & DefaultSession["user"];
  }

  interface User {
    role: string | null;
  }
}
