"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import AppToaster from "../components/Toaster";

interface ProvidersProps {
  children: ReactNode;
  session: any;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider
      refetchInterval={144 * 60}
      refetchOnWindowFocus={false}
      session={session}
    >
      <AppToaster />
      {children}
    </SessionProvider>
  );
}
