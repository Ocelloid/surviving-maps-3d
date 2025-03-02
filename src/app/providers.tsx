"use client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider locale="en-EN">
      <NextThemesProvider
        attribute="class"
        enableSystem={true}
        defaultTheme="dark"
        forcedTheme="dark"
      >
        <TRPCReactProvider>
          <SessionProvider>{children}</SessionProvider>
        </TRPCReactProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
