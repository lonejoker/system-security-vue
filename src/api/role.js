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

/**
 * 检查角色是否被使用
 */
export async function checkRole(params) {
  return await http.getRestApi("/api/sysRole/check", params);
}

/**
 * 删除角色
 */
export async function deleteRole(params) {
  return await http.delete("/api/sysRole/delete", params);
}

/**
 * 查询分配权限树列表
 */
export async function getAssignTree(params) {
  return await http.get("/api/sysRole/getAssignPermissionTree", params);
}

/**
 * 分配权限
 */
export async function assignSaveApi(params) {
  return await http.post("/api/sysRole/saveRoleAssign", params);
}
