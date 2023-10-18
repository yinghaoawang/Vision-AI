import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import prisma from "@/lib/prismadb";

export default authMiddleware({
  publicRoutes: ["/", "/login", "/register", "/api/webhook"],
  async afterAuth(auth, req) {
    const { userId, isPublicRoute } = auth;

    if (!userId && !isPublicRoute)
      return redirectToSignIn({ returnBackUrl: req.url });
    if (!userId) return;

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
