import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SigninCard = () => {
  const navigate = useNavigate();
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });
  return (
    <Card className="h-auto w-[420px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-3">
          <Input
            required
            type="email"
            placeholder="Enter your email"
            onChange={(e) =>
              setSigninForm({ ...signinForm, email: e.target.value })
            }
            value={signinForm.email}
          />

          <Input
            required
            type="password"
            placeholder="Enter your Password"
            onChange={(e) =>
              setSigninForm({ ...signinForm, password: e.target.value })
            }
            value={signinForm.password}
          />

          <Button className="w-full" size="lg" disabled="false" type="submit">
            Sign In
          </Button>
        </form>

        <Separator className="my-5" />

        <p className="text-muted-foreground mt-5">
          Do not have an account ?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/auth/signup")}
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
