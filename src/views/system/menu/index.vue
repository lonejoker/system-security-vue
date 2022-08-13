<template>
    <el-main>
        <!-- 新增按钮 -->
        <el-button type="success" size="small" @click="openAddWindow()" icon="el-icon-plus">新增</el-button>
        <!-- 数据表格 -->
        <el-table :data="menuList" :height="tableHeight" style="width: 100%; margin-top: 20px" row-key="id" border
            default-expand-all :tree-props="{ children: 'children' }">
            <el-table-column prop="label" label="菜单名称"></el-table-column>
            <el-table-column prop="type" label="菜单类型" align="center">
                <template slot-scope="scope">
                    <el-tag size="normal" v-if="scope.row.type === 0">目录</el-tag>
                    <el-tag size="normal" type="success" v-else-if="scope.row.type === 1">菜单</el-tag>
                    <el-tag size="normal" type="warning" v-else>按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="icon" label="菜单图标" align="center">
                <template slot-scope="scope">
                    <i :class="scope.row.icon" v-if="scope.row.icon.includes('el-icon')" > </i>
                    <svg-icon v-else :icon-class="scope.row.icon"></svg-icon>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="路由名称"></el-table-column>
            <el-table-column prop="path" label="理由地址"></el-table-column>
            <el-table-column prop="url" label="组件路径"></el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </el-main>
</template>

<script>
//导入menu.js脚本代码 
import menuApi from '@/api/menu';
export default {
    name: "Menu",
    data() {
        return {
            menuList: [], //数据列表
            tableHeight: 0, //表格高度
        };
    },
    created() {
        this.search()
    },
    mounted() {
        this.$nextTick(() => {
            this.tableHeight = window.innerHeight - 180;
        });
    },
    methods: {
        /**
         * 查询菜单列表
         */
        async search() {
            let res = await menuApi.getMenuList();
            console.log(res);
            if (res.success) {
                this.menuList = res.data
            }
        },
        /**
         * 打开新增窗口
         */
        openAddWindow() { },
    },
};
</script>

<style lang="scss" scoped>
</style>
