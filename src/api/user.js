import http from "@/utils/request";

export async function login(data) {
  return await http.login("/api/sysUser/login", data);
}

export async function getInfo() {
  return await http.get("/api/sysUser/getInfo");
}

export async function logout(params) {
  return await http.post("/api/sysUser/logout", params);
}

export async function getMenuList(){
    return await http.get("/api/sysUser/getMenuList")
}