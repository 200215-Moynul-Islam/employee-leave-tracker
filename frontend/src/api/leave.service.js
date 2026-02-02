import httpClient from "./httpClient";

const leaveService = {
  getAllLeaveRequests: async () => {
    return await httpClient("leaves", {
      method: "GET",
    });
  },

  approveLeaveRequest: async (id, userId) => {
    return await httpClient(`leaves/${id}/approve?userId=${userId}`, {
      method: "PATCH",
    });
  },

  rejectLeaveRequest: async (id, userId) => {
    return await httpClient(`leaves/${id}/reject?userId=${userId}`, {
      method: "PATCH",
    });
  },
};

export default leaveService;
