import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/conseils",
    "/cv-templates",
    "/cover-letters",
    "/blog",
    "/conditions", 
    "/faq", 
    "/confidentialite",    "/contact",
    "/cookies", 
    "/contact"// 
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};



