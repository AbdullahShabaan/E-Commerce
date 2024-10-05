import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "valid" | "invalid" | "failed";

const useCheckAvailableEmail = () => {
  const [status, setStatus] = useState<TStatus>("idle");
  const [prevEmail, setPrevEmail] = useState("");

  const checkEmailAvailability = async (email: string) => {
    setPrevEmail(email);
    setStatus("checking");
    try {
      const req = await axios.get(`/users?email=${email}`);
      if (req.data.length > 0) {
        setStatus("invalid");
      } else {
        setStatus("valid");
      }
    } catch (e) {
      setStatus("failed");
      console.log(e);
    }
  };

  const resetCheckAvailableEmail = () => {
    setStatus("idle");
    setPrevEmail("");
  };
  return {
    checkEmailAvailability,
    status,
    prevEmail,
    resetCheckAvailableEmail,
  };
};

export default useCheckAvailableEmail;
