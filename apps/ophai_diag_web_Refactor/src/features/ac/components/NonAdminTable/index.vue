<script setup lang="ts">
import {useNonAdminListStore} from "@/features/ac/store/nonAdminList.ts";
import {useUpdatePermission} from "@/features/ac/hooks/useUpdatePermission.ts";
import {useAddOtherUser} from "@/features/ac/hooks/useAddOtherUser.ts";
import {useDeleteUser} from "@/features/ac/hooks/useDeleteUser.ts";
import type {Item} from "@/features/ac/types.ts";
import {Delete} from "@element-plus/icons-vue";

const nonAdminListStore = useNonAdminListStore();
const { updateQuery, handleUpdatePermission } = useUpdatePermission();
const { addOtherUserQuery,handleAddOtherUser } = useAddOtherUser();
const { deleteUserId, handleDeleteUser } = useDeleteUser()
const addOtherFormVisibility = ref<boolean>(false);
const updateFormVisibility = ref<boolean>(false);
const deleteFormVisibility = ref<boolean>(false);
const openUpdateForm = (rowItem: Item) => {
  updateQuery.value.userId = rowItem.userId;
  updateQuery.value.permission = rowItem.permission;
  updateFormVisibility.value = true;
}
const handleAddOtherUserSubmit = () => {
  handleAddOtherUser();
  addOtherFormVisibility.value = false;
}
const handleUpdatePermissionSubmit = () => {
  handleUpdatePermission();
  updateFormVisibility.value = false;
}

const openDeleteForm = (rowItem:Item) => {
  deleteUserId.value = rowItem.userId;
  deleteFormVisibility.value = true;
}

const handleDelete = () =>{
  handleDeleteUser().then(() => {
    deleteFormVisibility.value = false;
    ElMessage.success("删除成功")
  })
}

const permissionMap = new Map([
  [2, "研究员"],
  [3, "医生"],
])


onMounted(()=>{
  nonAdminListStore.setNonAdminList({
    total: 1,
    items: [
      {
        userId: "1",
        userName: "张三",
        doctorNumber: null,
        email: "zhangsan@example.com",
        phone: "1234567890",
        gender: 0,
        age: 30,
        permission: 2,
        idNumber: '1234567890',
      }
    ]
  })
})
</script>

<template>
  <div class="ac-table-container">
    <el-button class="add" type="primary" @click=" addOtherFormVisibility = true ">添加用户</el-button>
    <el-table
        v-if="nonAdminListStore.nonAdminList.items.length > 0"
        :data="nonAdminListStore.nonAdminList.items"
        :row-style="{minHeight: '80px'}"
    >
      <el-table-column prop="permission" label="权限">
        <template #default="scope">
          <el-tag style="cursor: pointer" size="large" @click="openUpdateForm(scope.row)">{{ permissionMap.get(scope.row.permission) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名"/>
      <el-table-column prop="doctorNumber" label="医生工号"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="phone" label="手机号"/>
      <el-table-column prop="gender" label="性别">
        <template #default="scope">
          {{ scope.row.gender === 0 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-icon @click="openDeleteForm(scope.row)">
            <Delete></Delete>
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
    <el-empty
        v-else
        :description="'未找到用户，快去添加新用户吧'"
    />
  </div>
  <el-dialog v-model="addOtherFormVisibility" title="添加用户" style="max-width: 600px">
    <template #default>
      <el-form :model="addOtherUserQuery" label-width="auto">
        <el-form-item label="姓名" required>
          <el-input v-model="addOtherUserQuery.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addOtherUserQuery.passwordHash" type="password" show-password />
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input v-model="addOtherUserQuery.phone" type="number"/>
        </el-form-item>
        <el-form-item label="身份证号" required>
          <el-input v-model="addOtherUserQuery.idNumber" type="number"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addOtherUserQuery.email" type="text" />
        </el-form-item>
        <el-form-item label="性别" required>
          <el-radio-group v-model="addOtherUserQuery.gender">
            <el-radio :value="0">男</el-radio>
            <el-radio :value="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="addOtherUserQuery.age"/>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="addOtherUserQuery.position"/>
        </el-form-item>
        <el-form-item label="权限" required>
          <el-radio-group v-model="addOtherUserQuery.permission">
            <el-radio :value="2">研究员</el-radio>
            <el-radio :value="3">医生</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="handleAddOtherUserSubmit">确定</el-button>
      <el-button type="info" @click="addOtherFormVisibility=false">算了</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="updateFormVisibility" title="修改权限" style="max-width: 600px">
    <template #default>
      <el-form :model="updateQuery" label-width="auto" >
        <el-form-item label="权限">
          <el-radio-group v-model="updateQuery.permission">
            <el-radio border size="large" :value="2">研究员</el-radio>
            <el-radio border size="large" :value="3">医生</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="handleUpdatePermissionSubmit">确定</el-button>
      <el-button type="info" @click="updateFormVisibility=false">算了</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="deleteFormVisibility" style="max-width: 20vw">
    <template #title>
      <h2>确定要删除该用户吗？</h2>
    </template>
    <template #default>
      <el-button type="primary" @click="handleDelete">确定</el-button>
      <el-button type="info" @click="deleteFormVisibility=false">取消</el-button>
    </template>
  </el-dialog >
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@/shared/assets/styles/vars' as vars;
  .ac-table-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: map.get(vars.$space, 'm');

    .add {
      position: relative;
      align-self: flex-end;
    }
  }
  .el-icon {
    svg{
      cursor: pointer;
      transition: all .2s;
      &:hover{
        color: map.get(vars.$colors, 'danger');
      }
    }
  }
</style>