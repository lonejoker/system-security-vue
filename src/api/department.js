import http from "@/utils/request";

export default {
  /**
   * 查询部门列表
   */
  async getDepartmentList(param) {
    return await http.get("/api/sysDepartment/list", param);
  },
};
