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

export async function getMenuList() {
  return await http.get("/api/sysUser/getMenuList");
}

export default {
  /**
   * 查询用户列表
   */
  async getUserList(params) {
    return await http.get("/api/sysUser/list", params);
  },
  /**
   * 添加用户
   */
  async addUser(params) {
    return await http.post("/api/sysUser/add", params);
  },
  /**
   * 编辑用户
   */
  async updateUser(params) {
    return await http.put("/api/sysUser/update", params);
  },
  /**
   * 删除用户
   */
  async deleteUser(params) {
    return await http.delete("/api/sysUser/delete", params);
  },
};
