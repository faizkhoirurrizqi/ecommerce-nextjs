import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const store = await prismadb.store.findFirst({
      where: {
        userId,
      },
    });

    if (store) {
      redirect(`/${store.id}`);
    }
  } catch (error) {
    // Log the error for further investigation
    console.error("Prisma Client Error:", error);
  }

  return <>{children}</>;
}
