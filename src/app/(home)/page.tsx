import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main className="flex flex-col items-center gap-6 px-3 py-10">
      <h1 className="text-center text-4xl font-bold">Next Auth V5</h1>
      <h2 className="text-center text-2xl font-semibold">Users</h2>
      {/* Display users here */}
      <ul className="list-inside list-disc">
        {users.map(({ id, name }) => {
          return (
            <li key={id}>
              <Link href={`/user/${id}`} className="hover:underline">
                {name || `User ${id}`}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
