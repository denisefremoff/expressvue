<template>
  <nav>
    <router-link to="/">Добавить клиента</router-link>
    <router-link to="/listclients">Клиенты</router-link>
  </nav>
  <router-view></router-view>
</template>

<style>
nav {
  padding: 1em;
}

nav a {
  margin: 0 1em;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
