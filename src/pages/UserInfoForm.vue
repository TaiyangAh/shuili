<template>
  <van-form class="form">
    &nbsp;<h2 style="margin-left: 20%;font-size:1.3rem">智慧河长用户信息收集</h2>&nbsp;
    <van-field v-model="ruleForm.account" required :rules="[{ required: true, message: '请填写用户名' }]" label="登录账号" placeholder="请输入账号">
    </van-field>
    <van-field v-model="ruleForm.username" required label="用户名" placeholder="请输入用户名">
    </van-field>
    <van-field v-model="ruleForm.pwd" required label="用户密码" placeholder="请输入密码" type="password">
    </van-field>
    <van-field name="radio" label="用户类型" required>
      <template #input>
        <van-radio-group v-model="ruleForm.role" direction="horizontal">
          <van-radio name="0">总河长</van-radio>&nbsp;
          <van-radio name="1">河湖长</van-radio>&nbsp;
          <van-radio name="2">河长办</van-radio>&nbsp;
          <van-radio name="3">成员单位</van-radio>&nbsp;
          <van-radio name="4">其他工作人员</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="fieldValue"
      required
      is-link
      readonly
      label="地区"
      placeholder="请选择所在地区"
      @click="show = true"
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
    <van-field v-model="ruleForm.duties" required label="职务" placeholder="请输入职务">
    </van-field>
    <van-field v-model="ruleForm.tel" required label="电话" placeholder="请输入电话">
    </van-field>
    <van-field v-model="ruleForm.email" label="邮箱" placeholder="请输入邮箱" type="email">
    </van-field>
    <van-field name="radio" label="性别">
      <template #input>
        <van-radio-group v-model="ruleForm.six" direction="horizontal">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field v-model="ruleForm.organization" clearable label="组织机构" placeholder="请输入组织机构">
    </van-field>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="onSubmit" class="button">提交</van-button>
    </div>
  </van-form>
</template>

<script>
import {getAllarea, saveUserInfor} from "@/api/index"

export default {
    data() {
      return {
        show: false,
        fieldValue: '',
        cascaderValue:'',
        options:[],
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
        },
      };
    },
    methods: {
      onSubmit() {
        console.log("已提交")
        this.ruleForm.allareaid = this.cascaderValue
        saveUserInfor(this.ruleForm)
      },
       // 全部选项选择完毕后，会触发 finish 事件
      onFinish({ selectedOptions }) {
        this.show = false;
        // console.log(selectedOptions)
        this.fieldValue = selectedOptions.map((option) => option.text).join('/');
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

      onChangeArea({ value, selectedOptions}) {
      // 接口返回children数据，拿到数据后，动态添加
        getAllarea(value).then(res => {
          this.addTree(selectedOptions, res.data.data, value)
          // console.log('options',this.options)
          // this.$forceUpdate();
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
  }
</style>