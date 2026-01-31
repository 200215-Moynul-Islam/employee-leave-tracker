import { API_BASE_URL } from "../config/env";

async function httpClient(
  endpoint,
  { method = "GET", body, requireAuth = false } = {}
) {
  const headers = {};
  if (body) {
    headers["Content-Type"] = "application/json";
  }
  if (requireAuth) {
    const token = localStorage.getItem("token");
    headers["Authorization"] = `Bearer ${token}`;
  }
  const options = {
    method,
    headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    const data = await response.json();
    if (!response.ok) {
      throw {
        message: data?.message || "Something went wrong",
        status: response.status,
        data: data,
      };
    }
    return data;
  } catch (error) {
    throw {
      message: error.message || "Network error",
      status: error.status || 500,
      data: error.data || null,
    };
  }
}

export default httpClient;
