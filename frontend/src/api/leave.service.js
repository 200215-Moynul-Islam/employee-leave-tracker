import CreateLeaveRequest from "../components/CreateLeaveRequest/CreateLeaveRequest";
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

  CreateLeaveRequest: async (leaveRequest) => {
    return await httpClient("leaves", {
      method: "POST",
      body: leaveRequest,
    });
  },

  deleteLeaveRequest: async (id, userId) => {
    return await httpClient(`leaves/${id}?userId=${userId}`, {
      method: "DELETE",
    });
  },
};

export default leaveService;
