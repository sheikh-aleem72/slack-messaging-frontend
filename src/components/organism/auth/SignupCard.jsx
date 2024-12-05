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
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

export const SignupCard = ({
  isPending,
  isSuccess,
  error,
  signupForm,
  setSignupForm,
  onSignupFormSubmit,
  validationError,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Card className="h-auto w-[420px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up to create your account</CardDescription>

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
                Successfully signed up. You will be redirected to the login page
                in a few seconds.
                <LucideLoader2 className="animate-spin ml-2" />
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={onSignupFormSubmit}>
            <Input
              required
              placeholder="Username"
              type="text"
              onChange={(e) =>
                setSignupForm({ ...signupForm, username: e.target.value })
              }
              value={signupForm.username}
              disabled={isPending}
            />

            <Input
              required
              placeholder="Email"
              type="email"
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
              value={signupForm.email}
              disabled={isPending}
            />

            <Input
              required
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setSignupForm({ ...signupForm, password: e.target.value });
              }}
              value={signupForm.password}
              disabled={isPending}
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
              disabled={isPending}
            />

            <Button
              size="lg"
              className="w-full"
              type="submit"
              disabled={isPending}
            >
              Continue
            </Button>
          </form>
          <Separator className="my-5" />
          <p className="text-muted-foreground mt-4">
            Already have an account ?{" "}
            <span
              className="text-sky-600 hover:underline cursor-pointer"
              onClick={() => navigate("/auth/signin")}
            >
              Sign In
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};
