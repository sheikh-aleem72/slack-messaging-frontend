import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

export const SignupCard = () => {
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <>
      <Card className="h-auto w-[420px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-3">
            <Input
              required
              placeholder="Username"
              type="text"
              onChange={(e) =>
                setSignupForm({ ...signupForm, username: e.target.value })
              }
              value={signupForm.username}
            />

            <Input
              required
              placeholder="Email"
              type="email"
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
              value={signupForm.email}
            />

            <Input
              required
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
              value={signupForm.password}
            />

            <Input
              required
              placeholder="Confirm Password"
              type="password"
              onChange={(e) =>
                setSignupForm({
                  ...signupForm,
                  confirmPassword: e.target.value,
                })
              }
              value={signupForm.confirmPassword}
            />

            <Button size="lg" className="w-full" disabled="false" type="submit">
              Continue
            </Button>
          </form>
          <Separator className="my-5" />
          <p className="text-muted-foreground mt-4">
            Already have an account ?{" "}
            <span className="text-sky-600 hover:underline cursor-pointer">
              Sign In
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};
