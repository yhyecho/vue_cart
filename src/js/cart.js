// new Vue({}) 可以直接new
var vm = new Vue({
  el: "#app",
  data: {
    title: "Hello, Vue"
  },
  mounted: function () { // Vue 1.0 -> 2.0 ready -> mounted
      this.cartView();
  },
  filters: { // 局部过滤器

  },
  methods: {
    add: function () {

    },
    cartView: function () {
      this.title = "cartView"
    }
  }
});

// Vue.filter(); // 全局过滤器

