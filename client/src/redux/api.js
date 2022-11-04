import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart);
  try {
    const res = await axios.post("/api/user/v1//login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};
