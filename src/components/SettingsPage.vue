<script setup>
import CloseIcon from '@/assets/icons/CloseIcon.vue';
import MenuIcon from '@/assets/icons/MenuIcon.vue';
import TrashIcon from '@/assets/icons/TrashIcon.vue';
import EnterIcon from '@/assets/icons/EnterIcon.vue';
import { ref } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(['onCloseSettings', 'moveCity', 'deleteCity']);

const store = useStore();
const city_name = computed(() => store.state.city_name);
const error = computed(() => store.state.error);

const city_input = ref('');
let currentElement = ref('');

const addNewCity = () => {
  store.dispatch('getCity', city_input.value.toLocaleLowerCase().trim());
  city_input.value = '';
}

const deleteCity = ((city, id) => {
  emit('deleteCity', city, id)
})

const formalFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const dragStart = (($event) => {
  $event.dataTransfer.setData('activeElId', $event.target.id);
}) 

const dragOver = (($event) => {
  if ($event.target.id) {
    currentElement.value = $event.target.id;
  }
})

const onDrop = (($event) => {
  const activeElId = $event.dataTransfer.getData('activeElId');
  if ((activeElId !== currentElement.value) && activeElId && currentElement.value) {
    emit('moveCity', activeElId, currentElement.value)
  }
})
</script>

<template>
  <div class="settings-wrapper">
    <div class="settings-top">
      <div class="settings-name">Settings</div>
      <button class="settings-button" @click="$emit('onCloseSettings')">
        <close-icon class="close-icon icon"/>
      </button>
    </div>

    <div
      class="city-list"
      @dragstart="dragStart($event)"
      @drop="onDrop($event)"
      @dragover.prevent="dragOver($event)"
    >
      <div 
        class="city-inner" 
        v-for="city, id in city_name" 
        :key="id"
        :id="id"
        draggable="true"
      >
        <div class="city-inner-left">
          <menu-icon class="menu-icon icon"/>
          <div class="city-name">{{ formalFirstLetter(city) }}</div>
        </div>
        <trash-icon 
          class="trash-icon icon"
          @click="deleteCity(city, id)" 
        />
      </div>
    </div>

    <div class="add-new-city">
      <p class="add-new-city__text">Add Location:</p>
      <div class="add-new-city-inner">
        <input 
          type="text" 
          class="input" 
          v-model="city_input"
          @keyup.enter="addNewCity"
        >
        <p v-if="error" class="error">enter the correct city</p>
        <button class="input-button" @click="addNewCity">
          <enter-icon class="input-button-icon icon"/>
        </button>
      </div>
    </div>
  </div>
</template>