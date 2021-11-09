export default function get_url_param(name, str) {
    const reg = new RegExp(`(^|&)${ name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg);
    if (r != null) return  decodeURIComponent(r[2]); return null;
}