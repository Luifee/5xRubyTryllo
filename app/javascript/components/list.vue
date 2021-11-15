<template>
  <div class="list">
    <h2 class="header">{{ list.name }}<br /></h2>
    <div class="deck">
      <Card v-for="card in cards" :card="card" :key="card.id"></Card>
      <div class="input-area">
        <textarea class="content" v-model="content"></textarea>
        <button class="button" @click="createCard">新增便箋</button>
      </div>
    </div>
  </div>
</template>

<script>
import Rails from '@rails/ujs';
import Card from 'components/card';

export default {
  name: 'List',
  props: ["list"],
  components: { Card },
  data: function() {
    return {
      content: '',
      cards: this.list.cards
    }
  },
  methods: {
    createCard(evt) {
      evt.preventDefault();

      let data = new FormData();
      data.append("card[list_id]", this.list.id);
      data.append("card[name]", this.content);

      Rails.ajax({
        url: '/cards',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: resp => {
          console.log(resp);
          this.cards.push(resp);
          this.content = "";
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  @apply bg-indigo-200 m-2 w-64 px-3 py-1 rounded;

  .header {
    @apply font-bold;
  }

  .deck {
    @apply mt-2;

    .input-area {

      .content {
        @apply w-full p-2 rounded;

        &:focus {
          @apply outline-black;
        }
      }

      .button {
        @apply font-semibold text-sm my-1 rounded;
      }
    }
  }
}
</style>
