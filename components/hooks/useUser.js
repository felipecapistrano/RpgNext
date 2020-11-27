import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function useUser() {
  const [cookies] = useCookies(["user"]);
  const router = useRouter();
  if (!cookies.user && typeof window !== "undefined") router.push("/logon");
  return cookies.user;
}
