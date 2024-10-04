"use client";

import { SessionProvider} from "next-auth/react";
import { ReactNode } from "react";

export const AuthProvider = ({ children }: Readonly<{ children: ReactNode}>) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};