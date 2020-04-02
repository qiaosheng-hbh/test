<template>
  <el-tree :data="allData"
           default-expand-all
          :render-content="renderContent"
           :expand-on-click-node="false"
           >
  </el-tree>
</template>

<script>
  import _ from 'lodash';
  import axios from 'axios'
    export default {
        name: "Mytree",
        props:{
          delete:Function,
          data:{type:Array,default:()=>[]},
          fileDrop:Array,
          diectoryDrop:Array,
        },

      data(){
          return {
            allData:[],
            currentId:'',
            currentContent:''
          }
      },
      watch:{
          data(){
           this.getTree();
        }
      },
      methods:{
        handleRemove(data){
          this.$confirm(`此操作将永久删除该文件[${data.ename}],  是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delete?this.delete(data.id).then(()=>{
                this.remove(data.id);
              }):this.remove(data.id);
            // this.$message({
            //   type: 'success',
            //   message: '删除成功!'
            // });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        remove(id){
          let list = _.cloneDeep(this.data);
          list =list.filter(l=>l.id !=id)
          this.$emit('update:data',list);
          axios.get('/delete?id='+id)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

        },
        handleRname(data){
          this.currentContent = data.ename;
          this.currentId = data.id;
        },
        handleCommand(data,value){
          if(value=='rn'){
            this.handleRname(data);
          }else if(value=='rm'){
            this.handleRemove(data)
          }else if(value=='add'){
            this.addData(data);
        }
          console.log(value)
        },
        addData(data){
          let id = data.id+100;
          let ename ='';
          const newChild = { id: id++, ename: 'testtest', children: [] ,parent_id:data.id};
          if (!data.children) {
            this.$set(data, 'children', []);
          }

          data.children.push(newChild);
          var params = new URLSearchParams();
          params.append('ename', 'hello 你好');
          params.append('parentId', data.id);
          params.append('id',id);
          params.append('job',"高管")
          axios.post('/save',params)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
       },
        ok(data){
          let list = _.cloneDeep(this.data);
         let item =list.find(l=>l.id ==data.id);
          item.ename= this.currentContent;
          this.currentId='';
          this.$emit('update:data',list);
          this.$message({
            type: 'success',
            message: '修改成功!'
          });

        },
        canncel(){
          this.currentId='';
      },
        handleInput(v){
        this.currentContent=v;
      },
          renderContent(h, { node, data, store }) {
            let list = this.isParent(data)?this.diectoryDrop:this.fileDrop;
            return (<div style={{while:'100%'}}>
              {
                this.isParent(data)?
                  node.expanded?
              <i class="el-icon-folder-opened"></i>:
              <i class="el-icon-folder"></i>:
              <i class="el-icon-tickets"></i>
              }
            { data.id==this.currentId?<el-input style={{while:'50%'}} value={this.currentContent} on-input={this.handleInput}></el-input>:data.ename}
              { data.id!=this.currentId?<el-dropdown placement="bottom-start" trigger="click" on-command={this.handleCommand.bind(this,data)}>
                <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                {list.map(item=>(

                    <el-dropdown-item command={item.text}>{item.value}</el-dropdown-item>
              ))}
              </el-dropdown-menu>
              </el-dropdown>:<span>
                <button type="text" on-click={this.ok.bind(this,data)}>确认</button>
                <button type="text" on-click={this.canncel}>取消</button>
              </span>}

              </div>);
        },
          isParent(data){
            return data.type ==='parent';
          },
          getTree(){
            let allData= _.cloneDeep(this.data);
            let tree = allData.reduce((memo,current)=>{
              //current.label = current.ename;
              memo[current["id"]] = current;
              return memo;
            },{});
            let result =  allData.reduce((arr,current)=>{
              let pid = current.parent_id;
              let parent = tree[pid]
              if(parent){
                parent.children?parent.children.push(current): parent.children=[current];
                parent.children!=null?parent.type='parent':null;
              }else if(pid==0) {
                current.type='parent';
                arr.push(current);
              }

              return arr;
            },[]);

            this.allData=result;
          }
      },
      mounted() {
        this.getTree();
      }
    }
</script>

<style lang="scss" scoped>
  .el-tree el-tree-node__content{
   width: 50%;
    height: 32px;
 }
  .el-dropdown{
    float:right;
  }
  .el-tree el-input{
    width: 50%;
  }
</style>
