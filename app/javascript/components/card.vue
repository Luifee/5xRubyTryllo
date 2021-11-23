<template>
  <div>
    <div class="card" @click="editing = true">
      {{ card.name }}
    </div>
    <div v-if="editing" class="dialog">
      <div class="inner">
        <a href="#" class="closeButton" @click="close"><i class="far fa-window-close"></i></a>
        <textarea class="content" v-model="card_name"></textarea>
        <button class="button" @click="update">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
export default {
  name: 'Card',
  data: function() {
    return {
      card_name: this.card.name,
      editing: false
    }
  },
  props: ["card"],
  methods: {
    // ...mapActions(["updateCard"]),
    close(event) {
      event.preventDefault();
      this.editing = false;
    },

    update(event) {
      event.preventDefault();
      this.$store.dispatch("updateCard", { id: this.card.id, name: this.card_name });
      this.editing = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @apply bg-green-100 mb-2 p-2 rounded cursor-pointer;
}

.dialog {
  background-color: rgba(0, 0, 0, 0.3);
  @apply fixed w-full h-full top-0 left-0 flex items-center justify-center;
  .inner {
    @apply bg-white flex flex-col p-3;
    width: 600px;
    .content {
      @apply p-3 my-2 border border-purple-700;
    }
    .closeButton {
      @apply text-gray-600 text-right;
    }
    .button {
      @apply bg-pink-100 text-sm font-bold;
    }
  }
}
</style>
