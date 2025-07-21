const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const cookieFetch = async (path: string, options: RequestInit = {}) => {
  const method = options.method || "GET";
  console.log(`🌐 API 요청: ${method} ${API_BASE_URL}${path}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
