<script setup>
import WindArrowIcon from '@/assets/icons/WindArrowIcon.vue';
import BarometerIcon from '@/assets/icons/BarometerIcon.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';


const props = defineProps({
  index: Number,
  city: String
})

const store = useStore();
const weather = computed(() => store.state.weather[props.index]);

const formatFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
</script>

<template>
  <section class="widget-wrapper" v-if="weather?.main.temp">
    <div class="widget-inner">
      <div class="top">
        <div class="city-name">{{ weather.name }}, {{ weather.sys.country }}</div>
      </div>

      <div class="temp-inner">
        <img 
          :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" 
          alt="weather icon" 
          class="temp-icon">
        <span class="temp-degree" >{{ Math.round(weather.main.temp) }}°С</span>
      </div>

      <p class="feels-like">Feels like {{ Math.round(weather.main.feels_like) }}°С. {{ formatFirstLetter(weather.weather[0].description) }}</p>

      <div class="main-info-inner">
        <p class="main-info-text">
          <wind-arrow-icon class="wind-icon icon"/>
          <span class="wind">{{ weather.wind.speed.toFixed(1) }}m/s</span>
        </p>
        <p class="main-info-text">
          <barometer-icon class="pressure-icon icon"/>
          <span class="pressure">{{ weather.main.pressure }}hPa</span>
        </p>
        <p class="main-info-text">Humidity: {{ weather.main.humidity }}%</p>
        <p class="main-info-text">Max temp: {{ Math.round(weather.main.temp_max) }}°C</p>
        <p class="main-info-text">Visibility: {{ Math.round(weather.visibility / 1000).toFixed(1) }}km</p>
      </div>
    </div>
  </section>
</template>
