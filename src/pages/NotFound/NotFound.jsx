import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";
import notfound from "@/assets/Images/notfound.jpg";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-[100vh] w-full flex-col items-center justify-center  bg-gray-100">
        <Card className="text-center shadow-lg h-[400px] bg-blue-400">
          <CardHeader>
            <CardTitle>404 Not Found</CardTitle>
            <p className="text-gray-600">
              The page you are looking for does not exist.
            </p>
          </CardHeader>

          <CardContent className="flex justify-center flex-col">
            {/* <img className="h-[200px]" src={notfound} /> */}
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="mt-4"
            >
              Go back
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
