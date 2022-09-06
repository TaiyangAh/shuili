<template>
  <van-form class="form">
    &nbsp;<h2 style="margin-left: 30%;font-size:1.3rem">公告牌信息收集</h2>&nbsp;
    <van-field v-model="ruleForm.cardname" required :rules="[{ required: true, message: '请填写公告牌名称' }]" label="名称" placeholder="请输入公告牌名称">
    </van-field>
    <van-field v-model="ruleForm.cardsign" required label="编号" placeholder="请输入公告牌编号">
    </van-field>
    <van-field name="radio" label="公告牌类别" required>
      <template #input>
        <van-radio-group v-model="ruleForm.level" direction="horizontal">
          <van-radio name="0">省</van-radio>&nbsp;
          <van-radio name="1">市</van-radio>&nbsp;
          <van-radio name="2">县</van-radio>&nbsp;
          <van-radio name="3">乡</van-radio>&nbsp;
          <van-radio name="4">村</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="fieldValue"
      required
      is-link
      readonly
      label="行政区划"
      placeholder="请选择所在行政区划"
      @click="show1 = true"
    />
    <van-popup v-model="show1" round position="bottom">
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
      v-model="fieldValue1"
      required
      is-link
      readonly
      label="经纬度"
      placeholder="请选择所在经纬度"
      @click="show = true"
    />
    <van-popup v-model="show"
      position="bottom"
      :style="{ height: '60%' }" round>
      <!-- <van-loading v-if="loading" :style="{marginTop: '20vh'}" size="24px" vertical>定位加载中...
      </van-loading> -->
      <baidu-map
        class="bm-view" 
        :center="center" 
        :zoom="zoom" 
        @ready="handler"
        @click="getLocationPoint"
        >
        <bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" @click="lookDetail()">
          <bm-info-window :title="center.address" :position="{lng: center.lng, lat: center.lat}" :show="visible" @close="infoWindowClose()" @open="infoWindowOpen()">
            <div v-text="'经度：'+center.lng"></div>
            <div v-text="'纬度：'+center.lat"></div>
            <van-button type="mini" @click="confirmMark">确认选点</van-button>
          </bm-info-window>
        </bm-marker>
      </baidu-map>
      <!-- <van-cascader
        title="请选择所在地区"
        v-model="cascaderValue"
        :options="options"
        @change="onChangeArea"
        @close="show = false"
        @finish="onFinish"
      /> -->
    </van-popup>
    <!-- <van-field v-model="ruleForm.duties" required label="职务" placeholder="请输入职务">
    </van-field>
    <van-field v-model="ruleForm.tel" required label="电话" placeholder="请输入电话">
    </van-field>
    <van-field v-model="ruleForm.email" label="邮箱" placeholder="请输入邮箱" type="email">
    </van-field> -->
    <!-- <van-field name="radio" label="性别">
      <template #input>
        <van-radio-group v-model="ruleForm.six" direction="horizontal">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>
      </template>
    </van-field> -->
    <van-field v-model="ruleForm.longti" required disabled clearable label="经度" placeholder="请输入公告牌所在经度">
    </van-field>
    <van-field v-model="ruleForm.lati" required disabled clearable label="纬度" placeholder="请输入公告牌所在纬度">
    </van-field>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="onSubmit" class="button">提交</van-button>
    </div>
    <div id="map" class="map"></div>
  </van-form>
</template>

<script>
import {getAllarea, saveWorkCard} from "@/api/index"

export default {
    data() {
      return {
        show1:false,
        show: false,
        fieldValue: '',
        fieldValue1: '',
        cascaderValue:'',
        options:[],
        visible: false,
        myGeo: null,
        map:null,
        center: {address: '', lng: 112.94547320, lat: 28.23488940},
        detailInfo: {},
        zoom: 10,
        ruleForm: {
          cardname: '',
          cardsign:"",
          allareaid:'',
          level:"",
          longti:"",
          lati:"",
        },
      };
    },
    methods: {
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
        this.fieldValue1 = this.center.address;
        this.visible = false;
        this.show = false;
      },
      infoWindowClose() {
        this.visible = false;
      },
      infoWindowOpen() {
        this.visible = true;
      },
      onSubmit() {
        console.log("已提交")
        this.ruleForm.allareaid = this.cascaderValue
        this.ruleForm.lati = this.center.lat
        this.ruleForm.longti = this.center.lng
        saveWorkCard(this.ruleForm)
      },
       // 全部选项选择完毕后，会触发 finish 事件
      onFinish({ selectedOptions }) {
        this.show = false;
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
      },
      
    },

    created() {
      getAllarea(0).then(res => this.options = res.data.data.map(
        (item) => {return {text:item.adname,value:item.adcode,children:null}}
        )
      )
     
    },

   /*  initMap() {
        this.$nextTick(() => {
          // BMap = window.BMap;
          this.map = new BMap.Map("map");
          let point = new BMap.Point(116.404, 39.915);
          this.map.centerAndZoom(point, 12);
          this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
          this.map.addControl(new BMap.NavigationControl());
          this.fixedPos();
        });
    },
    // 点击定位-定位到当前位置
    fixedPos() {
      const _this = this;
      const geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // _this.handleMarker(_this, r.point);
          let myGeo = new BMap.Geocoder();
          myGeo.getLocation(
            new BMap.Point(r.point.lng, r.point.lat),
            function (result) {
              // _this.confirmLoading = false;
              if (result) {
                this.lati = result.point.lat;
                this.longti = result.point.lng;
              }
            }
          );
        } else {
          _this.$message.error("failed" + this.getStatus());
        }
      });
    },
 */
  }

</script>

<style lang="less" scoped>
  .button{
    margin-top: 50px;
  }
  .form{
    margin: 16px;
  }

  .bm-view {
    width: 100%;
    height: 100%;
  }
</style>