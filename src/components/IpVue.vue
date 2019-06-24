<template>
  <div class="ip-class">
<!--    <input ref="ip1" v-model="value1" v-on:keyup.delete="handleDelete(1)"></input>-->
<!--    <div></div>-->
<!--    <input ref="ip2" v-model="value2" v-on:keyup.delete="handleDelete(2)"></input>-->
<!--    <div></div>-->
<!--    <input ref="ip3" v-model="value3" v-on:keyup.delete="handleDelete(3)"></input>-->
<!--    <div></div>-->
<!--    <input ref="ip4" v-model="value4" v-on:keyup.delete="handleDelete(4)"></input>-->
    {{allIp}}
  </div>
</template>

<script>
  export default {
    props: ['allip'],
    props: ['allip'],
    name: "IpVue",
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
