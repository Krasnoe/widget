// import { defineCustomElement } from 'vue';
import { defineCustomElement } from './defineCustomElement';
import WeatherWidget from './WeatherWidget.ce.vue';
import 'document-register-element/build/document-register-element';
import store from './store'


// const element = defineCustomElement(WeatherWidget);
// customElements.define('weather-widget', element);
customElements.define(
  'weather-widget',
  defineCustomElement(WeatherWidget, {
    plugins: [store],
  })
)
