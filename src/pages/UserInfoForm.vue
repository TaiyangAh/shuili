<template>
  <van-form class="form" ref="form">
    &nbsp;<h2 style="margin-left: 20%;font-size:1.3rem">智慧河长用户信息收集</h2>&nbsp;
    <van-field v-model="ruleForm.account" required clearable label="用户名" placeholder="请输入登录账号名" :rules="[{ required: true, message: '' }]">
    </van-field>
    <div style="position:relative">
      <van-field name="pwd" v-model="ruleForm.pwd" required label="用户密码" placeholder="请输入密码" :type="passwordType" 
        :rules="[{ required: true, message: '' },{ validator, message: '密码长度为6-16位，至少包含一个特殊字符、数字、字母，且不含空格',trigger:'onBlur'}]">
      </van-field>
      <van-icon class="eye" @click="unshowPwd" v-if="isOpen" name="eye-o" />
      <van-icon class="eye"  @click="showPwd" v-else name="closed-eye" />
    </div>

    <van-field v-model="ruleForm.username" required clearable label="姓名" placeholder="请输入姓名" :rules="[{ required: true}]">
    </van-field>
    <van-field v-model="ruleForm.tel" required clearable label="手机号码" placeholder="请输入手机号码" :rules="[{ required: true, message: '' }]">
    </van-field>
    <span class="addOrganizationLink" style="color:red;margin-top:3px">手机号用于注册账号，随后收到短信</span>
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
    <van-field v-model="ruleForm.duties" required label="职务" placeholder="请输入职务" :rules="[{ required: true, message: '' }]">
    </van-field>
    
    
    <!-- <van-field v-model="ruleForm.email" label="邮箱" clearable placeholder="请输入邮箱" type="email">
    </van-field> -->
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
      :rules="[{ required: true, message: '' }]"
    />
    <van-popup v-model="show1" round position="bottom" >
      <van-cascader
        title="请选择用户类型"
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
      :rules="[{ required: true, message: '' }]"
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

    <van-field v-model="ruleForm.rivername" v-if="ruleForm.role==='0' || ruleForm.role==='1'" required clearable label="对应河段名称" placeholder="请输入对应河段名称" :rules="[{ required: true, message: '' }]">
    </van-field>&nbsp;
    <div v-if="ruleForm.role==='0' || ruleForm.role==='1'">
      <span style="margin-left:5%">河段景观照片</span>
      <van-uploader style="margin-left:35%" :after-read="afterRead" :max-count="1"
       @oversize="onOversize" v-model="fileList" upload-icon="plus"/>
    </div>

    <van-field
      v-model="fieldValue7"
      v-if="ruleForm.role==='0' || ruleForm.role==='1'"
      required
      is-link
      readonly
      label="经纬度"
      placeholder="请选择所在经纬度"
      @click="show7 = true"
      :rules="[{ required: true, message: '' }]"
    />
    <van-popup v-model="show7"
      position="bottom"
      :style="{ height: '60%' }" round>
      <baidu-map
        class="bm-view" 
        :center="center" 
        :zoom="zoom" 
        @ready="handler"
        @touchstart="getLocationPoint"
        >
        <bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" @click="lookDetail()">
          <bm-info-window :title="center.address" :position="{lng: center.lng, lat: center.lat}" :show="visible" @close="infoWindowClose()" @open="infoWindowOpen()">
            <div v-text="'经度：'+center.lng"></div>
            <div v-text="'纬度：'+center.lat"></div>
            <van-button type="mini" @click="confirmMark">确认选点</van-button>
          </bm-info-window>
        </bm-marker>
      </baidu-map>
    </van-popup>
    <div v-if="ruleForm.role==='0' || ruleForm.role==='1'">
      <van-field v-model="ruleForm.longti" required clearable label="经度" placeholder="请输入公示牌所在经度" :rules="[{ required: true, message: '' }]">
      </van-field>
      <van-field v-model="ruleForm.lati" required clearable label="纬度" placeholder="请输入公示牌所在纬度" :rules="[{ required: true, message: '' }]">
      </van-field>
    </div>
    <van-field
      v-model="fieldValue8"
      required
      is-link
      readonly
      label="行政级别"
      placeholder="请选择行政级别"
      @click="show8 = true"
      :rules="[{ required: true, message: '' }]"
    />
    <van-popup v-model="show8" round position="bottom" >
      <van-cascader
        title="请选择行政级别"
        v-model="ruleForm.level"
        :options="levelList"
        @change="onChangeLevel"
        @close="show8 = false"
        @finish="onFinish8"
      />
    </van-popup>
    <van-field
      v-model="fieldValue" 
      v-if="ruleForm.level!=='0'"
      required
      is-link
      readonly
      label="行政区划"
      placeholder="请选择所在行政区划"
      @click="show = true"
      :rules="[{ required: true, message: '' }]"
    />
    <van-popup v-model="show" round position="bottom">
      <van-cascader
        title="请选择所在行政区划"
        v-model="cascaderValue"
        :options="options"
        @change="onChangeArea"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
    <van-field
      v-model="fieldValue3" style="margin-bottom:5px"
      is-link
      required
      readonly
      label="组织机构"
      placeholder="请选择组织机构"
      :disabled="ruleForm.role==='0' || ruleForm.role==='1' || ruleForm.role==='2'"
      v-if="orgLength<4"
      @click="show3 = true"
      :rules="[{ required: true, message: '' }]"
    />
      <a class="addOrganizationLink" href="javascript:;" @click="initAddOrganizationBox" v-if="orgLength<4">没有找到所属组织？</a>
    <!-- <van-field name="radio" label="性别">
      <template #input>
        <van-radio-group v-model="ruleForm.six" direction="horizontal">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>
      </template>
    </van-field> -->

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
      <van-field class="addOrganizationItem" style="margin-top:35px;" v-model="ruleForm.organization" required label="组织机构名称：" placeholder="请输入组织机构名称">
      </van-field>
    <!-- <van-field name="radio" label="是否河长办：" v-if="ruleForm.role !=='0' && ruleForm.role !=='1' && ruleForm.role!=='2'">
      <template #input>
        <van-radio-group v-model="organization.isRv" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="0">否</van-radio>
        </van-radio-group>
      </template>
    </van-field> -->
     <div class="addOrganizationQueRenBox">
          <van-button round block type="info" @click="addOrganization" class="button">确认</van-button>
          <van-button round block type="info" @click="addOrganizationBoxShow = false" class="button">取消</van-button>
     </div>
    </van-popup>
    
    <div style="margin: 16px;">
      <van-button round block type="info" @click="onSubmit" class="button">提交</van-button>
    </div>
  </van-form>
</template>

<script>
import {getAllarea, saveUserInfor,getOrganizationList,saveOrganizationList,uploadImg} from "@/api/index"
import { Toast } from 'vant';

export default {
    data() {
      return {
        show: false,
        show1: false,
        show2: false,
        show3: false,
        show6: false,
        show7: false,
        show8:false,
        fieldValue: '',
        fieldValue1: '',
        fieldValue2: '',
        fieldValue3: '',
        fieldValue6: '',
        fieldValue7: '',
        fieldValue8: '',
        cascaderValue:'',
        passwordType:'password',
        options:[],
        roleOptions:[
          {text:"总河长",value:"0"},
          {text:"河湖长",value:"1"},
          {text:"河长办",value:"2"},
          {text:"成员单位",value:"3"},
          {text:"其他",value:"4"}
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
        levelList:[
          {text:"省级",value:"0"},
          {text:"市级",value:"1"},
          {text:"县级",value:"2"},
          {text:"乡级",value:"3"},
          {text:"村级",value:"4"},
        ],
        selectedLevelLength:"",
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
          longti:"",
          lati:"",
          level:'',
          image:"",
        },
        // 组织结构
        // 组织结构数据
        organizationOptions:[],
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
        center: {address: '', lng: 112.94547320, lat: 28.23488940},
        zoom: 10,
        visible: false,
        myGeo: null,
        map:null,
        detailInfo: {},
        isOpen:false
      };
    },
    methods: {
      unshowPwd(){
        this.isOpen = false;
        this.passwordType = 'password';
        this.$refs.form.validate('pwd');
      },
      showPwd(){
        this.isOpen = true;
        this.passwordType = ''
        this.$refs.form.validate('pwd');
      },
      validator(val){
         // eslint-disable-next-line
        const flag1 = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+|<>,.?/\\:;'\[\]{}"]).{6,16}$/.test(val);
        const flag2 = val.indexOf(' ') === -1;//字符串中无空格
        console.log('flag1',flag1)
        console.log('flag2',flag2)
        return flag1 && flag2;
      },
      onSubmit() {
        this.$refs.form.validate().then(()=>{
          this.ruleForm.allareaid = this.cascaderValue
          this.ruleForm.lati = this.center.lat
          this.ruleForm.longti = this.center.lng
          if(this.orgLength>=4){
            this.ruleForm.organization = '';
          }
           /* 验证行政级别与行政区划是否一致 */
          // if((this.selectedLevelLength !=="" )
          // &&this.ruleForm.level != this.selectedLevelLength)
          // {
          //   Toast({
          //     message:"行政级别请与行政区划保持一致",
          //     type:"fail"
          //   }),
          //   this.fieldValue8 = "",
          //   this.fieldValue = "",
          // }
          saveUserInfor(this.ruleForm).then(res=>{
            if(res.data.code==200 ){
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
        // console.log(selectedOptions)
        if(this.ruleForm.level === ''){
          Toast({
            message:"请先选择行政级别",
            type:"fail"
          }),
          this.show = false,
          this.cascaderValue = ''
        }else{
          this.selectedLevelLength = selectedOptions.length
          console.log(selectedOptions.length)
          if(this.ruleForm.level == selectedOptions.length){
            this.show = false
            this.fieldValue = selectedOptions.map((option) => option.text).join('/');
            selectedOptions.length = 0
            selectedOptions = ''
          }
          // }
          // if((selectedOptions.length != this.ruleForm.level)
          //  && (this.ruleForm.level < selectedOptions.length) ){
          //   Toast({
          //     message:"行政级别请与行政区划保持一致",
          //     type:"fail"
          //   }),
          //   this.fieldValue = "",
          //   this.show = false
          // else{
            // this.fieldValue = selectedOptions.map((option) => option.text).join('/');
            // if(this.ruleForm.level == selectedOptions.length){
            //   this.show = false
            // }
          // }
          this.selectedLevelLength = ""
          this.orgLength = 0
          // selectedOptions.length = 0
        }
      },
      onFinish1({ selectedOptions }) {
        this.show1 = false;
        this.fieldValue1 = selectedOptions.map((option) => option.text).join('/');
        let flag = false;
        for(let i=0,len=this.organizationOptions.length;i<len;i++){
          if(this.organizationOptions[i].text == '河长办'){
             flag = true;
             this.fieldValue3 = '河长办'
             this.ruleForm.organization = this.organizationOptions[i].value;
             break;
          }
        }
        if(!flag && (this.ruleForm.role==='0' || this.ruleForm.role==='1' ||this.ruleForm.role==='2')){
          this.organization.isRv = '1'
        }
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
      // onFinish7({ selectedOptions }) {
      //   this.show7 = false;
      //   this.fieldValue7 = selectedOptions.map((option) => option.text).join('/');
      // },
      onFinish8({ selectedOptions }){
        if((this.selectedLevelLength !=="")
          && this.selectedLevelLength!==this.ruleForm.level){
            Toast({
              message:"行政级别请与行政区划保持一致",
              type:"fail"
            }),
            this.fieldValue8 = "",
            this.show8 = false
        }else{
          this.show8 = false;
          this.fieldValue8 = selectedOptions.map((option) => option.text).join('/');
        }
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
        this.organizationOptions = []
        this.getOrganizationList(this.cascaderValue)
        this.orgLength = selectedOptions.length;
        // if(this.orgLength == this.ruleForm.level){
        //   this.show = false;
        //   return
        // }
        // this.fieldValue = ''
        if(this.ruleForm.level > this.orgLength){
          getAllarea(value).then(res => {
            this.addTree(selectedOptions, res.data.data, value)
            this.getOrganizationList(this.cascaderValue)
          })
          // selectedOptions = ''
          // this.orgLength = 0
        }
        // if(this.fieldValue8 == '市级'){
        //   this.show = false
        // }
      },
      //行政级别选为省级，获取省级组织机构
      onChangeLevel(){
        if(this.ruleForm.level === '0'){
          this.cascaderValue = 430000000000,
          this.getOrganizationList(this.cascaderValue)
        }
        this.cascaderValue = ''
        this.fieldValue = ''
        this.selectedLevelLength = ''
        this.organizationOptions = []
        this.fieldValue3 = ''
        // 清除市级选项子选项的缓存
        this.options.forEach(item =>{
          item.children = null
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
        saveOrganizationList(this.organization).then(res=>{
          console.log('res',res)
          if(res.data.code==200){
            this.fieldValue3 = res.data.data.oname;
            this.ruleForm.organization = res.data.data.id
          }
          
        })
        this.addOrganizationBoxShow = false
      },
      handler ({BMap, map}) {
          const that = this;
          console.log(BMap, map)
          const BMAP_STATUS_SUCCESS = 0;
          let geolocation = new BMap.Geolocation();
          this.myGeo = new BMap.Geocoder();
          geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              let pt = r.point
              that.myGeo.getLocation(pt, function (rs) {
                    that.center.address = rs.address;
                    that.center.lng = rs.point.lng;
                    that.center.lat = rs.point.lat;
                    that.zoom = 15;
              });
            } else {
              alert("获取位置失败，请重试！" + this.getStatus());
            }
          });
      },
      getLocationPoint(e) {
        // window.alert("事件类型:" + e.type);
        let point = e.point;
        this.myGeo.getLocation(point, res => {
          this.center.address = res.address;
          this.center.lng = res.point.lng;
          this.center.lat = res.point.lat;
          this.zoom = 15;
          console.log(res, 'res')
        })
      },
      lookDetail() {
        this.detailInfo = this.center;
        this.visible = true;
      },
      confirmMark() {
        this.ruleForm.longti = this.center.lng;
        this.ruleForm.lati = this.center.lat;
        this.fieldValue7 = this.center.address;
        this.visible = false;
        this.show7 = false;
      },
      infoWindowClose() {
        this.visible = false;
      },
      infoWindowOpen() {
        this.visible = true;
      },
      /* 上传照片 */
      afterRead(file){
        // console.log('file',file)
        // if (file instanceof Array) {
        //   file.map((v) => {
        //     v.status = "uploading";
        //     v.message = "上传中...";
        //     this.uploadImage(v);
        //   });
        // } else {
          
        // }
        file.status = "uploading";
        file.message = "上传中...";
        this.uploadImage(file);
      },
      uploadImage(file){
        const formData = new FormData();
        formData.append('file',file.file)
        uploadImg(formData).then((res)=>{
          if(res.data.code == 200){
            this.ruleForm.image = res.data.data.url;
            file.status = 'done';
          }else{
            file.status = 'failed';
            this.ruleForm.image = '';
          }          
        })
      },
      onOversize(file) {
        // console.log(file)
        if(file.file.size > 1024000){
          Toast('文件大小不能超过 1Mb');
        }
      },
    },
    created() {
      getAllarea(0).then(res => this.options = res.data.data.map(
        (item) => {return {text:item.adname,value:item.adcode,children:null}}
        )
      )
    },

  }

</script>

<style lang="less" scoped>
  .button{
    margin-top: 50px;
  }
  .form{
    margin: 16px;
    .addOrganizationLink{
      margin-left: 116px;
      font-size: 12px;
    }
    .addOrganizationItem{
      ::v-deep .van-field__label{
        width: 7em;
      }
    }
    .addOrganizationQueRenBox{
      .button{
        display: inline-block;
        width: 70px;
        margin-top: 40px;
      }
      .button:nth-child(1){
        margin-left: 15vw;
      }
      .button:nth-child(2){
        margin-left:15vw;
        margin-right: 5vw;
      }
    }
    .bm-view {
    width: 100%;
    height: 100%;
  }
  .eye{
    position: absolute;
    right:30px;
    top: 17px;
  }
  }
  
</style>