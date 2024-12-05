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
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { FaCheck } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export const SigninCard = ({
  error,
  isPending,
  isSuccess,
  signinForm,
  setSigninForm,
  validationError,
  onSigninFormSubmit,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="h-auto w-[420px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to access your account</CardDescription>

        {validationError && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-5" />
            <p>{validationError.message}</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-5" />
            <p>{error.message}</p>
          </div>
        )}

        {isSuccess && (
          <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5">
            <FaCheck className="size-5" />
            <p>
              Successfully signed in. You will be redirected to the home page in
              a few seconds.
              <LucideLoader2 className="animate-spin ml-2" />
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={onSigninFormSubmit}>
          <Input
            required
            type="email"
            placeholder="Enter your email"
            onChange={(e) =>
              setSigninForm({ ...signinForm, email: e.target.value })
            }
            value={signinForm.email}
            disabled={isPending}
          />

          <Input
            required
            type="password"
            placeholder="Enter your Password"
            onChange={(e) =>
              setSigninForm({ ...signinForm, password: e.target.value })
            }
            value={signinForm.password}
            disabled={isPending}
          />

          <Button
            className="w-full"
            size="lg"
            disabled={isPending}
            type="submit"
          >
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
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
