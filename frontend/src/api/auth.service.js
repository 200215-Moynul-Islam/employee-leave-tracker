import httpClient from "./httpClient.js";

const authService = {
  login: async (email, password) => {
    const data = await httpClient("auth/login", {
      method: "POST",
      body: { email, password },
    });
    if (data.data) {
      localStorage.setItem("token", data.data);
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem("token");
    return;
  },
};

export default authService;
