<!-- 网关管理员组件 -->
<template>
  <div>
    <!-- 锁添加密钥部分 -->
    <div class="addDevice">
      <img src="../../assets/qietu/添加设备.png" class="DeviceIcon">
      <div class="DeviceFont">添加设备</div>
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
    height: toRem(450);
    background: #29b6f6;
  }
  .DeviceIcon,.DeviceFont {
    position: absolute;
    left:50%;
  }
  .DeviceIcon {
    top:toRem(87);
    margin-left: toRem(-100);
    width: toRem(200);
    height: toRem(200);
  }
  .DeviceFont {
    bottom:toRem(72);
    margin-left: toRem(-120);
    text-align: center;
    width: toRem(240);
    height: toRem(46);
    color:#FFFFFF;
  @include font-dpr(16px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>








