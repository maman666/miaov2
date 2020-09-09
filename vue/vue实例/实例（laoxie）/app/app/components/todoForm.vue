<template>
  <header>
    <div class="input-group">
      <input type="text" class="form-control" v-model="keyword" ref="keyword" @keyup.13="add">
      <div class="input-group-append">
        <button class="btn btn-success" @click="add">添加+</button>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  //获取输入的信息 可以定义数据如 keyword:''，利用双向数据绑定原理 v-model="keyword"去监听用户数据的输入
  data(){
    return {
      keyword:''
    }
  },
  methods:{
    //@keyup.13是事件对象：必须传个event参数下来 因为不传默认第一个参数就是
    add(e){
      if(this.keyword.length<=0) return;
      this.$root.$emit('additem',this.keyword);

      // 清空并自动获得焦点
      this.keyword = '';
      //利用ref属性获取节点 this.$ref去触发
      this.$refs.keyword.focus();
    }
  }
};
</script>
