import http from "@/utils/request";

export default {
  /**
   * 查询权限菜单列表
   */
  async getMenuList() {
    return await http.get("/api/sysPermission/getMenuList");
  },
};
