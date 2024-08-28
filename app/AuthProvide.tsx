"use client";

import type { Session, User } from "@prisma/client";
import type React from "react";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  updateAuth: (newSession: Session | null, newUser: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  session: initialSession,
  user: initialUser,
}: {
  children: React.ReactNode;
  session: Session | null;
  user: User | null;
}) {
  const [session, setSession] = useState(initialSession);
  const [user, setUser] = useState(initialUser);
  console.log(session);
  console.log(user);
  const updateAuth = (newSession: Session | null, newUser: User | null) => {
    setSession(newSession);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ session, user, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
