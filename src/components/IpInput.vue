<template>
  <div class="ip-class">
    <input ref="ip1" v-model="value1" v-on:keyup.delete="handleDelete(1)"></input>
    <div></div>
    <input ref="ip2" v-model="value2" v-on:keyup.delete="handleDelete(2)"></input>
    <div></div>
    <input ref="ip3" v-model="value3" v-on:keyup.delete="handleDelete(3)"></input>
    <div></div>
    <input ref="ip4" v-model="value4" v-on:keyup.delete="handleDelete(4)"></input>
    {{ allIp }}
  </div>
</template>
<script>
  export default {
    props: ['allip'],
    name: "IpInput",
    data() {
      return {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
      }
    },
    computed: {
      allIps() {
        return this.value1 + "." + this.value2 + "." + this.value3 + "." + this.value4;
      }
    },
    methods: {
      handleDelete(index) {
        if (index == 4) {
          if (this.value4.length == 0) {
            this.$refs.ip3.focus();
          }
        } else if (index == 3) {
          if (this.value3.length == 0) {
            this.$refs.ip2.focus();
          }
        } else if (index == 2) {
          if (this.value2.length == 0) {
            this.$refs.ip1.focus();
          }
        }
      }
    },
    watch: {
      value1: function (val) {
        if (val.length >= 3) {
          this.$refs.ip2.focus();
        }
      },
      value2: function (val) {
        if (val.length >= 3) {
          this.$refs.ip3.focus();
        }
      },
      value3: function (val) {
        if (val.length >= 3) {
          this.$refs.ip4.focus();
        }
      },
      value4: function (val) {
        if (val.length > 3) {
          this.value4 = val.substring(0, 3);
        }
      }
    }
  }
</script>
<style scoped>
  .ip-class {
    border: lightgray solid 1px;
    border-radius: 4px;
    display: flex;
    align-items: flex-end;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .ip-class input {
    border-style: none;
    text-align: center;
    width: 50px;
  }

  .ip-class input:focus {
    outline: none;
  }

  .ip-class div {
    width: 2px;
    height: 2px;
    background-color: cornflowerblue;
    margin-bottom: 3px;
  }
</style>
