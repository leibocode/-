<template lang="pug">
</template>

<script>
import Loading from '../../components/loading/loading'
export default {
    created() {
        console.log('进入页面的生命周期')
        console.log(path)
        console.log(Id)
        console.log(type)
        const { path,Id,type } =this.$route.query
        this.path =path
        this.Id =Id
        this.dataType =type
    },
    mounted() {
          this.toDetail(this.path)
    },
    head(){
        return {
            title:'跳转页面'
        }  
    },
    data(){
        return {
            path:null,
            Id:0,
            dataType:''
        }
    },
    methods:{
        toDetail(path){
             this.$router.push({
                 path:path,
                 query:{
                     Id:this.Id,
                     type:this.dataType
                 }
             })
        }
    },
    components:{
        Loading
    }
}
</script>

<style scoped>
.loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%)
}
</style>



