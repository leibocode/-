import api from '../api'


//获取所有的人员,批量添加到企业微信的通讯录中
const transliteration =require('transliteration')

export const getAllUsers =async()=>{
     let page =1
     const base =`http://localhost:2437/`
     //const url = `http://jgjzkj.rjtms.com/api/sys/user/Get?UserName=&UserCode=&OrgName=&UserType=&DepartmentTitle=&page=${page}&rows=20`
     const url =`${base}api/sys/user/Get?UserName=&UserCode=&OrgName=&UserType=&DepartmentTitle=&page=${page}&rows=70`
    
     const username =`super`
     let map =[]
     let dep =[]
     let form =[]
     const data =await api.project.GetAllStaff(url,username,form)
     console.log(`共拿到${data.rows.length}条数据`)
     if(data.rows.length>0){
        data.rows.forEach((item,index) => {
            //transliteration.slugify(item.UserName)
            map.push({

            })
         });
     }else {
         console.log('已经抓取全部数据')
     }
     console.log('清洗之后数据')
     console.log(map.length)
     
}

export const createDep = async() =>{
    let page =1
    const username =`super`
    let form =[]
    const base =`http://localhost:2437/`
    //const url = `http://jgjzkj.rjtms.com/api/sys/user/Get?UserName=&UserCode=&OrgName=&UserType=&DepartmentTitle=&page=${page}&rows=20`
    const url =`${base}api/sys/user/Get?UserName=&UserCode=&OrgName=&UserType=&DepartmentTitle=&page=${page}&rows=70`
    let dep =[]


    console.log('开始抓取数据')

    const data =await api.project.GetAllStaff(url,username,form)
    if(data.rows.length>0){
        data.rows.forEach((item,index)=>{
            if(item.OrgName==='上海建顾减震科技有限公司'){
                //console.log('不用管')
            }else {
                dep.forEach((item,index)=>{
                    if(item.name===item.OrgName){
                    }else {
                        dep.push({
                            "name":item.OrgName,
                            "parentid":1
                        })
                    }
               })
            }
        })
      //  page++
    }else {
        console.log('已经抓取全部数据')
    }
    console.log(dep)
    return dep
}


export const  clearDepData =async (depName,depMap) =>{
    depMap.forEach((item,index)=>{
        if(item.name===depName){
            return true
        }else {
            return false
        }
   })
}
