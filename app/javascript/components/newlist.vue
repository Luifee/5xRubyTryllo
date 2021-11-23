<template>
  <div class="container">
    <button v-if="!creatingList" class="new_button" @click="newList"><i class="fas fa-plus"></i>新增列表</button>
    <input v-if="creatingList" type="text" class="list_name" placeholder="列表標題">
    <button v-if="creatingList" class="button create_button" @click="createList">送出</button>
    <button v-if="creatingList" class="button cancel_button" @click="creatingList = false">取消</button>
  </div>
</template>

<script>
export default {
  name: 'Newlist',
  data: function() {
    return {
      creatingList: false
    }
  },
  methods: {
    newList(event) {
      event.preventDefault();
      this.creatingList = true;
    },

    createList(event) {
      event.preventDefault();
      this.creatingList = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.new_button {
  @apply font-bold w-full text-left;

  &:focus {
    @apply outline-none;
  }
}

.list_name {
  @apply rounded w-full px-3 py-2 my-3;

  &:focus {
    @apply outline-none;
  }
}

.button {
  @apply px-3 py-1 rounded font-bold text-sm;
}

.create_button {
  @apply bg-gray-400;
}

.cancel_button {
  @apply bg-white;
}

.container {
  @apply bg-gray-300 px-3 py-2 m-2 w-64 h-full rounded flex-none;
}
</style>
