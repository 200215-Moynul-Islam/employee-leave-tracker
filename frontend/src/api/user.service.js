import httpClient from "./httpClient";

const userService = {
  getAllEmployees: async () => {
    return await httpClient("users/employees", {
      method: "GET",
    });
  },

  register: async (user) => {
    return await httpClient("users/register", {
      method: "POST",
      body: user,
    });
  },

  updateUser: async (id, user) => {
    return await httpClient(`users/${id}`, {
      method: "PATCH",
      body: user,
    });
  },

  delete: async (id) => {
    return await httpClient(`users/${id}`, {
      method: "DELETE",
    });
  },

  updatePassword: async (id, newPassword) => {
    return await httpClient(`users/${id}/update-password`, {
      method: "PATCH",
      body: {
        password: newPassword,
      },
    });
  },

  getEmployeeWithLeaveRequests: async (id) => {
    return await httpClient(`users/${id}`, {
      method: "GET",
    });
  },
};

export default userService;
