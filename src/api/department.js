import http from "@/utils/request";

export default {
  /**
   * 查询部门列表
   */
  async getDepartmentList(param) {
    return await http.get("/api/sysDepartment/list", param);
  },
  /**
   * 获取所属部门列表
   */
  async getParentTreeList() {
    return await http.get("/api/sysDepartment/parent/list");
  },
  /**
   * 新增部门
   */
  async addDept(params) {
    return await http.post("/api/sysDepartment/add", params);
  },
};
