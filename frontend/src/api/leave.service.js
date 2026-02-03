import CreateLeaveRequest from "../components/CreateLeaveRequest/CreateLeaveRequest";
import httpClient from "./httpClient";

const leaveService = {
  getAllLeaveRequests: async () => {
    return await httpClient("leaves", {
      method: "GET",
      requireAuth: true,
    });
  },

  approveLeaveRequest: async (id, userId) => {
    return await httpClient(`leaves/${id}/approve?userId=${userId}`, {
      method: "PATCH",
      requireAuth: true,
    });
  },

  rejectLeaveRequest: async (id, userId) => {
    return await httpClient(`leaves/${id}/reject?userId=${userId}`, {
      method: "PATCH",
      requireAuth: true,
    });
  },

  CreateLeaveRequest: async (leaveRequest) => {
    return await httpClient("leaves", {
      method: "POST",
      body: leaveRequest,
      requireAuth: true,
    });
  },

  deleteLeaveRequest: async (id, userId) => {
    return await httpClient(`leaves/${id}?userId=${userId}`, {
      method: "DELETE",
      requireAuth: true,
    });
  },
};

export default leaveService;
