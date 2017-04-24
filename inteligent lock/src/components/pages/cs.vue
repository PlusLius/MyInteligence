<!-- <template>
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
  <!-- </div>
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
</style> --> -->


<template>
  <div>
 <!--    <group>
      <x-switch :title="'Basic Usage'" v-model="show1"></x-switch>
      <x-switch :title="'Show cancel menu'" v-model="show2"></x-switch>
      <x-switch :title="'menu as tips'" v-model="show3"></x-switch>
      <x-switch :title="'Array menu'" v-model="show5"></x-switch>
    </group>
 -->
    <group>
      <x-switch :title="'Basic Usage'" v-model="show4"></x-switch>
    </group>

   <!--  <actionsheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel></actionsheet>

    <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click"></actionsheet>

    <actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>

    <actionsheet v-model="show3" :menus="menus3" @on-click-menu="click" @on-click-menu-delete="onDelete" show-cancel></actionsheet>

    <actionsheet v-model="show5" :menus="menus5" show-cancel @on-click-menu="click"></actionsheet>
 -->
    <toast v-model="showSuccess">{{'Deleted~'}}</toast>
  </div>
</template>



<script>
import { Actionsheet, Group, XSwitch, Toast } from 'vux'

export default {
  components: {
    Actionsheet,
    Group,
    XSwitch,
    Toast
  },
  data () {
    return {
      show1: false,
      menus1: {
        menu1: 'Share to friends',
        menu2: 'Share to timeline'
      },
      show2: false,
      menus2: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      show3: false,
      show4: false,
      show5: false,
      menus5: [{
        label: 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',
        type: 'info'
      }, {
        label: 'Primary',
        type: 'primary',
        value: 'primary'
      }, {
        label: 'Warn',
        type: 'warn'
      }, {
        label: 'Disabled',
        type: 'disabled'
      }, {
        label: 'Default'
      }],
      showSuccess: false,
      menus3: {
        'title.noop': 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',
        delete: '<span style="color:red">Delete</span>'
      }
    }
  },
  methods: {
    click (key) {
      console.log(key)
    },
    onDelete () {
      this.showSuccess = true
    }
  }
}
</script>

<style>
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
</style>