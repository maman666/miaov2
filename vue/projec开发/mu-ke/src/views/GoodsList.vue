<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a
            href="javascript:void(0)"
            class="price"
            v-bind:class="{'sort-up':sortFlag}"
            @click="sortGoods()"
          >
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a
            href="javascript:void(0)"
            class="filterby stopPop"
            @click.stop="showFilterPop"
          >Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a
                  href="javascript:void(0)"
                  @click="setPriceFilter('all')"
                  v-bind:class="{'cur':priceChecked=='all'}"
                >All</a>
              </dd>
              <dd v-for="(item,index) in priceFilter">
                <a
                  href="javascript:void(0)"
                  @click="setPriceFilter(index)"
                  v-bind:class="{'cur':priceChecked==index}"
                >{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'/static/'+item.productImage" alt>
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice | currency('$')}}</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                        @click="addCart(item.productId)"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 滚动加载分页 -->
            <div
              class="view-more-normal"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="busy"
              infinite-scroll-distance="20"
            >
              <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 封装模态框  自定义属性 自定义事件（事件v-on:close被触发 执行closeModal方法（回调函数））-->
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">请先登录,否则无法加入到购物车中!</p>
      <!-- 这样div插入到模态框 slot="btnGroup" 位置 -->
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <!-- 模态框加登陆成功后入购物车操作 -->
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";
import NavBread from "./../components/NavBread";
import Modal from "./../components/Modal";
import axios from "axios";
export default {
  data() {
    return {
      goodsList: [],
      sortFlag: true, //默认为升序 1 -1为降序
      page: 1, //当前页面
      pageSize: 8, // 长度
      busy: true, //滚动加载 禁用状态
      loading: false, //loading默认不显示
      mdShow: false,
      mdShowCart: false,
      priceFilter: [
        //价格区间
        {
          startPrice: "0.00",
          endPrice: "100.00"
        },
        {
          startPrice: "100.00",
          endPrice: "500.00"
        },
        {
          startPrice: "500.00",
          endPrice: "1000.00"
        },
        {
          startPrice: "1000.00",
          endPrice: "5000.00"
        }
      ],
      priceChecked: "all", //默认高亮all
      filterBy: false, //拉小 响应式 价格显示
      overLayFlag: false //价格遮罩层
    };
  },
  mounted() {
    this.getGoodsList();
    // console.log(this.goodsList);
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  methods: {
    //获取商品列表
    getGoodsList(flag) {
      //flag参数判断分页功能的累加情况
      this.loading = true; //接口请求前loading打开
      axios
        .get("/goods/list", {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            sort: this.sortFlag ? 1 : -1,
            priceLevel: this.priceChecked //价格索引传过去
          }
        })
        .then(response => {
          // console.log(result)
          let res = response.data;
          this.loading = false; //接口请求后loading关闭
          if (res.status == 0) {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list);
              if (res.result.count == 0) {
                this.busy = true;//关闭触底加载分页
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = res.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
        });
    },
    //价格升降序
    sortGoods() {
      this.sortFlag = !this.sortFlag; //点击排序取反 为降序
      this.page = 1; //从第一页开始算
      this.getGoodsList();
    },
    //价格区间取值
    setPriceFilter(index) {
      this.priceChecked = index; //加class样式用索引
      // console.log('all:',this.priceChecked)
      this.page = 1;
      this.getGoodsList();
    },
    // 分页触底 加载更多
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    },
    // 加入购物车
    addCart(productId) {
      axios
        .post("/goods/addCart", {
          productId: productId
        })
        .then(res => {
          var res = res.data;
          if (res.status == 0) {
            // alert('加入成功')
            this.mdShowCart = true;
            this.$store.commit("updateCartCount", 1);
          } else {
            this.mdShow = true;
          }
        });
    },
    closeModal() {
      this.mdShow = false;
      this.mdShowCart = false;
    },
    showFilterPop() {
      //展示价格区间
      this.filterBy = true; //价格显示
      this.overLayFlag = true; //遮罩显示
    },
    closePop() {
      //关闭遮罩
      this.filterBy = false;
      this.overLayFlag = false;
      this.mdShowCart = false;
    }
  }
};
</script>
