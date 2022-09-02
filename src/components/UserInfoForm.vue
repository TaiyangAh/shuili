<template>
  <el-form class="el-form" :label-position="labelPosition" label-width="160px" :model="ruleForm" :rules="rules" ref="ruleForm" style="font-size:10px">
    &nbsp;<h2 style="margin-left: 30%;font-size:1.6rem">用户信息收集</h2>&nbsp;
    <el-form-item label="登录账号" prop="account">
      <el-col :span="16">
        <el-input v-model="ruleForm.account"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-col :span="16">
        <el-input v-model="ruleForm.username" placeholder="请输入内容"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="用户密码" prop="pwd">
      <el-col :span="16">
        <el-input placeholder="请输入密码" v-model="ruleForm.pwd" show-password></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="用户类型" prop="role">
      <el-col :span="16">
        <el-select v-model="ruleForm.role">
          <el-option label="总河长" value="0"></el-option>
          <el-option label="河湖长" value="1"></el-option>
          <el-option label="河长办" value="2"></el-option>
          <el-option label="成员单位" value="3"></el-option>
          <el-option label="其他工作人员" value="4"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="行政区划" prop="adgrad">
      <el-cascader
        v-model="ruleForm.address"
        :options="cityList"
        :props="{checkStrictly:true}"
        clearable
        >
      </el-cascader>
    </el-form-item>
    <el-form-item label="职务" prop="duties">
      <el-col :span="16">
        <el-input v-model="ruleForm.duties" placeholder="请输入内容"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-col :span="16">
        <el-input v-model="ruleForm.email" placeholder="请输入内容"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="性别" prop="six">
      <el-col :span="16">
        <el-select v-model="ruleForm.six">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="电话" prop="tel">
      <el-col :span="16">
        <el-input v-model="ruleForm.tel" placeholder="请输入内容"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="组织机构" prop="organization">
      <el-col :span="16">
        <el-input v-model="ruleForm.organization" placeholder="请输入内容"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('ruleForm')" size="small" class="button">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {getAllarea, saveUserInfor} from "@/api/index"

export default {
    data() {
      return {
        cityList:[],
        labelPosition: 'right',
        ruleForm: {
          account: '',
          adgrad:'2',
          allareaid:'',
          duties: '',
          email: '',
          organization:'',
          pwd: '',
          role:"",
          six:"",
          tel:"",
          username:"",
          address:""
        },
        rules:{
          account: [{required:true,message:'请输入登录账号'}],
          adgrad:[{required:true,message:'请输入行政区级别'}],
          duties: [{required:true,message:'请输入职务'}],
          email: [{required:true,message:'请输入邮箱'}],
          pwd:{required:true,message:'请输入用户密码'},
          role:{required:true,message:'请输入河长角色'},
          six:{required:true,message:'请输入性别'},
          tel:{required:true,message:'请输入电话'},
          username:{required:true,message:'请输入用户名称'},
        },
        props:{
          label: 'name',
          value: 'id',
          children: 'xian',
          checkStrictly:true
        }
      };
    },
    methods: {
      onSubmit(formName) {
        console.log("已提交")
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            saveUserInfor(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },

    created() {
      getAllarea(0).then(res => this.cityList = res.data.data.map(
        (item) => {return {label:item.adname,value:item.adcode,child:[]}}
        )
      )
      // this.cityList = res.data.data.map(item => item.adname)
      // console.log(res.data.data.map(item => item.adname))
    }
  }

</script>

<style lang="less" scoped>
  
  .button{
    margin-left: 500px;
  }
  .el-form{
    margin-left: 20%;
  }
</style>