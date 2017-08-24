var vm = new Vue({
  el: "#app",
  data: {
    totalMoney: 0,
    productList: [],
    checkAllFlag: false,
    delFlag: false,
    curProduct: ''
  },
  filters: {
    formatMoney: function (value) {
      return "¥ " + value.toFixed(2);
    }
  },
  mounted: function () {
    // this.$nextTick(function () { 
    //   vm.cartView(); // Vue2.0使用了mounted钩子函数，需要这样使用
    // })
    this.cartView();
  },
  methods: {
    cartView: function() {
      var _this = this;
      this.$http.get("localhost:8080/cart", {"id": 123})
        .then(function(res) {
          _this.productList = res.body.result.list;
          _this.totalMoney = res.body.result.totalMoney;
          // console.log(res);
        })
    },
    changeMoney: function (product, type) {
      if (type > 0) {
        product.productQuentity++;
      } else {
        product.productQuentity--;
        // 商品数量不能小于1
        if (product.productQuentity < 1) {
           product.productQuentity = 1;
        }
      }
      this.calcTotalPrice();
    },
    selectedProduct: function (item) {
      // 选中和取消选中
      if (typeof item.checked == 'undefined') {
        // 为model添加自定义属性
        Vue.set(item, "checked", true); // 全局注册
        // this.$set(item, "checked", true); // 局部注册
      } else {
        item.checked = !item.checked;
      }
      this.calcTotalPrice();
    },
    // 全选和单选
    checkAll: function (flag) {
      this.checkAllFlag = flag;
      var _this = this;
      this.productList.forEach(function (item, index) {
        if (typeof item.checked == 'undefined') {
          _this.$set(item, "checked", _this.checkAllFlag);
        } else {
          item.checked = _this.checkAllFlag;
        }
      })
      this.calcTotalPrice();
    },
    // 计算商品总金额
    calcTotalPrice: function () {
      var _this = this;
      this.totalMoney = 0;
      this.productList.forEach(function (item, index) {
        if (item.checked) {
          _this.totalMoney += item.productQuentity * item.productPrice; 
        }        
      })
    },
    delConfirm: function (item) {
      this.delFlag = true;
      this.curProduct = item;
    },
    // 商品删除
    delProduct: function () {
       var index = this.productList.indexOf(this.curProduct);
       this.productList.splice(index, 1);
       this.delFlag = false;
    }
  }
})

// 全局filter
// Vue.filters("money", function (value, type) {
//   return "¥ " + value.toFixed(2) + type;
// })