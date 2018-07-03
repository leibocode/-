<template>
    <mt-popup v-model="visible" position="bottom" style="height: 30%;width:100%;">
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
  export default {
    name : 'address-picker',
    components : components,
    data () {
      return {
        slots : [
          {
            flex: 1,
            values: info,
            className: 'province',
            textAlign: 'center',
            defaultIndex:0
          },
          {
            flex: 1,
            values: info[0].city,
            className: 'city',
            textAlign: 'center',
            defaultIndex:0
          },
          {
            flex: 1,
            values: info[0].city[0].district,
            className: 'area',
            textAlign: 'center',
             defaultIndex:0
          },
        ],
        selectedAddress : {},
        visible: false,
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
    methods : {
      onValuesChange (picker, values) {
        // 防止没有省份时报错
                
      },
      confirm () {
        this.visible = false;
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
      visible (val) {
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