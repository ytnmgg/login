import { post } from "../request";

export default function login_with_password(params) {
  return post("/login.json", params,{timeout: 10000});
}
