<template lang="pug">
#container(v-if="success",style="height:100%")
 mt-cell(title="选中人员")
  span.commit-span {{selected}} 
  mt-button.mt-button(size="small",type="primary",@click="commit") 提交 
 mt-index-list()
  mt-index-section(v-for='(item,index) in contact',:index='item.title',:key='index')
   mt-cell(v-for='(item,index) in item.items',:key="index",:title='item.text',@click="")
     label
      input(ref="checkInput",type="checkbox",@click="checkContact(item,$event)")
      i ✓
</template>

<script>
import { mapState } from "vuex";
import { IndexList, IndexSection, Button, Cell, Toast } from "mint-ui"
import Contact from "../../static/js/contact"
import axios from "axios"

export default {
 // middleware: 'wechat-auth',
  head() {
    return {
      title: "负责人指派"
    };
  },
  data() {
    return {
      contact: [],
      success: false,
      id: 0,
      content: "错误提示",
      isShow: true,
      selected: "",
      pageTitle: "",
      state: 0,
      isClick:false
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.state = this.$route.query.code;
    if(!this.id||!this.state){
        Toast({
            message: "参数缺失",
            position: "middle",
            duration: 800
        })

        this.$router.push({
           path:'/'
        })
    }
    setTimeout(() => {
      this._getContact();
    }, 20);
  },
  methods: {
    _getContact() {
      let query = {
        id: this.id,
        state: this.state
      };
      console.log(query);
      const res = this.$store.dispatch("getContact", query);
      res.then(data => {
        console.log(data);
        this.success = data.data.success;
        this.contact = this.normalizeContact(data.data.data);
      });
    },
    checkContact(item, event) {
      if (this.selected.length > 0) {
        if (!event.target.checked) {
          this.selected = "";
          console.log(this.selected);
        } else {
          let allCheckBox = this.$refs.checkInput;
          event.target.checked = false;
          Toast({
            message: "只能选择一个指派人",
            position: "middle",
            duration: 800
          });
        }
      } else {
        this.selected = item.value;
        console.log(this.selected);
      }
    },
    normalizeContact(list) {
      let map = {};
      list.forEach((item, index) => {
        console.log(this.state)
        if (item.Type === parseInt(this.state)) {
          const key = item.value;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            };
          }
          map[key].items.push(
            new Contact({
              value: item.UserCode,
              text: item.UserName
            })
          );
        }
      });
      //数组排序
      let ret = [];
      for (let key in map) {
        let val = map[key];
        console.log(val);
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
    //  console.log(ret);
      return ret;
    },
    commit() {
      if(this.isClick){
         Toast({
            message: "不要重复提交",
            position: "middle",
            duration: 600
         })
          setTimeout(()=>{
              this.$router.push({
                path:'/audit',
                query:{
                   Id:this.id
                }
            })
          },1000)
         return 
      }
      if (this.selected) {
        let data =[
          {
            Type:this.state,
            UserCode:this.selected,
            UserName:this.selected
          }
        ]
        this.isClick =true
        const res = axios.post(`/api/ProjecyUpdate/${this.id}`,data)
        res.then(data => {
          if(data.statusText==="OK"&&data.status===200){
            Toast({
              message: "指派成功",
              position: "middle",
              duration: 800
            })
            setTimeout(()=>{
              this.$router.push({
                path:'/audit',
                query:{
                   Id:this.id
                }
              })
            },800)
          }else {
            //指派失败
              // Toast({
              //   message: "指派失败",
              //   position: "middle",
              //   duration: 800
              // })
          }
        });
      } else {
        Toast({
          message: "请先选中联系人",
          position: "middle",
          duration: 800
        })
      }
    }
  },
  components: {
    "mt-index-list":IndexList,
    "mt-index-section":IndexSection,
    "mt-button": Button,
    "mt-cell":Cell

  },
  deactivated() {
    clearTimeout(this.timer);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style scoped>
.commit-span {
  padding-right: 10px;
}
 .mt-button {
   margin-right: 12px;
 }
.location {
  margin-left: 30px;
}
label {
  font-size: 12px;
  cursor: pointer;
}

label i {
  font-size: 12px;
  font-style: normal;
  display: inline-block;
  width: 12px;
  height: 12px;
  text-align: center;
  line-height: 12px;
  color: #fff;
  vertical-align: middle;
  margin: -2px 2px 1px 0px;
  border: #2489c5 1px solid;
}

input[type="checkbox"],
input[type="radio"] {
  display: none;
}

input[type="radio"] + i {
  border-radius: 7px;
}

input[type="checkbox"]:checked + i,
input[type="radio"]:checked + i {
  background: #2489c5;
}

input[type="checkbox"]:disabled + i,
input[type="radio"]:disabled + i {
  border-color: #ccc;
}

input[type="checkbox"]:checked:disabled + i,
input[type="radio"]:checked:disabled + i {
  background: #ccc;
}
</style>


