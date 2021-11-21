<template>
  <div class="list">
    <h2 class="header">{{ list.name }}<br /></h2>
    <div class="deck">
      <draggable v-model="cards" ghost-class="ghost" group="list" @change="cardMoved">
        <Card v-for="card in cards" :card="card" :key="card.id"></Card>
      </draggable>
      <div class="input-area">
        <button v-if="!editing" class="button" @click="newCard">新增便箋</button>
        <textarea v-if="editing" class="content" v-model="content"></textarea>
        <button v-if="editing" class="button" @click="createCard">送出便箋</button>
        <button v-if="editing" class="button" @click="editing = false">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import Rails from '@rails/ujs';
import Card from 'components/card';
import draggable from 'vuedraggable';

export default {
  name: 'List',
  props: ["list"],
  components: { Card, draggable },
  data: function() {
    return {
      content: '',
      cards: this.list.cards,
      editing: false
    }
  },
  methods: {
    newCard(event) {
      event.preventDefault();
      this.editing = true;
    },
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
          this.editing = false;
        },
        error: err => {
          console.log(err);
        }
      });
    },
    cardMoved(event) {
      let evt = event.added || event.moved;
      if (evt) {
        let el = evt.element;
        let card_id = el.id;

        let data = new FormData();
        data.append("card[list_id]", this.list.id);
        data.append("card[position]", evt.newIndex + 1);

        Rails.ajax({
          url: `/cards/${card_id}/move`,
          type: 'PUT',
          data,
          dataType: 'json',
          success: resp => {
            console.log(resp);
          },
          error: err => {
            console.log(err);
          }
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  @apply bg-indigo-200 m-2 w-64 px-3 py-3 rounded flex-none h-full;

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

.ghost {
  @apply border-2 border-purple-300 border-dashed bg-gray-300;
}
</style>
