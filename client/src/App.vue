<template>
  <div id="app" class="container">
    <h1>English words</h1>
    <ul class="nav justify-content-end">
            <li class="nav-item">
                <router-link class="nav-link active" to="/">To add</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link active" to="/learn">To learn</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link active" to="/words">Word list</router-link>
            </li>
        </ul>
    <hr>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
