<template>
  <div>
    <h1>Error</h1>
    <div class="data" id="error">
      <img id="pic" class="img-circle" width="100" height="100" />
      <br />
      <br />
      <p>
        <strong>Error ocurred while loading the resources</strong>
      </p>
      <br />

      <button @click="goBack()" class="btn btn-danger">Go back to the login page</button>
    </div>
  </div>
</template>
<script>
import { ACCESS_TOKEN } from "../constants/index.js";
export default {
  name: "error",
  mounted: function() {
    localStorage.removeItem(ACCESS_TOKEN);
  },
  methods: {
    goBack() {
      this.$router.push("/login");
    }
  }
};
</script>