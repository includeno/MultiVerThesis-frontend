<template>
  <div class="hello">
    <AppHeader></AppHeader>

    <h1>{{ msg }}</h1>
<!--    <ContentCollapse></ContentCollapse>-->
    <ContentCollapse></ContentCollapse>
    <SimpleDrag></SimpleDrag>

  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import ContentCollapse from "@/components/ContentCollapse4";
import SimpleDrag from "@/components/Simple";
export default {
  name: 'HelloWorld',
  components: {SimpleDrag, ContentCollapse, AppHeader},
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
