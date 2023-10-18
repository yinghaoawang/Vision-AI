import { authMiddleware } from "@clerk/nextjs";
import prisma from "@/lib/prismadb";

export default authMiddleware({
  publicRoutes: ["/", "/login", "/register", "/api/webhook"],
  async afterAuth(auth) {
    const { userId } = auth;
    if (userId == null) return;

    const userData = await prisma.userData.findFirst({
      where: {
        userId,
      },
    });

    if (userData == null) {
      await prisma.userData.create({
        data: {
          userId,
          tokens: 500,
        },
      });
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
