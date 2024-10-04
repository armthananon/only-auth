import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container h-screen flex align-middle justify-center">
        <div className="flex gap-4 items-center flex-col sm:flex-row align-middle">
          <Link href="/login">
            <Button className="w-full sm:w-auto rounded-full">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button className="w-full sm:w-auto rounded-full">Sign Up</Button>
          </Link>
        </div>
    </main>
  );
}
