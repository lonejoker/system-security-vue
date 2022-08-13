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
  /**
   * 修改部门
   * @returns
   */
  async updateDept(params) {
    return await http.put("/api/sysDepartment/update", params);
  },
  /**
   * 检查部门下是否存在子部门
   */ async checkDepartment(params) {
    return await http.getRestApi("/api/sysDepartment/check", params);
  },
  /**
   * 删除部门
   */
  async deleteById(params) {
    return await http.delete("/api/sysDepartment/delete", params);
  },
};
