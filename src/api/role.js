import http from "@/utils/request";

export function getRoutes() {}

/**
 * 查询角色列表
 */
export async function getRoles(params) {
  return await http.get("/api/sysRole/list", params);
}

/**
 * 添加角色
 */
export async function addRole(data) {
  return await http.post("/api/sysRole/add", data);
}

/**
 * 修改角色
 */
export async function updateRole(data) {
  return await http.put("/api/sysRole/update", data);
}

export function deleteRole(id) {}
