import { get } from "../request";

export default function get_encrypt_key(params) {
  return get("/get_encrypt_key.json", params, {timeout: 10000});
}