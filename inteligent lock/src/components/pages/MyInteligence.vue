<template>


    <!-- 侧滑 -->
    <div class="vux-1px-t">
      <swipeout>
         <swipeout-item
         @on-close="handleEvents('on-close')"
         @on-open="handleEvents('on-open')"
         transition-mode="follow"
         >
                     <!-- 侧滑菜单 -->
                    <div slot="right-menu">
                      <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{'Yes'}}</swipeout-button>
                      <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{'Right'}}</swipeout-button>
                    </div>

                       <!-- 侧滑内容 -->
                     <div slot="content" class="demo-content vux-1px-t">
                          <group>
                              <cell
                              :title="'乾元物联'"
                              is-link
                              :border-intent="false"
                              :arrow-direction="showContent001 ? 'up' : 'down'"
                              @click.native="showContent001 = !showContent001">




                              </cell>


                              <div class="slide" :class="showContent001?'animate':''">
                                    <!-- 下拉内容 -->
                                  <div class="vux-1px-t">
                                     <swipeout>

                                        <swipeout-item @on-close="handleEvents('on-close')"
                                        @on-open="handleEvents('on-open')"
                                        transition-mode="follow"
                                        >
                                          <div slot="right-menu">
                                            <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{'Yes'}}</swipeout-button>
                                            <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{'Right'}}</swipeout-button>
                                          </div>
                                          <div slot="content" class="demo-content vux-1px-t">
                                              {{"Lorem"}}
                                          </div>
                                        </swipeout-item>

                                       </swipeout>
                                  </div>
                              </div>

                          </group>

                    </div>

        </swipeout-item>
      </swipeout>
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
    onButtonClick (type) {
      alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
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
      showContent002: false,
      showContent003: false,
      showContent004: false
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

.up {

}
/* .demo-content {
  padding: 10px 10px;
} */
</style>

