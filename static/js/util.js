const manba = require('manba')
export function ListUtil(list,newList){
    list.forEach((item)=>{
        item.ProjectName = item.ProjectName.substr(0, 10) + '...'
        item.ApplyDate = manba(item.ApplyDate).format("l")
        newList.push(item)
    })
}