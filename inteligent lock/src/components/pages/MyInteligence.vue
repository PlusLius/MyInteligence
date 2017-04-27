<template>
  <div>

      <group>
             <cell
              is-link
              :border-intent="false"
              :arrow-direction="showContent001 ? 'up' : 'down'"
              @click.native="showContent001 = !showContent001"
              class="cls"
            >
              <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                <div>
                  {{'乾元捂脸'}}
                </div>
                <div>
                  {{'id: dsfsdf'}}
                </div>
               <div>
                  <span style="color: green">{{'Hi, I\'m Vux.'}}</span>
                </div>
          </cell>

           <template v-if="showContent001">
            <cell-box :border-intent="false" class="sub-item" is-link>content 001</cell-box>
            <cell-box class="sub-item" is-link>content 001</cell-box>
            <cell-box class="sub-item" is-link>content 001</cell-box>
          </template>
      </group>

      <div class="AllListMenu">
            <router-link to="/MyResentUse" class="MyHistoryUse icon-RecentUse">
                最近使用
            </router-link>
            <router-link to="/MyInteligence" class="MyInteligen icon-MyInteligence">
                我的智能
            </router-link>
      </div>
  </div>
</template>


<script>
import { Cell, CellBox, CellFormPreview, Group } from 'vux'
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  methods: {
    onClick () {
      console.log('on click')
    },
    onButtonClick2 (type) {
      alert('on button click ' + type)
    },
    handleEvents2 (type) {
        this.disabled = true;
    },
    handleEvents (type) {
      console.log('event: ', type)
    },
    handleEvents1 (type) {
      this.disabled = false;
    }
  },
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }],
      money: null,
      showContent001: false,
      disabled:false
    }
  }
}
</script>

<style scoped>
.sub-item {
  color: #888;
}
.slide {
  /* padding: 0 20px; */
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}

.vux-no-group-title {
  margin-top:0;
}

.Swipeout-Height {
  height:44px;
}
.weui-cell__ft:after {
      transition: transform 300ms, -webkit-transform 300ms;
}

/* .demo-content {
  padding: 10px 10px;
} */
.weui-cell_access .weui-cell__ft:after {
  border-color: red !important;
}


  .AllListMenu {
      position: fixed;
      display:flex;
      align-items: center;
      bottom:0;
      width: 100%;
      height: 50px;
      background: #F8F8F8;
      border-top: 1px solid #ccc;
  }
  .MyHistoryUse,.MyInteligen {
      flex-grow:1;
      text-align:center;
      font-size: 10px;
      color:#999;
  }
  .icon-History:before,.icon-UserList:before {
      position: relative;
      top: 1px;
      font-size: 20px;
      vertical-align: top;
  }
  .icon-RecentUse:before,.icon-MyInteligence:before {
      display:block;
      font-size:24px;
      margin-bottom: 5px;
  }
  .router-link-active {
      color: #00A6F4 !important;
  }
  .colorBlue {
      color:#00AEFF;
      box-sizing:border-box;
      border-bottom:4px solid #00AEFF;
  }
</style>

