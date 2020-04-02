<template>

        <Mytree :data.sync="data"
        :fileDrop="fileDrop"
        :diectoryDrop="diectoryDrop"
                v-if="data.length"
                :delete="deleteFn">

        </Mytree>

</template>
<script>
  import {gerAll} from "../utils/server";
  import Mytree from "./Mytree";
  export default {
    data(){
        return {
          data:[],
          fileDrop:[
            {text:'rm',value:'删除文件'}
          ],
          diectoryDrop:[
            {text:'rn',value:'修改名称'},
            {text:'rm',value:'删除文件夹'},
            {text:'add',value:'添加'},
          ],

        }
    },
    components:{
      Mytree,
    },
   async mounted() {
     let {data} =  await  gerAll();

     this.data = data;
    },
    methods:{
      deleteFn(id){
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            resolve();
          },1000)
        });
      },
    }

  }
</script>
<style lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-header{
    background-color: #909399;
  }
  .el-aside{
    background-color: #909399;
  }
  .home-continer{
    height: 100%;
  }

</style>
