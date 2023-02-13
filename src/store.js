import { createStore } from 'vuex';
import axios from 'axios';

const api_key = '8380213aa41ebfd52b6d771fab2fadb1';

export default createStore({
  state: () => ({
    city_name: [],
    weather: [],
    error: false,
    // time of update weather, 10 min
    updateTime: 600000,
  }),
  actions: {
    getStartCity({ commit }, [lat, lon]) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(res => {
          commit('setCityName', res.data.name);
          commit('setWeather', res.data.weather[0]);
        })
        .catch(error => {
          commit('setError');
        })
    },
    getCity({ commit }, city) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
        .then(res => {
          commit('setCityName', city);
          commit('setWeather', res.data);
        })
        .catch(error => {
          commit('setError');
        })
    },
  },

  mutations: {
    loadStartCityName(state) {
      state.city_name = JSON.parse(localStorage.getItem('city_name')) || [];
    },
    setCityName(state, res) {
      if (!state.city_name.includes(res)) {
        state.city_name.push(res);
        localStorage.setItem('city_name', JSON.stringify(state.city_name));
      }
    },
    setWeather(state, res) {
      state.weather.push(res);
    },
    moveCity(state, [idA, idB]) {
      [state.city_name[idA], state.city_name[idB]] = [state.city_name[idB], state.city_name[idA]];
      [state.weather[idA], state.weather[idB]] = [state.weather[idB], state.weather[idA]];
      localStorage.setItem('city_name', JSON.stringify(state.city_name));
    },
    deleteCity(state, [city, id]) {
      state.city_name = state.city_name.filter((c, index) => c[index] !== city[id]);
      state.weather = state.weather.filter((c, index) => c[index] !== city[id]);
      localStorage.setItem('city_name', JSON.stringify(state.city_name));
    },
    setError(state) {
      state.error = true;
      setTimeout(() => {
        state.error = false;
      }, 2000)
    }
  }
})