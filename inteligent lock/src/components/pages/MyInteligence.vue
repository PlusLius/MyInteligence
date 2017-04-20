<template>
  <div>

    <group>
      <cell
      :title="'showContent001'"
      is-link
      :border-intent="false"
      :arrow-direction="showContent001 ? 'up' : 'down'"
      @click.native="showContent001 = !showContent001"></cell>

      <p class="slide" :class="showContent001?'animate':''">blablabla...<br/>blablabla...<br/>blablabla...<br/>blablabla...</p>

    </group>

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
</style>

