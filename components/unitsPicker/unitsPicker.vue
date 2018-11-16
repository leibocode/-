<template>
    <mt-popup v-model="visible" position="bottom" style="width:100.5%;height:100%">
        <form action="" target="frameFile" >
            <div class="outMost">
                <div class="search">
                    <!-- <mt-search 
                        autofocus 
                        v-model="value" 
                        :result="filterResult" @keyup.enter.native="search(value)">
                    </mt-search> -->
                    <!-- <img src="../../static/images/layers/cancel.png" alt=""> -->

                    <!-- 返回 -->
                    <div class="icon-ret" @click="returns"></div>
                    <!-- 搜索 -->
                    <div v-show="searchSH" class="search-font" @click="searchClick">搜索</div>
                    <div class="search-input-div" :style="{width:(searchSH==true?'65%':'74%'),marginLeft:(searchSH==true?'11%':'11%')}">
                        <span v-show="searchSH"  :style="{margin:(searchSH==true?'9px 0px 0px 64%':'9px 0px 0px 72.6%')}" @click="closes" class="search-close-span">
                            <img src="../../static/images/layers/close.png" style="zoom:0.6"></span>
                        <input  @focus="focus($event)" v-model="value" @blur = "done()" class="icon-user"  type="text" placeholder="请输入关键字" :result="filterResult" @keyup.enter.native="search(value)">
                    </div>
                </div>
                <div v-show="inlists" class="inlist">
                    <mt-index-list class="inlist">
                        <mt-index-section class="inlistLast"  v-for="(group,index) in addressList" :key="index" :index="group.title">
                            <div style="border:none" v-for="(item,index) in group.item" :key="index" @click="selectCell(item.title)">
                                <mt-cell  :title="item.title" ></mt-cell>
                            </div>
                            
                        </mt-index-section>
                    </mt-index-list>
                </div>
            </div>
        </form>
    </mt-popup>
</template>

<script>
  import {Picker,Popup,Search,IndexList, IndexSection,Cell} from 'mint-ui';
  let components = {};
  components[Picker.name] = Picker;
  components[Popup.name] = Popup;
  components[Search.name]=Search;
  components[IndexList.name] = IndexList;
  components[IndexSection.name] = IndexSection;
  components[Cell.name] = Cell;
  export default {
    name : 'units-picker',
    components : components,
    props:{
         showAddressPicker:Boolean
    },
      data(){
         return{
             searchSH:false,
             searchWith:'70%',
             inlists:true,
             value:'',
             visible:false,
             defaultResult:[
                'Aaron',
                'Alden',
                'Austin',
                'Baldwin',
                'Braden',
                'Zack',
                'Zane',
             ],
             addressList:[{
                    title:'A',
                    item:[
                        {title:'Aaron',key:'11'},
                        {title:'Alden',key:'12'},
                        {title:'Austin',key:'13'}
                    ]
                 },{
                    title:'B',
                    item:[
                        {title:'Baldwin',key:'21'},
                        {title:'Braden',key:'22'},
                    ]
                 },{
                    title:'C',
                    item:[
                        {title:'Caron',key:'31'},
                        {title:'Clden',key:'32'},
                        {title:'Custin',key:'33'}
                    ]
                 },{
                    title:'Z',
                    item:[
                        {title:'Zack',key:'41'},
                        {title:'Zane',key:'42'},
                    ]
                 },
                 {
                    title:'D',
                    item:[
                        {title:'Aaron',key:'11'},
                        {title:'Alden',key:'12'},
                        {title:'Austin',key:'13'}
                    ]
                 },{
                    title:'E',
                    item:[
                        {title:'Baldwin',key:'21'},
                        {title:'Braden',key:'22'},
                    ]
                 },{
                    title:'F',
                    item:[
                        {title:'Caron',key:'31'},
                        {title:'Clden',key:'32'},
                        {title:'Custin',key:'33'}
                    ]
                 },{
                    title:'H',
                    item:[
                        {title:'Zack',key:'41'},
                        {title:'Zane',key:'42'},
                    ]
                 }
             ]
         } 
      },
      methods:{
        returns(){
            this.$emit('confirm',this.value);
            this.visible=false;
          },
        selectCell(data){
            this.value=data;
            this.$emit('confirm', this.value);
            this.visible=false;
        },
        //聚焦
        focus($event){
            console.log('focus'+this.value);
            this.inlists=false;
            this.searchSH=true;
        },
        //取消焦点
        done(){
             console.log('done'+this.value);
             this.inlists=true;
             this.searchSH=false;
        },
        searchClick(){
            console.log('搜索'+this.value);
        },
        closes(){
            this.value=''
            console.log('closes'+this.value);
        },
        search(data){
            this.value=data;
            document.activeElement.blur();
            this.$emit('confirm', this.value);
            this.visible=false;
   
           

        },
        open () {
            this.visible = true;
        }
      },
      computed: {
        filterResult() {
            return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
        }
      },
      watch:{
          visible(val){
              console.log(val)
              this.visible =val
          },
          showAddressPicker(val){
              console.log(val)
              console.log('改变')
              this.visible = val
          }
      } 
  }
</script>
<style>

.outMost{
    height:100%;
    display:flex;
    justify-content:space-between;
    flex-direction:column;
}
.search{
    height:40px;
    width:100%;
    flex-direction:column;
    text-align:center
}
.icon-ret{
    background:url(../../static/images/layers/return.png) no-repeat ;
    float:left;
    margin:13px 0px 0px 12px;
    width: 30px; /*设置图片显示的宽*/
    height: 30px; /*图片显示的高*/
    zoom: 0.8;


}
.search-font{
    float:right;
    font-size:0.85rem;
    margin:12px 6% 0px 0px;
     font-family: 'Source Sans Pro', Arial, sans-serif;color:#26a2ff;
}
.search-input-div{
    margin:0 auto; 
    width:74%;
    height:40px;
}
.search-close-span{
    width:20px;
    height:30px;
    position:absolute;
     z-index:3
}

input{outline:none}
.icon-user{
    background:url(../../static/images/layers/search.png) no-repeat bottom left ;
    background-color: rgba(238, 238, 238, 0.925);
    background-position: 18px 10px; /*图片显示的位置*/
    width: 40px; /*设置图片显示的宽*/
    height: 40px; /*图片显示的高*/
    zoom: 0.64;
    padding-left:54px;
    display:inline;
    /* margin-left:-2.8% ; */
    margin-top:11px ;
    width:95%;
    height:45px;
    border-radius:40px;
    border:1px solid #fff;
}

.inlist-div{
    height:93%;
    flex-direction:column;
}
.inlist{
    height:95%;
    padding-bottom:100px
}
.inlistLast:last-child{
   padding-bottom: 17%;
}
</style>

