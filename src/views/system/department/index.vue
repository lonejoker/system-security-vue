<template>
    <el-main>
        <el-form ref="searchForm" label-width="80px" :inline="true" size="small">
            <el-form-item>
                <el-input v-model="searchModel.departmentName" placeholder="请输入部门名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button>
                <el-button type="success" icon="el-icon-plus" @click="openAddWindow()">新增</el-button>
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
        <!-- 添加和修改窗口 -->
        <system-dialog :title="deptDialog.title" :visible="deptDialog.visible" :width="deptDialog.width"
            :height="deptDialog.height" @onClose="onClose" @onConfirm="onConfirm">
            <div slot="content">
                <el-form :model="dept" ref="deptForm" :rules="rules" label-width="80px" :inline="true" size="small">
                    <el-form-item label="所属部门" prop="parentName">
                        <el-input v-model="dept.parentName" @click.native="selectDepartment()" :readonly="true">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="部门名称" prop="departmentName">
                        <el-input v-model="dept.departmentName"></el-input>
                    </el-form-item>
                    <el-form-item label="部门电话">
                        <el-input v-model="dept.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="部门地址">
                        <el-input v-model="dept.address"> </el-input>
                    </el-form-item>
                    <el-form-item label="序号">
                        <el-input v-model="dept.orderNum"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </system-dialog>
        <!-- 选择所属部门窗口 -->
        <system-dialog :title="parentDialog.title" :visible="parentDialog.visible" :width="parentDialog.width"
            :height="parentDialog.height" @onClose="parentOnClose" @onConfirm="parentOnConfirm">
            <div slot="content">
                <el-tree ref="parentTree" :data="treeList" node-key="id" :props="defaultProps"
                    :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false"
                    @node-click="handleNodeClick">
                    <div class="customer-tree-node" slot-scope="{ node, data }">
                        <span v-if="data.children.length === 0">
                            <i class="el-icon-document"></i>
                        </span>
                        <span v-else @click="openBtn(data)">
                            <svg-icon v-if="data.open" icon-class="add-s" />
                            <svg-icon v-else icon-class="sub-s" />
                        </span>
                        <span style="margin-left: 5px">{{ node.label }}</span>
                    </div>
                </el-tree>
            </div>
        </system-dialog>
    </el-main>
</template>
<script>
import departmentApi from "@/api/department";
//导入对话框组件
import SystemDialog from "@/components/system/SystemDialog.vue";
export default {
    name: "Department",
    components: {
        SystemDialog,
    },
    data() {
        return {
            searchModel: {
                departmentName: "",
            },
            tableData: [],
            deptDialog: {
                title: "",
                // 是否显示
                visible: false,
                width: 560,
                height: 270,
            },
            dept: {
                id: "",
                pid: "",
                parentName: "",
                departmentName: "",
                address: "",
                phone: "",
                orderNum: "",
            },
            rules: {
                parentName: [
                    { required: true, trigger: "change", message: "请选择所属部门" },
                ],
                departmentName: [
                    { required: true, trigger: "blur", message: "请输入部门名 称" },
                ],
            },
            parentDialog: {
                title: "",
                visible: false,
                width: 300,
                height: 400,
            },
            treeList: [],
            defaultProps: {
                children: "children",
                label: "departmentName",
            },

        };
    },
    created() {
        this.search()
    },
    methods: {
        // 点击树节点+-号折叠展开事件
        openBtn(data) {
            //修改折叠展开状态      
            data.open = !data.open;
            this.$refs.parentTree.store.nodesMap[data.id].expanded = !data.open;
        },
        // 选择部门取消事件
        parentOnConfirm() {
            this.parentDialog.visible = false;
        },
        // 选择部门确认事件
        parentOnClose() {
            this.parentDialog.visible = false;
        },
        // 选择部门树
        handleNodeClick(data) {
            // 当点击树节点时，赋予选中的值      
            this.dept.pid = data.id;
            this.dept.parentName = data.departmentName;
        },
        // 打开所属部门窗口
        async selectDepartment() {
            this.parentDialog.visible = true;
            this.parentDialog.title = "选择所属部门";
            let res = await departmentApi.getParentTreeList()
            if (res.success) {
                this.treeList = res.data;
            }
        },
        // 打开新增部门窗口
        openAddWindow() {
            // 清空表单数据
            this.$resetForm("deptForm", this.dept);
            this.deptDialog.title = "新增部门";
            this.deptDialog.visible = true;
        },
        // 窗口确认事件
        onConfirm() {
            this.$refs.deptForm.validate(async (valid) => {
                if (valid) {
                    let res = null;
                    if (this.dept.id === '') {
                        res = await departmentApi.addDept(this.dept)
                    } else {
                        res = await departmentApi.updateDept(this.dept)
                    }
                    if (res.success) {
                        this.$message.success(res.message)
                        this.search()
                        this.deptDialog.visible = false
                    } else {
                        this.$message.error(res.message)
                    }
                }
            })
        },
        // 窗口关闭时间
        onClose() {
            this.deptDialog.visible = false;
        },
        // 查询部门列表
        async search() {
            let res = await departmentApi.getDepartmentList(this.searchModel);
            if (res.success) {
                this.tableData = res.data;
            }
        },
        // 编辑
        handleEdit(row) {
            //数据回显  
            this.$objCopy(row, this.dept);
            //设置窗口标题  
            this.deptDialog.title = "编辑部门";
            //显示编辑部门窗口  
            this.deptDialog.visible = true;
        },
        // 删除
        async handleDelete(row) {
            //查询部门下是否存在子部门或用户
            let result = await departmentApi.checkDepartment({ id: row.id });
            //判断是否可以删除
            if (!result.success) {
                //提示不能删除        
                this.$message.warning(result.message);
            } else {
                //确认是否删除      
                let confirm = await this.$myconfirm("确定要删除该数据吗?");
                if (confirm) {
                    //发送删除请求            
                    let res = await departmentApi.deleteById({ id: row.id });
                    //判断是否成功           
                    if (res.success) {
                        //成功提示               
                        this.$message.success(res.message);
                        //刷新
                        this.search();
                    } else {
                        //失败提示                
                        this.$message.error(res.message);
                    }
                }
            }
        },
        reset() {
            this.searchModel.departmentName = ""
            this.search()
        }
    },
};
</script>
<style lang="scss" scoped>
::v-deep .el-tree {
    .el-tree-node {
        position: relative;
        padding-left: 10px;
    }

    .el-tree-node__children {
        padding-left: 20px;
    }

    .el-tree-node :last-child:before {
        height: 40px;
    }

    .el-tree>.el-tree-node:before {
        border-left: none;
    }

    .el-tree>.el-tree-node:after {
        border-top: none;
    }

    .el-tree-node:before,
    .el-tree-node:after {
        content: "";
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px;
    }

    .tree :first-child .el-tree-node:before {
        border-left: none;
    }

    .el-tree-node:before {
        border-left: 1px dotted #d9d9d9;
        bottom: 0px;
        height: 100%;
        top: -25px;
        width: 1px;
    }

    .el-tree-node:after {
        border-top: 1px dotted #d9d9d9;
        height: 20px;
        top: 14px;
        width: 24px;
    }

    .el-tree-node__expand-icon.is-leaf {
        width: 8px;
    }

    .el-tree-node__content>.el-tree-node__expand-icon {
        display: none;
    }

    .el-tree-node__content {
        line-height: 30px;
        height: 30px;
        padding-left: 10px !important;
    }
}

::v-deep .el-tree>div {
    &::before {
        display: none;
    }

    &::after {
        display: none;
    }
}
</style>
