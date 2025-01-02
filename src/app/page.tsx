import LogoText from "@/assets/LogoText";
import { ModeToggle } from "@/components/common/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="h-screen w-full relative">
      <div className="absolute top-5 right-5">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center">
          <LogoText size={250} />
          <p className="text-center italic text-sm mt-5 px-5 md:px-0">
            “Welcome to ChatMe – The Future of Conversations”
          </p>
          <p className="text-center text-secondary-foreground max-w-[1024px] mt-8 text-base leading-6 px-5 md:px-0">
            ChatMe is the easiest and most secure way to connect with others.
            Enjoy fast, real-time messaging with friends, family, and
            colleagues, whether one-on-one or in a group. Stay in touch and
            share ideas effortlessly.
          </p>
          <div className="mt-3 px-5 md:px-0">
            <Button asChild>
              <Link href={"/auth/login"}>Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
