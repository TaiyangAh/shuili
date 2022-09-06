<template>
  <van-form class="form" ref="form">
    &nbsp;<h2 style="margin-left: 20%;font-size:1.3rem">智慧河长用户信息收集</h2>&nbsp;
    <van-field v-model="ruleForm.account" required  label="登录账号" placeholder="请输入账号" :rules="[{ required: true, message: '必填项' }]">
    </van-field>
    <van-field v-model="ruleForm.username" required label="用户名" placeholder="请输入用户名" :rules="[{ required: true, message: '必填项' }]">
    </van-field>
    <van-field v-model="ruleForm.pwd" required label="用户密码" placeholder="请输入密码" type="password" :rules="[{ required: true, message: '必填项' }]">
    </van-field>
    <!-- <van-field name="radio" label="用户类型" required>
      <template #input>
        <van-radio-group v-model="ruleForm.role" direction="horizontal">
          <van-radio name="0">总河长</van-radio>&nbsp;
          <van-radio name="1">河湖长</van-radio>&nbsp;
          <van-radio name="2">河长办</van-radio>&nbsp;
          <van-radio name="3">成员单位</van-radio>&nbsp;
          <van-radio name="4">其他工作人员</van-radio>
        </van-radio-group>
      </template>
    </van-field> -->
    <van-field
      v-model="fieldValue1"
      required
      is-link
      readonly
      label="用户类型"
      placeholder="请选择用户类型"
      @click="show1 = true"
      :rules="[{ required: true, message: '必填项' }]"
    />
    <van-popup v-model="show1" round position="bottom" >
      <van-cascader
        title="请选择请选择用户类型"
        v-model="ruleForm.role"
        :options="roleOptions"
        @close="show1 = false"
        @finish="onFinish1"
      />
    </van-popup>
    
    <van-field
      v-model="fieldValue6"
      required
      is-link
      readonly
      v-if="ruleForm.role==='0' || ruleForm.role==='1'"
      label="河湖长级别"
      placeholder="河湖长级别"
      @click="show6 = true"
      :rules="[{ required: true, message: '必填项' }]"
    />
    <van-popup v-model="show6" round position="bottom">
      <van-cascader
        title="请选择河湖长级别"
        v-model="ruleForm.rvmsgrad"
        :options="levelOptions"
        @close="show6 = false"
        @finish="onFinish6"
      />
    </van-popup>

    <van-field v-model="ruleForm.rivername" v-if="ruleForm.role==='0' || ruleForm.role==='1'" required label="对应河段名称" placeholder="请输入对应河段名称" :rules="[{ required: true, message: '必填项' }]">
    </van-field>
    <van-field
      v-model="fieldValue"
      required
      is-link
      readonly
      label="地区"
      placeholder="请选择所在地区"
      @click="show = true"
      :rules="[{ required: true, message: '必填项' }]"
    />
    <van-popup v-model="show" round position="bottom">
      <van-cascader
        title="请选择所在地区"
        v-model="cascaderValue"
        :options="options"
        @change="onChangeArea"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
    <van-field v-model="ruleForm.duties" required label="职务" placeholder="请输入职务" :rules="[{ required: true, message: '必填项' }]">
    </van-field>
    <van-field v-model="ruleForm.tel" required label="电话" placeholder="请输入电话" :rules="[{ required: true, message: '必填项' }]">
    </van-field>
    <van-field v-model="ruleForm.email" label="邮箱" placeholder="请输入邮箱" type="email">
    </van-field>
    <!-- <van-field name="radio" label="性别">
      <template #input>
        <van-radio-group v-model="ruleForm.six" direction="horizontal">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>
      </template>
    </van-field> -->
    <van-field
      v-model="fieldValue2"
      is-link
      readonly
      label="性别"
      placeholder="请选择性别"
      @click="show2 = true"
    />
    <van-popup v-model="show2" round position="bottom">
      <van-cascader
        title="请选择性别"
        v-model="ruleForm.six"
        :options="sexOptions"
        @close="show2 = false"
        @finish="onFinish2"
      />
    </van-popup>

    <van-field
      v-model="fieldValue3"
      is-link
      required
      readonly
      label="组织机构"
      placeholder="请选择组织机构"
      v-if="orgLength<4"
      @click="show3 = true"
      :rules="[{ required: true, message: '必填项' }]"
    />
    <van-popup v-model="show3" round position="bottom">
      <van-cascader
        title="请选择组织机构"
        v-model="ruleForm.organization"
        :options="organizationOptions"
        @close="show3 = false"
        @finish="onFinish3"
      />
    </van-popup>
    <van-popup style="width:80vw; height:200px;" v-model="addOrganizationBoxShow" round position="center">
      <van-field class="addOrganizationItem" style="margin-top:30px;" v-model="ruleForm.organization" required label="组织结构名称：" placeholder="请输入组织结构名称">
    </van-field>
    <van-field name="radio" label="是否河长办：">
      <template #input>
        <van-radio-group v-model="organization.isRv" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="0">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
     <div class="addOrganizationQueRenBox">
            <van-button round block type="info" @click="addOrganization" class="button">确认</van-button>
            <van-button round block type="info" @click="addOrganizationBoxShow = false" class="button">取消</van-button>
     </div>
    </van-popup>
    <a class="addOrganizationLink" href="javascript:;" @click="initAddOrganizationBox" v-if="orgLength<4"  style="margin-top:5px">没有找到所属组织？</a>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="onSubmit" class="button">提交</van-button>
    </div>
  </van-form>
</template>

<script>
import {getAllarea, saveUserInfor,getOrganizationList,saveOrganizationList} from "@/api/index"

export default {
    data() {
      return {
        show: false,
        show1: false,
        show2: false,
        show3: false,
        show6: false,
        fieldValue: '',
        fieldValue1: '',
        fieldValue2: '',
        fieldValue3: '',
        fieldValue6: '',
        cascaderValue:'',
        options:[],
        roleOptions:[
          {text:"总河长",value:"0"},
          {text:"河湖长",value:"1"},
          {text:"河长办",value:"2"},
          {text:"成员单位",value:"3"},
          {text:"其他工作人员",value:"4"},
        ],
        sexOptions:[
          {text:"男",value:"0"},
          {text:"女",value:"1"},
        ],
        organization:{
          allareaid: "string",
          grad: 0,
          isRv: "1",
          oname: "string"
        },
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
          rivername:"",
          rvmsgrad:"",
        },
        // 组织结构
        // 组织结构数据
        organizationOptions:[{text:"测试",value:"0"}],
        organizationShow:false,
        // 组织结构添加弹窗
        addOrganizationBoxShow:false,
        orgLength:0,
        levelOptions:[
          {text:"省级",value:"0"},
          {text:"市级",value:"1"},
          {text:"县级",value:"2"},
          {text:"乡级",value:"3"},
          {text:"村级",value:"4"},
        ],
      };
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate().then(()=>{
          this.ruleForm.allareaid = this.cascaderValue
          if(this.orgLength>=4){
            this.ruleForm.organization = '';
          }
          saveUserInfor(this.ruleForm).then(res=>{
            if(res.data.code==200){
              // console.log("----已提交")
              this.$notify({ type: 'success', message: '提交成功' });
            }else{
              this.$notify({ type: 'danger', message: res.data.message });
            }
          })
        }
      )},
       // 全部选项选择完毕后，会触发 finish 事件
      onFinish({ selectedOptions }) {
        this.show = false;
        // console.log(selectedOptions)
        this.fieldValue = selectedOptions.map((option) => option.text).join('/');
      },
      onFinish1({ selectedOptions }) {
        this.show1 = false;
        // console.log(selectedOptions)
        this.fieldValue1 = selectedOptions.map((option) => option.text).join('/');
      },
      onFinish2({ selectedOptions }) {
        this.show2 = false;
        // console.log(selectedOptions)
        this.fieldValue2 = selectedOptions.map((option) => option.text).join('/');
      },
      onFinish3({ selectedOptions }) {
        this.show3 = false;
        // console.log(selectedOptions)
        this.fieldValue3 = selectedOptions.map((option) => option.text).join('/');
      },
      onFinish6({ selectedOptions }) {
        this.show6 = false;
        // console.log(selectedOptions)
        this.fieldValue6 = selectedOptions.map((option) => option.text).join('/');
      },

      async getAllarea(value) {
        let res = await getAllarea(value)
        res.data.data.forEach(item => {
          this.options.push({
            text: item.adname,
            value: item.adcode,
            children: item.children || null
          })
        })
      },

      // 获得组织结构列表
      async getOrganizationList(value) {
        let res = await getOrganizationList(value)
        this.fieldValue3 = ""
        this.organizationOptions = []
        res.data.data.forEach(item=>{
          let temp = {
             text:item.oname,
             value:item.id
          }
          this.organizationOptions.push(temp)
        })
      },

      onChangeArea({ value, selectedOptions}) {
      // 接口返回children数据，拿到数据后，动态添加
        console.log(selectedOptions)
        this.orgLength = selectedOptions.length;
        getAllarea(value).then(res => {
          this.addTree(selectedOptions, res.data.data, value)
          this.getOrganizationList(this.cascaderValue)
        })
      },

      addTree(selectedOptions, children, value) {
        selectedOptions.forEach(item => {
          if (item.value === value) {
            item.children = children.map(
              (item) => {return {text:item.adname,value:item.adcode,children:item.children || null}}
            )
          }
        })
      },
      // 组织结构弹框显示
      initAddOrganizationBox(){
          this.addOrganizationBoxShow = true
          this.ruleForm.organization = ''
          this.ruleForm.isRv = ''
      },
      // 组织选择改变
      onChange(value,name){
        this.ruleForm.organization = name
      },
      // 组织结构选择确认
      onConfirm(){
        this.organizationShow = false    
      },
      addOrganization(){
        this.organization.allareaid = this.cascaderValue
        this.organization.oname = this.ruleForm.organization
        this.organization.grad  = this.ruleForm.adgrad
        console.log(this.organization)
        saveOrganizationList(this.organization)
        this.addOrganizationBoxShow = false
      }
    },
    created() {
      getAllarea(0).then(res => this.options = res.data.data.map(
        (item) => {return {text:item.adname,value:item.adcode,children:null}}
        )
      )
    }
  }

</script>

<style lang="less" scoped>
  .button{
    margin-top: 50px;
  }
  .form{
    margin: 16px;
    .addOrganizationLink{
      margin-left: 110px;
    }
    .addOrganizationItem{
      ::v-deep .van-field__label{
        width: 7em;
      }
    }
    .addOrganizationQueRenBox{
      .button{
        display: inline-block;
        width: 60px;
        margin-top: 10px;
      }
      .button:nth-child(1){
        margin-left: 25vw;
      }
      .button:nth-child(2){
        margin-left:5vw;
      }
    }
  }
  
</style>