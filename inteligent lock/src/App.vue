<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}

@font-face {
  font-family: 'icomoon';
  src:  url('assets/fonts/icomoon.eot?eo6rxs');
  src:  url('assets/fonts/icomoon.eot?eo6rxs#iefix') format('embedded-opentype'),
    url('assets/fonts/icomoon.ttf?eo6rxs') format('truetype'),
    url('assets/fonts/icomoon.woff?eo6rxs') format('woff'),
    url('assets/fonts/icomoon.svg?eo6rxs#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-Administrators:before {
  content: "\e900";
}
.icon-box:before {
  content: "\e901";
}
.icon-delete:before {
  content: "\e902";
}
.icon-down:before {
  content: "\e903";
}
.icon-edit:before {
  content: "\e904";
}
.icon-History:before {
  content: "\e905";
}
.icon-lock:before {
  content: "\e906";
}
.icon-MyInteligence:before {
  content: "\e907";
}
.icon-RecentUse:before {
  content: "\e908";
}
.icon-RemoteUpgrade:before {
  content: "\e909";
}
.icon-share:before {
  content: "\e90a";
}
.icon-top:before {
  content: "\e90b";
}
.icon-UserList:before {
  content: "\e90c";
}

</style>
