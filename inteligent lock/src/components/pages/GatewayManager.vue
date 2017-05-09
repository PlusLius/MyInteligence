<!-- 网关管理员组件 -->
<template>
  <div>
    <!-- 锁添加密钥部分 -->
    <div class="addDevice" >
      <div @click="ScanQRcode">
          <img src="../../assets/qietu/添加设备.png" class="DeviceIcon">
          <div class="RichScan">扫一扫添加</div>
      </div>
      <div class="DeviceFont">手动添加</div>
    </div>
    <!--网关-->
    <GetwayDrop></GetwayDrop>
    <GetwayDrop></GetwayDrop>
    </div>
</template>
<script>
  import GetwayDrop from "../public/Pub-GatewayDrop.vue"

  export default {
    components: {
      GetwayDrop
    },
    data () {
      return {
        disabled: false,
        show: false
      }
    },
    methods: {
      ScanQRcode () {
        console.log(this.$wechat.config);
      }
    }
  }


</script>
<style lang="scss" scoped>
  @function toRem ($DraftSize) {
  @return  ($DraftSize / 144 * 100) / 75 * 1rem;
  }
  @mixin font-dpr($font-size){
    font-size: $font-size;
    [data-dpr="2"] & { font-size: $font-size * 2; }
    [data-dpr="3"] & { font-size: $font-size * 3; }
  }
  div{
    margin:0;
    padding:0;
  }
  .addDevice {
    position: relative;
    width: 100%;
    height: toRem(520);
    background: #29b6f6;
  }
  .RichScan{
    position: absolute;
    height:toRem(45);
    line-height: toRem(45);
    top:toRem(302);
    width: 100%;
    text-align: center;
  @include font-dpr(16px);
    color: #FFFFFF;
  }
  .DeviceIcon,.DeviceFont {
    position: absolute;
    left:50%;
  }
  .DeviceIcon {
    margin-top:toRem(58);
    margin-left: toRem(-100);
    width: toRem(200);
    height: toRem(200);
  }
  .DeviceFont {
    bottom:toRem(53);
    margin-left: toRem(-175);
    width: toRem(350);
    height: toRem(80);
    line-height: toRem(82);
    text-align: center;
    color:#FFFFFF;
  @include font-dpr(16px);
    border-radius: toRem(40);
    border:1px solid white;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>








