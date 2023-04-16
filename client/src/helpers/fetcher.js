const domain = "http://localhost:3001";

export const fetcher = async (url, method = "GET", body) => {
  // stringify body
  const bodyOption = { body: body ? JSON.stringify(body) : undefined };
  const token = localStorage.getItem("jwt");
  const headers = {
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  const res = await fetch(domain + url, {
    method,
    ...headers,
    ...(body ? bodyOption : {}),
  });

  let data;
  try {
    data = await res.json();
  } catch (error) {
    throw new Error(` ${res.status}: ${res.statusText}`);
  }

  if (res.status > 299) {
    throw new Error(data.message);
  }

  return data;
};
