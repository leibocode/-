<template> 
  <transition name="confirm-fade">
      <div class="confirm" v-show="showFlag" @click.stop>
          <div class="confrim-content">
              <p></p>
          </div>
          <div class="">
              
          </div>
          <div class=""></div>
          <div class="operator">
              <div @click="cancel" class="ope">{{cancelBtnText}}</div>
               <div @click="cancel" class="ope">{{confirmBtnText}}</div>
          </div>
      </div>
  </transition>
</template>

<script>
export default {
   props:{
       text:{
           type:String,
           default:''
       },
       confirmBtnText:{
           type:String,
           default:'确定'
       },
       cancelBtnText:{
           type:String,
           default:'取消'
       }
   },
   data(){
       return {
           showFlag:false,
           text:'',
           isAff:
       }
   },
   methods:{
       show(){
           this.showFlag =true
       },
       hide(){
           this.showFlag =false
       },
       cancel(){
           this.hide()
           this.$emit('canel')
       },
       comfirm(){
           this.hide()
           this.$emit('comfirm')
       }
   }
}
</script>

<style scoped>
.confirm {
    position:fixed;

}
</style>



