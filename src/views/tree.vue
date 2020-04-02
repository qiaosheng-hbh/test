
/**
* 树形和echarts的展示
*/
<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>树形侧边导航栏</h2>
        <ul v-for="menuItem in theModel">
          <myTree class="item" :model="menuItem"></myTree>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <div class="index-right-block">
      </div>
    </div>
  </div>
</template>

<script>
  import myTree from '../views/treeMenu.vue'
  var myData =[{
    'id': '1',
    'menuName': '后台管理',
    'menuCode': '10',
    'children': [
      {
        'menuName': '商品管理',
        'menuCode': '11',
      },
      {
        'menuName': '商品信息',
        'menuCode': '12',
        'children': [
          {
            'menuName': '商品参数',
            'menuCode': '121'
          },
          {
            'menuName': '商品图片',
            'menuCode': '122'
          },
          {
            'menuName': '商品串码',
            'menuCode': '124'
          }]
      },
      {
        'menuName': '物流信息',
        'menuCode': '13'
      }]
  },
    {
      'id': '2',
      'menuName': '日志信息',
      'menuCode': '21'
    },
    {
      'id': '3',
      'menuName': '系统信息',
      'menuCode': '30'
    }]

  export default {
    name: 'Tree',
    props: ['model'],
    components: {
      myTree
    },
    data () {
      return {
        theModel: myData
      }
    }
  }
</script>

<style lang="scss" scoped>
  .index-wrap {
    width: 1200px left;
    margin: 0 auto;
    overflow: hidden;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }
  .index-right {
    float: left;
    width: 900px;
  }
  .index-left-block, .index-right-block{
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }

  .index-left-block h2,.index-right-block h2 {
    background: #409EFF;
    color: #fff;
    padding: 20px 20px;
    font-size: 1.5em;
  }

  .item {
    cursor: pointer;
  }
  ul{
    line-height: 40px;
    list-style-type: dot;
  }

  li div:active,li div:hover {
    background: #9FDABE;
    color: #eee;
  }

  ul li:hover {
    background: #A6C2B0;
  }

</style>
