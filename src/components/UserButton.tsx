import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";
import { Lock, LogOut, Settings } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut as serverSignOut } from "@/auth";
import { signOut as clientSignOut } from "next-auth/react";

interface UserButtonProps {
  user: User;
}

export default function UserButton({ user }: UserButtonProps) {
  const { role } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full">
          <Image
            src={user.image || avatarPlaceholder}
            alt="User profile picture"
            width={50}
            height={50}
            className="aspect-square rounded-full bg-background object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          {/*Show this only for admins */}
          {role === "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Lock className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* logout functionality for server component */}
          <form
            action={async () => {
              "use server";
              await serverSignOut();
            }}
          >
            <button type="submit" className="flex w-full items-center">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </button>
          </form>
          {/* logout functionality for client component */}
          {/* <button
            onClick={() => {
              clientSignOut({
                redirectTo: "/",
                redirect: true,
              });
            }}
            className="flex w-full items-center"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </button> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
