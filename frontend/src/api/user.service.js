import httpClient from "./httpClient";

const userService = {
  getAllEmployees: async () => {
    return await httpClient("users/employees", {
      method: "GET",
      requireAuth: true,
    });
  },

  register: async (user) => {
    return await httpClient("users/register", {
      method: "POST",
      body: user,
      requireAuth: true,
    });
  },

  updateUser: async (id, user) => {
    return await httpClient(`users/${id}`, {
      method: "PATCH",
      body: user,
      requireAuth: true,
    });
  },

  delete: async (id) => {
    return await httpClient(`users/${id}`, {
      method: "DELETE",
      requireAuth: true,
    });
  },

  updatePassword: async (id, newPassword) => {
    return await httpClient(`users/${id}/update-password`, {
      method: "PATCH",
      body: {
        password: newPassword,
      },
      requireAuth: true,
    });
  },

  getEmployeeWithLeaveRequests: async (id) => {
    return await httpClient(`users/${id}`, {
      method: "GET",
      requireAuth: true,
    });
  },
};

export default userService;
