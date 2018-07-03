<template lang="pug">
  #container.container
    .loadPage
      .title-txt
        img(src="../static/logo.png",class="logo")
        .oneTitle-txt
          p.h3 建顾基于微信的项目管理
          P.h4 移动客户端软件
        .twoTitle-txt
          p
            | 
        .threeTitle-txt
          p
            | 企业微信
</template>
<script>
function getUrlParam (param) {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  const result = window.location.search.substr(1).match(reg)
   console.log(result)
  return result ? decodeURIComponent(result[2]) : null
}

export default {
  head () {
    return {
      title: `loading`
    }
  },

  async beforeMount () {
    const url = window.location.href
    const { data } = await this.$store.dispatch('getWechatOAuth', url)
    console.log(data)

    if (data.success) {
      await this.$store.dispatch('setAuthUser', data.data)

      const paramsArr = getUrlParam('state').split('_')
      const visit = paramsArr ==null ? `/${paramsArr[0]}` : `/${paramsArr[0]}?id=${paramsArr[1]}`
      this.$router.replace(visit)
    } else {
      throw new Error('用户信息获取失败')
    }
  }
}
</script>

<style scoped>
.oneTitle-txt {
  font-size: 26px;
  color: #30649d;
}
.twoTitle-txt {
  /* position: fixed;
  top:36%;
  left :39%;
  color: #727070;
  font-size: 16px; */
}
.threeTitle-txt {
  position: fixed;
  bottom:2%;
  left :41%;
  color:#ccc;
  font-size: 14px;
}
.page {
  background:#fff;

}
.h3{
  margin-top:5%;
  margin-left:12%;
}
.h4{
  margin-left:26%;
}

.title {
  font-size:36px;
  color:#399fff;
  text-align:center;
  line-height:35%;
}
.logo{
   width:80px;
   height:80px;
   display:block;
   margin-top:33%;
   margin-left:40%;
}
</style>
