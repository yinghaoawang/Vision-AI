"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import api from "@/app/_utils/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("mail@mail.com");
  const [name, setName] = useState("person name");
  const [password, setPassword] = useState("password");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      email,
      password,
      name,
    };

    api
      .post("/api/register", {
        ...data,
      })
      .then(() => {
        toast({
          title: "Registration successful",
        });
        signIn("credentials", {
          ...data,
          redirect: false,
        })
          .then((callback) => {
            if (callback?.ok) {
            }
            router.push("/dashboard");
            router.refresh();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        toast({
          title: "Registration failed",
          description: error?.response?.data?.message || error?.message,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex grow bg-slate-700">
      <div className="mx-auto w-80 p-10">
        <h1 className="mb-4 text-2xl font-bold text-white">Register</h1>
        <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="mt-4 flex justify-center gap-4">
            <Button variant="default">Sign up</Button>
            <Button
              onClick={(event: FormEvent) => {
                event.preventDefault();
                router.push("/login");
              }}
              variant="link"
              className="text-white"
            >
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
