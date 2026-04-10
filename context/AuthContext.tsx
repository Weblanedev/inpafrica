"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type AccountType = "customer" | "affiliate" | "vendor";

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  plan: string;
  needsProfileSetup?: boolean;
  phone?: string;
  city?: string;
  country?: string;
  state?: string;
  accountType?: string | null;
  membershipPending?: boolean;
  membershipPaid?: boolean;
  needsAccessCodeForLogin?: boolean;
}

export type RegisterOutcome =
  | { kind: "ok"; user: AuthUser }
  | {
      kind: "payment";
      pendingId: string;
      accountType: "affiliate" | "vendor";
    };

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (
    login: string,
    password: string,
    accessCode?: string,
  ) => Promise<AuthUser>;
  register: (
    name: string,
    username: string,
    email: string,
    password: string,
    accountType: AccountType,
  ) => Promise<RegisterOutcome>;
  completeProfile: (username: string, password: string) => Promise<AuthUser>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const r = await fetch("/api/user/me");
    const d = await r.json();
    setUser(d.user);
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = async (
    loginIdentifier: string,
    password: string,
    accessCode?: string,
  ): Promise<AuthUser> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: loginIdentifier,
        password,
        accessCode: accessCode?.trim() || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    const u = data.user as AuthUser;
    setUser(u);
    return u;
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string,
    accountType: AccountType,
  ): Promise<RegisterOutcome> => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        accountType,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    if (data.requiresPayment === true && data.pendingId) {
      return {
        kind: "payment",
        pendingId: data.pendingId as string,
        accountType: data.accountType as "affiliate" | "vendor",
      };
    }
    const u = data.user as AuthUser;
    setUser(u);
    return { kind: "ok", user: u };
  };

  const completeProfile = async (
    username: string,
    password: string,
  ): Promise<AuthUser> => {
    const res = await fetch("/api/auth/complete-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    const u = data.user as AuthUser;
    setUser(u);
    return u;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        completeProfile,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
