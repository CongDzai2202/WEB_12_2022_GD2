<template>
    <div class="container">
      <TheHeaderVue></TheHeaderVue>
      <div class="content">
        <TheContentVue></TheContentVue>
      </div>
    </div>
  </template>
  
  <script>
  import TheHeaderVue from "../layout/TheHeader.vue";
  import TheContentVue from "../layout/TheContent.vue";
  export default {
    name: "MRestHome",
    components: {
      TheHeaderVue,
      TheContentVue,
    },
  };
  </script>
  
  <style>
  @import url(@/css/main.css);
  </style>
  