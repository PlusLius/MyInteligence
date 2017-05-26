<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="get" class="content">
      <h2>{{ get.title }}</h2>
      <p>{{ get.body }}</p>
    </div>
  </div>
</template>
<script>
  import API from '../../api/api.js'
  var api = new API();
  export default {
      data () {
        return {
          loading: false,
          get: null,
          error: null
        }
      },
      created () {
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.fetchData()
      },
      watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'fetchData'
      },
      methods: {
        fetchData () {
          this.error = this.post = null
          this.loading = true
          // replace getPost with your data fetching util / API wrapper
          api.get("www.baidu.com")
          .then(res => {
            console.log(res)

          })
          .catch(err => {
               this.loading = false;
            console.log(err)
          })
        }
      }
  }
</script>