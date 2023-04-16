import { fetcher } from "../../helpers/fetcher";

const dbAuthProvider = {
  async signIn(data) {
    const user = await fetcher("/auth/login", "POST", data);
    return user;
  },
  async signOut() {
    await fetcher("/auth/logout", "GET");
  },

  async attemptToResetPassword(data) {
    const result = await fetcher("/auth/forgot-password", "POST", data);
    return result;
  },
  async resetPassword(data) {
    const result = await fetcher("/auth/reset-password", "POST", data);
    return result;
  },
};

export { dbAuthProvider };
