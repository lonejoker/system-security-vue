<template>
    <el-main>
        <el-form ref="searchForm" label-width="80px" :inline="true" size="small">
            <el-form-item>
                <el-input v-model="searchModel.departmentName" placeholder="请输入部门名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                <el-button icon="el-icon-refresh-right">重置</el-button>
                <el-button type="success" icon="el-icon-plus">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border stripe style="width: 100%; margin-bottom: 20px" row-key="id"
            default-expand-all :tree-props="{ children: 'children' }">
            <el-table-column prop="departmentName" label="部门名称"></el-table-column>
            <el-table-column prop="parentName" label="所属部门"></el-table-column>
            <el-table-column prop="phone" label="部门电话"></el-table-column>
            <el-table-column prop="address" label="部门位置"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit-outline" type="primary" size="small" @click="handleEdit(scope.row)">编辑
                    </el-button>
                    <el-button icon="el-icon-close" type="danger" size="small" @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-main>
</template>
<script>
import departmentApi from "@/api/department";
export default {
    name: 'Department',
    data() {
        return {
            searchModel: {
                departmentName: "",
            },
            tableData: []
        }
    },
    created() {
        this.search()
    },
    methods: {
        async search() {
            let res = await departmentApi.getDepartmentList(this.searchModel)
            if (res.success) {
                this.tableData = res.data;
            }
        },
        handleEdit(row) {

        },
        handleDelete(row) {

        }
    }
}
</script>
<style lang="less" scoped>
</style>
