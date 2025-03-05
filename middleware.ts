import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/conseils",
    "/cv-templates",
    "/cover-letters",
    "/blog",  // Ajout de la route /blog
    "/conditions", // Ajout de la route /conditions
    "/faq", 
    "/confidentialite",    "/contact",
    "/cookies", 
    "/contact"// Ajout de la route /faq
  ]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};



