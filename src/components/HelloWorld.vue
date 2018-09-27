<template>
  <div class="body">
    <button
      type="button"
      class="btn"
      @click="showModal"
    >
      Open Chart
    </button>
    <modal
      v-if="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>
import modal from './Modal.vue'

export default {
  name: 'HelloWorld',
  components: {
    modal
  },
  data () {
    return {
      isModalVisible: false
    }
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  font-size: 16px;
  padding: 10px 15px;
  color: white;
  background: #4AAE9B;
  border: 0;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}
.btn:hover {
  background: #6ec6b6;
}
</style>
