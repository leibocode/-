<template>
    <mt-popup v-model="visible" position="bottom" style="height: 36%;width:100%;">
        <input type="hidden" :value="value">
        <div class="mint-datetime">
            <mt-picker
                    :slots="slots"
                    @change="onValuesChange"
                    valueKey="name"
                    :visible-item-count="visibleItemCount"
                    class="mint-datetime-picker"
                    showToolbar>
                <span class="mint-datetime-action mint-datetime-cancel" @click="visible = false">{{ cancelText }}</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">{{ confirmText }}</span>
            </mt-picker>
        </div>
    </mt-popup>
</template>
<script>
  import {Picker} from 'mint-ui';
  import {Popup} from 'mint-ui';
  import info from './address';
  let components = {};
  components[Picker.name] = Picker;
  components[Popup.name] = Popup;
  let apid = 0
  //根据apid查找对象
  function findcity(item) {
    return item.apid == apid;
  }
  //根据aname获取名字
  function getAddressName(item) {
    return item.aname
  }
  //筛选出各省级对象
  let pObj = info.filter(findcity)
  //获取各省级对象名字
  let provinces = pObj.map(getAddressName)

  export default {
    props: {
      showAddressPicker: Boolean,
      init: String
    },
    name : 'address-picker',
    components : components,
    data () {
      return {
        slots : [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 3
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4',
            defaultIndex: 0
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center',
            defaultIndex: 0
          },
        ],
        selectedAddress : '',
        visible: false,
        initVal: '北京-北京市-东城区',
      }
    },
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
        visibleItemCount: {
            type: Number,
            default: 7
        },
      value : {
        type : Boolean,
        defualt : false
      }
    },
    created() {
      if (this.init) {
        this.initVal = this.init
      }
      this.initAddress()
      
    },
     mounted() {
      let vm = this
      vm.visible = vm.showAddressPicker
    },
    methods : {
       initAddress() { //初始化地址组件
        let vm = this
        let initAddress = vm.initVal.split("-")
        vm.slots[0].values = provinces
        vm.slots[0].values.map((val, index) => {
          if (initAddress[0] === val) {
            vm.slots[0].defaultIndex = index
          }
        })
        pObj.map((val) => {
          if (val.aname === initAddress[0]) {
            apid = val.aid
          }
        })

        vm.slots[2].values = info.filter(findcity).map(getAddressName)
        info.filter(findcity).map((val, index) => {
          if (val.aname === initAddress[1]) {
            apid = val.aid
            vm.slots[2].defaultIndex = index
          }
        })
        vm.slots[4].values = info.filter(findcity).map(getAddressName)
        vm.slots[4].values.map((val, index) => {
          if (initAddress[2] === val) {
            vm.slots[4].defaultIndex = index
          }
        })
        vm.selectedAddress = vm.slots[0].values[vm.slots[0].defaultIndex] +
          "-" + vm.slots[2].values[vm.slots[2].defaultIndex] +
          "-" + vm.slots[4].values[vm.slots[4].defaultIndex];
      },
      onValuesChange (picker, values) {
        let vm = this
        if (!values[0]) {
          // 解决第一次选择不选省份出现的bug
          values[0] = vm.slots[0].values[vm.slots[0].defaultIndex]
          values[2] = vm.slots[2].values[vm.slots[2].defaultIndex]
        }
        
        if (values[2]) { // 确保地址组件已经完成初始化
          //城市数组, 市区数组
          let citys = [],
            areas = [];
          for (let i in pObj) {
            if (pObj[i].aname === values[0]) { //根据省份名找到对应的城市数组
              apid = pObj[i].aid
              if (apid) { // 防止直辖市选择时的报错
                citys = info.filter(findcity)
                vm.slots[2].values = citys.map(getAddressName)
              }
            }
          }
          for (let j in citys) {
            if (citys[j].aname === values[1]) { //根据城市名找到对应的市区数组
              apid = citys[j].aid
              if (!apid) return false;
              areas = info.filter(findcity)
              vm.slots[4].values = areas.map(getAddressName)
            }
          }
          //以`-`连接地址: 广东-深圳-福田
        
          vm.selectedAddress = values.join("-")
         
        }
           
      },
      confirm () {
        this.visible = false;
         console.log(this.selectedAddress)
        this.$emit('confirm', this.selectedAddress);
        
      },
      open () {
        this.visible = true;
      }
    },
    watch : {
      value (val) {
        this.visible = val;
      },
      showAddressPicker(old, val) {
        this.visible = !val
      },
      visible (val) {
        this.$emit('input', val);
      },
      init(val) {
        this.initVal = val
        this.initAddress();
        this.$emit('input', val);
      }
    }
  }
</script>
<style scoped>
    .mint-datetime {
        width: 100%;
    }.mint-datetime .picker-slot-wrapper, .mint-datetime .picker-item {
         -webkit-backface-visibility: hidden;
         backface-visibility: hidden;
     }
    .mint-datetime .picker-toolbar {
        border-bottom: solid 1px #eaeaea;
    }
    .mint-datetime-action {
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #26a2ff;
    }
    .mint-datetime-cancel {
        float: left;
    }
    .mint-datetime-confirm {
        float: right;
    }
    .picker-item{
       /* font-size: .32rem;*/
    }
</style>