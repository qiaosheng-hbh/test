/**
* 树的组件，主要功能在这里实现
*
*/
<template>

  <li>
    <div @click="toggle" @dblclick="changeType">
      <!-- isFolder判断是否存在子级改变图标 -->
      <i v-if="isFolder"uk-animation-="" class="fa " :class="[open?'fa-folder-open':'fa-folder']"></i>
      　　　　　
      <i v-if="!isFolder" class="fa fa-file-image-o"></i>
      {{ model.menuName }}
      <i v-if="isFolder" class="fa " :class="[open ? 'fa-chevron-down' : 'fa-chevron-right']" style="display: inline-block;float: right;padding:13px 20px 0 0;"></i>
      　　　　　

    </div>

    <ul v-show="open" v-if="isFolder">
      <tree-menu v-for="item in model.children" :model="item"></tree-menu>
      <li class="add" @click="addChild">
        <i class="fa fa-plus-square-o" style="padding-left: 20px;">
          <i style="display: inline-block;padding-left: 20px;">add</i>
        </i>
      </li>
      <li class="Delete" @click="deletePerson(0)">
        <i class="fa fa-plus-square-o" style="padding-left: 20px;">
          <i style="display: inline-block;padding-left: 20px;">Delete</i>
        </i>
      </li>
    </ul>
  </li>
</template>

<script>
  import '../font-awesome/css/font-awesome.min.css'
  import Vue from 'vue'
  export default {
    name: 'treeMenu',
    props: ['model'],
    data() {
      return {
        open: true,
      }
    },
    computed: {
      isFolder:function() {
        return this.model.children && this.model.children.length
      }
    },
    methods: {
      toggle: function() {
        if(this.isFolder) {
          this.open = !this.open
        }
      },
      changeType: function() {
        if(!this.isFolder) {
          Vue.set(this.model,'children',[])
          this.addChild()
          this.open = true
        }
      },
      addChild: function() {
        this.model.children.push({
          name:'new stuff'
        })
      },
      deletePerson: function(index){
        // 删一个数组元素
        this.items.splice(index,1);
      }
    }
  }
</script>

<style scoped>

  ul {
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


  .fa-folder-open, .fa-folder, .fa-file-image-o {

    padding:0 20px;
  }



</style>
