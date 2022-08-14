<template>
    <el-main>
        <!-- 查询条件 -->
        <el-form :model="searchModel" ref="searchForm" label-width="80px" :inline="true" size="small">
            <el-form-item>
                <el-input v-model="searchModel.roleName" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="search(pageNo, pageSize)">查询</el-button>
                <el-button icon="el-icon-refresh-right" @click="resetValue()">重置</el-button>
                <el-button type="success" icon="el-icon-plus" @click="openAddWindow()">新增</el-button>
            </el-form-item>
        </el-form>
        <!-- 数据表格 -->
        <el-table :data="roleList" :height="tableHeight" border stripe style="width: 100%; margin-bottom: 10px">
            <el-table-column prop="id" label="角色编号" width="100" align="center"></el-table-column>
            <el-table-column prop="roleCode" label="角色编码"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="remark" label="角色备注"></el-table-column>
            <el-table-column label="操作" align="center" width="290">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="primary" size="small" @click="handleEdit(scope.row)">编辑
                    </el-button>
                    <el-button icon="el-icon-delete" type="danger" size="small" @click="handleDelete(scope.row)">删除
                    </el-button>
                    <el-button icon="el-icon-setting" type="primary" size="small" @click="assignRole(scope.row)">分配权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页工具栏 -->
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageNo" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 添加和修改角色窗口 -->
        <system-dialog :title="roleDialog.title" :visible="roleDialog.visible" :width="roleDialog.width"
            :height="roleDialog.height" @onClose="onClose" @onConfirm="onConfirm">
            <div slot="content">
                <el-form :model="role" ref="roleForm" :rules="rules" label-width="80px" :inline="false" size="small">
                    <el-form-item label="角色编码" prop="roleCode">
                        <el-input v-model="role.roleCode"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="role.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input type="textarea" v-model="role.remark" :rows="5"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </system-dialog>
    </el-main>
</template>
<script>
//导入role.js脚本 
import { getRoles, addRole, updateRole, checkRole, deleteRole } from '@/api/role';
//导入对话框组件
import SystemDialog from '@/components/system/SystemDialog.vue'
export default {
    name: 'Role',
    components: {
        SystemDialog
    },
    data() {
        return {
            // 查询条件
            searchModel: {
                roleName: '',
                pageNo: 1,
                pageSize: 10,
                userId: this.$store.getters.userId //用户ID
            },
            roleList: [], //数据列表
            tableHeight: 0, //表格高度      
            pageNo: 1, //当前页码      
            pageSize: 10, //每页显示数量     
            total: 0, //总数量
            rules: {
                roleCode: [{ required: true, trigger: 'blur', message: '请输入角色编码' }],
                roleName: [{ required: true, trigger: 'blur', message: '请输入角色名称' }]
            },
            // 添加和修改角色窗口属性
            roleDialog: {
                title: '',
                visible: false,
                height: 230,
                width: 500
            },
            // 角色对象
            role: {
                id: "",
                roleCode: "",
                roleName: "",
                remark: "",
                createUser: this.$store.getters.userId
            }
        }
    },
    created() {
        this.search()
    },
    //挂载后调用
    mounted() {
        this.$nextTick(() => {
            this.tableHeight = window.innerHeight - 220
        })
    },
    methods: {
        /**
         * 窗口取消事件
         */
        onClose() {
            this.roleDialog.visible = false
        },
        /**
         * 窗口确认事件
         */
        onConfirm() {
            //表单验证      
            this.$refs.roleForm.validate(async (valid) => {
                if (valid) {
                    let res = null;
                    //判断角色ID是否为空      
                    if (this.role.id === "") {
                        //新增      
                        //发送添加请求    
                        res = await addRole(this.role);
                    } else {
                        //发送修改请求
                        res = await updateRole(this.role);
                    }
                    //判断是否成功   
                    if (res.success) {
                        this.$message.success(res.message);
                        //刷新       
                        this.search(this.pageNo, this.pageSize);
                        //关闭窗口       
                        this.roleDialog.visible = false;
                    } else {
                        this.$message.error(res.message);
                    }
                }
            });
        },
        /**
         * 打开添加窗口
         */
        openAddWindow() {
            //清空表单数据      
            this.$resetForm("roleForm", this.role);
            //设置窗口标题  
            this.roleDialog.title = '新增角色'
            this.roleDialog.visible = true
        },
        /**
         * 查询
         */
        async search(pageNo = 1, pageSize = 10) {
            this.searchModel.pageNo = pageNo
            this.searchModel.pageSize = pageSize
            let res = await getRoles(this.searchModel)
            if (res.success) {
                this.roleList = res.data.records
                this.total = res.data.total
            }
        },
        /**
         * 重置查询条件
         */
        resetValue() {
            this.searchModel.roleName = ''
            this.searchModel.pageNo = 1
            this.searchModel.pageSize = 10
            this.search()
        },
        /**
         * 当每页数量发生变化时触发该事件
         */
        handleSizeChange(size) {
            this.pageSize = size
            this.search(this.pageNo, size)
        },
        /**
         * 当页码发生变化时触发该事件
         */
        handleCurrentChange(page) {
            this.pageNo = page
            this.search(page, this.pageSize)
        },
        /**
         * 打开编辑窗口    
         */
        handleEdit(row) {
            //数据回显  
            this.$objCopy(row, this.role);
            //将当前编辑的数据复制到role对象中  
            //设置窗口标题  
            this.roleDialog.title = "编辑角色";
            //显示编辑角色窗口 
            this.roleDialog.visible = true;
        },
        /**
         * 删除 
         */
        async handleDelete(row) {
            //检查角色是否被使用
            let result = await checkRole({ id: row.id });
            //判断是否可以删除
            if (!result.success) {
                //提示不能删除        
                this.$message.warning(result.message);
            } else {
                //确认是否删除      
                let confirm = await this.$myconfirm("确定要删除该数据吗?");
                if (confirm) {
                    //发送删除请求            
                    let res = await deleteRole({ id: row.id });
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
        /**
         * 分配角色
         */
        assignRole() { }
    }
}
</script>
<style lang="less" scoped>
</style>
