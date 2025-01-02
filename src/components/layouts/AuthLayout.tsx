import Logo from "@/assets/Logo";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../common/ModeToggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen items-center lg:justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 w-full">
      <div className="relative hidden flex-col h-full p-10 pt-5 text-white dark:text-white lg:flex bg-zinc-900 dark:bg-zinc-950">
        <div className="absolute inset-0 bg-zinc-900 dark:bg-zinc-950">
          <Image
            src={"/images/chat-auth-bg.jpeg"}
            alt={"Auth background"}
            fill
            className="object-cover opacity-40 dark:opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo size={80} />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Connect, communicate, and collaborate seamlessly with our
              modern chat system.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="p-8 flex items-center justify-center relative h-full">
        <Link href={"/"} className="block lg:hidden absolute top-5 left-5">
          <Logo size={80} />
        </Link>
        <div className="absolute top-5 right-5">
          <ModeToggle />
        </div>
        {children}
      </div>
    </div>
  );
}
