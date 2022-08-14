import http from "@/utils/request";

export default {
  /**
   * 查询权限菜单列表
   */
  async getMenuList() {
    return await http.get("/api/sysPermission/getMenuList");
  },
  /**
   * 选择上级菜单
   */
  async getParentMenuList(params) {
    return await http.get("/api/sysPermission/parent/list", params);
  },
  /**
   * 添加菜单
   * @returns
   */
  async addMenu(params) {
    return await http.post("/api/sysPermission/add", params);
  },
  /**
   * 修改菜单
   */
  async updateMenu(params) {
    return await http.post("/api/sysPermission/update", params);
  },
  /**
   * 检查菜单下是否存在子菜单
   */
  async checkPermission(param) {
    return await http.getRestApi("/api/sysPermission/check", param);
  },
  /**
   * 删除菜单
   * @returns
   */
  async deleteById(params) {
    return await http.delete("/api/sysPermission/delete", params);
  },
};
