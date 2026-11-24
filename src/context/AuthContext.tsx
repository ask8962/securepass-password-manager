"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isConfigured: false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [configured] = useState<boolean>(() => isFirebaseConfigured());
  const [loading, setLoading] = useState<boolean>(() => isFirebaseConfigured());

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    if (auth) {
      await fbSignOut(auth);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: configured,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
