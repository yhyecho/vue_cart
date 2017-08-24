new Vue({
  el: '.container',
  data: {
    addressList: [],
    limitNum: 3,
    curIndex: 0,
    shippingMethod: 1
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getAddressList();
    });
  },
  computed: {
    // 分页
    filterAddress: function () {
      return this.addressList.slice(0, this.limitNum);
    }
  },
  methods: {
    // 获取地址列表
    getAddressList: function () {
      var _this = this;
      this.$http.get("data/address.json")
        .then(function (res) {
          var result = res.data;
          if (result.status == "0") {
            _this.addressList = res.result;
          }
        })
    },
    // 加载更多地址
    loadMore: function () {
      this.limitNum = this.addressList.length;
    },
    // 设置默认地址
    setDefault: function (addressId) {
      this.addressList.forEach(function(item, index) {
        if (item.addressId == addressId) {
          item.isDefault = true;
        } else {
          item.isDefault = false;
        }
      });
    }
  }
})