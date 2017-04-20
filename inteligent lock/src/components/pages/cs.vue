<template>
  <div>
  <div class="vux-1px-t">

    <swipeout>

      <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{'Yes'}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{'Right'}}</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">

                <swipeout>

                  <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                    <div slot="right-menu">
                      <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{'Yes'}}</swipeout-button>
                      <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{'Right'}}</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                    {{'JavaScript is the best language'}}
                    </div>
                  </swipeout-item>


                </swipeout>



        </div>
      </swipeout-item>


    </swipeout>
  </div>


<!--     <div style="padding:15px;">
      <x-button @click.native="disabled = false" type="primary" :disabled="!disabled">{{ 'set Enabled' }}</x-button>
      <x-button @click.native="disabled = true" type="warn" :disabled="disabled">{{ 'set Disabled' }}</x-button>
      <x-button @click.native="$refs.swipeoutItem.open('left')" type="primary">{{ 'open left menu' }}</x-button>
      <x-button @click.native="$refs.swipeoutItem.open('right')" type="primary">{{ 'open right menu' }}</x-button>
      <x-button @click.native="$refs.swipeoutItem.close()" type="warn">{{ 'close menu' }}</x-button>
    </div> -->
  </div>
</template>



<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'

export default {
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  methods: {
    onButtonClick (type) {
      alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    }
  },
  data () {
    return {
      disabled: false
    }
  }
}
</script>

<style lang="less">
.demo-content {
  padding: 10px 10px;
}
</style>