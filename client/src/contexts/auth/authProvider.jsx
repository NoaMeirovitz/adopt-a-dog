import React, { useState } from "react";
import { dbAuthProvider } from "./dbAuthProvider";
import { toasts } from "../../helpers/toasts";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = async (userData) => {
    const user = await dbAuthProvider.signIn(userData);
    if (user.userId) {
      localStorage.setItem("jwt", user.jwt);
      setUser(user);
      return user.userId;
    } else {
      throw new Error(user.message);
    }
  };

  const refreshUser = (userData) => {
    setUser(userData);
  };

  const signOut = async () => {
    await dbAuthProvider.signOut();
    localStorage.removeItem("jwt");
    setUser(null);
    toasts.success("Logged out successfully");
  };

  const attemptToResetPassword = async ({ username, answer }) => {
    return await dbAuthProvider.attemptToResetPassword({ username, answer });
  };

  const resetPassword = async (data) => {
    return await dbAuthProvider.resetPassword(data);
  };

  const value = {
    user,
    refreshUser,
    signIn,
    signOut,
    attemptToResetPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
