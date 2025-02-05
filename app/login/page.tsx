import { ReactNode } from "react";
import LoginPage from "@ui/auth/LoginPage";

export default function Login(): ReactNode {
  return (
    <div className="flex-1 pt-20">
      <LoginPage />
    </div>
  );
}
