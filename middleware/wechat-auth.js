export default function ({ store, route, redirect}) {
    console.log(!store.state.authUser)
  // let authUser =window.localStorage.getItem('user')
   // console.log(authUser)
    if (!store.state.authUser) {
      let { fullPath } = route
  
      fullPath = encodeURIComponent(fullPath.substr(0))
      console.log(fullPath)
  
      return redirect(`/wechat-redirect?visit=${fullPath}`)
    }else {
      console.log('session上存在user')
    }
  }