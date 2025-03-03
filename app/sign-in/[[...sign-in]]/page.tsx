import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg rounded-lg border border-gray-200",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-gray-500",
            formButtonPrimary: "bg-primary hover:bg-primary/90",
          }
        }}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        redirectUrl="/dashboard"
      />
    </div>
  );
}