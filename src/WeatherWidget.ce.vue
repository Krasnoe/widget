<script setup>
import SingleWidget from '@/components/SingleWidget.vue';
import SettingsPage from '@/components/SettingsPage.vue';
import GearIcon from '@/assets/icons/GearIcon.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const isShow = ref(false);
let lat = ref('');
let lon = ref('');

const store = useStore();
const city_name = computed(() => store.state.city_name);
const updateTime = computed(() => store.state.updateTime);

const onOpenSettings = () => {
  isShow.value = true;
}

const onCloseSettings = () => {
  isShow.value = false;
  store.commit('loadStartCityName');
  getStartCity();
}

const getStartCity = (() => {
  if (city_name.value.length === 0) {
    navigator.geolocation.getCurrentPosition((pos) => {
      lat.value = +pos.coords.latitude.toFixed(2);
      lon.value = +pos.coords.longitude.toFixed(2);
      
      if (lat.value && lon.value) {
        store.dispatch('getStartCity', [lat.value, lon.value])
      }
    });
  } else {
    city_name.value.forEach(city => store.dispatch('getCity', city))
  }
})

const moveCity = (idA, idB) => {
  store.commit('moveCity', [idA, idB])
}

const deleteCity = (city, id) => {
  store.commit('deleteCity', [city, id])
}

const weatherInterval = () => setInterval(getStartCity, updateTime.value);

onMounted(() => {
  store.commit('loadStartCityName');
  getStartCity();
  // weatherInterval();
})

// onUnmounted(() => {
//   clearInterval(weatherInterval);
// })
</script>

<template>
  <div class="wrapper">
    <div class="main-wrapper">
      <p v-if="city_name.length === 0 && !isShow">Settings</p>
      <button class="settings-button" @click="onOpenSettings">
        <gear-icon class="settings-button-icon icon"/>
      </button>

      <div v-if="!isShow" class="widgets-wrapper">
        <single-widget 
          v-for="city, index in city_name"
          :key="city"
          :index="index"
          :city="city"
        />
      </div>
      <div v-if="isShow">
        <settings-page 
          @onCloseSettings="onCloseSettings"
          @moveCity="moveCity"
          @deleteCity="deleteCity"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: normal;
}

input, input:focus-visible {
  outline: none;
}

button {
  cursor: pointer;
  color: inherit;
  border: none;
  background-color: transparent;
}

.icon {
  width: 20px;
  height: 20px;
}

.wrapper {
  position: absolute;
  top: 10%;
  right: 0;
  width: 210px;
}

.main-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 210px;
  background-color: #fff;
  z-index: 200;
}

.widgets-wrapper {
  display: flex;
  flex-direction: column;
}

.widget {
  &-wrapper {
    width: 100%;
    height: 240px;
    min-height: 240px;
    border: none;
    
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &-inner {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: -10px 5px 5px rgb(241, 241, 241);
  }
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 5px;
}

.images-inner {
  display: flex;
  padding: 15px;
}

.settings-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: transparent;
}

.temp {
  &-inner {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 auto 5px auto;
  }
  &-icon {
    width: 100px;
    height: 100px;
  }
  &-degree {
    font-size: 35px;
    font-weight: bold;
  }
}

.feels-like {
  margin: 0 0 10px;
}

.main-info {
  &-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &-text {
    display: flex;
    align-items: center;
    width: 50%;
    margin: 0 0 10px;
  }
}

.wind {
  &-icon {
    margin-right: 3px;
  }
}

.pressure {
  &-icon {
    margin-right: 3px;
  }
}

.settings {
  &-wrapper {
    width: 100%;
    height: 100%;
  }
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
}

.city {
  &-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items:center;
  }
  &-inner {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    padding: 3px;
    background-color: rgb(218, 215, 215);

    &-left {
      display: flex;
      justify-content: start;
      align-items: center;
    }
  }
}

.menu-icon {
  margin-right: 10px;
  cursor: grab;
}

.trash-icon {
  cursor: pointer;
}

.add-new-city {
  width: 100%;

  &__text {
    margin-bottom: 5px;
  }
  &-inner {
    display: flex;
    justify-content: space-between;
    align-items:center;
  }
}

.input {
  position: relative;
  padding: 3px;
}

.error {
  position: absolute;
  bottom: 2px;
  left: 5px;
  font-size: 12px;
  color: red
}

.input-button{
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
</style>