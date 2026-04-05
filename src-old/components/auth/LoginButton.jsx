import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const { user, loginWithGoogle, logout } = useAuth();

  if (user) {
    return (
      <Button variant="outline" onClick={logout}>
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    );
  }

  return (
    <Button onClick={loginWithGoogle}>
      <LogIn className="h-4 w-4" />
      Sign in with Google
    </Button>
  );
}
