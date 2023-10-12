"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("mail@mail.com");
  const [password, setPassword] = useState("password");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast({
          title: "Logged in",
        });
        router.push("/dashboard");
        router.refresh();
      } else {
        toast({
          title: "Log in failed",
          description: callback?.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex grow bg-slate-700">
      <div className="mx-auto w-80 p-10">
        <h1 className="text-2xl font-bold text-white mb-4">Sign in</h1>
        <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="mt-4 flex justify-center gap-4">
            <Button variant="default">Log in</Button>
            <Button
              onClick={(event: FormEvent) => {
                event.preventDefault();
                router.push("/register");
              }}
              variant="link"
              className="text-white"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
