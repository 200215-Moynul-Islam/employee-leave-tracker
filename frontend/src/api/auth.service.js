import httpClient from "./httpClient.js";

const authService = {
  login: async (email, password) => {
    const data = await httpClient("auth/login", {
      method: "POST",
      body: { email, password },
    });
    if (data.success) {
      localStorage.setItem("token", data.data.token);
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    return;
  },
};

export default authService;
