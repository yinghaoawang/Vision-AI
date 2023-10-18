import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthUserProvider } from "./_contexts/AuthUserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vision AI",
  description: "The ultimate resource for user-driven content.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <ClerkProvider>
          <AuthUserProvider>
            {children}
            <Toaster />
          </AuthUserProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
