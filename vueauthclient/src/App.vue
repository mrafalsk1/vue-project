<template>
  <div id="app">
    <router-view/>
    <div id="snackbar" class="snackbar">alo</div>
  </div>
</template>

<script>


import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import router from "./router";
import axios from "axios";
import storage from "./services/storage"
import http from "./services/http"
export default {
  name: 'App'
}
</script>

<style>
#app {
    font-family: "Lucida Console", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
body {
  background-image: url("http://127.0.0.1:8887/login.png");
  background-repeat: no-repeat, repeat;
  
}
#snackbar {
  visibility: hidden;
  /* Hidden by default. Visible on click */
  min-width: 250px;
  /* Set a default minimum width */
  margin-left: -110px;
  /* Divide value of min-width by 2 */
  background-color: #0069d9;
  /* Black background color */
  color: white;
  /* White text color */
  text-align: center;
  /* Centered text */
  border-radius: 2px;
  /* Rounded borders */
  padding: 16px;
  /* Padding */
  position: fixed;
  /* Sit on top of the screen */
  z-index: 1;
  /* Add a z-index if needed */
  left: 49%;
  /* Center the snackbar */
  bottom: 30px;
  /* 30px from the bottom */
  
}
.text {
  font-size: 48px;
  margin-right: 60%;
  float: left;
  padding-left: 10px;
  border-bottom: 1px solid black;
  width: 100%;
  text-align: initial
}
.logout {
  margin-top: 225%;
}
/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible;
  /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
