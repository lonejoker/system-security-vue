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
};
