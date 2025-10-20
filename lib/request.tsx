import axios from "axios";
import Cookie from "js-cookie";

// Validate environment variables
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseURL || baseURL === "undefined") {
  console.error(
    "❌ ERROR: NEXT_PUBLIC_BASE_URL is not configured!\n" +
    "Please set environment variables in Vercel:\n" +
    "1. Go to Vercel Dashboard → Settings → Environment Variables\n" +
    "2. Add NEXT_PUBLIC_BASE_URL with your backend API URL\n" +
    "3. Add NEXT_PUBLIC_SECRET_KEY with your API secret\n" +
    "4. Redeploy the application\n" +
    "See VERCEL_SETUP.md for detailed instructions."
  );
}

const request = axios.create({
  baseURL: baseURL ? baseURL + "/api" : "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

request.interceptors.request.use((config: any) => {
  const token = Cookie.get("token");
  const lang = global.window && window.location.href.split("/")[3];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.lang = lang ? lang : "en";
  config.headers.userapisecret = process.env.NEXT_PUBLIC_SECRET_KEY;
  return config;
});
request.interceptors.response.use((response: any) => {
  return response;
});

export function apiRequest(base: any, query: any | null) {
  if (query === null) {
    return request(base);
  } else {
    return axios.get(base + query);
  }
}
export default request;
