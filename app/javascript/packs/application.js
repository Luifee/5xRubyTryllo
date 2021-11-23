import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "stylesheets"

// vue.js
import Vue from 'vue/dist/vue.esm';
import List from 'components/list';
import draggable from 'vuedraggable';
import store from 'vuex/list';
import { mapGetters, mapActions } from 'vuex';
import Newlist from 'components/newlist';

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector('#board');

  if (el) {
    new Vue({
      el,
      store,
      computed: {
        lists: {
	  get() {
	    return this.$store.state.lists;
	  },
	  set(value) {
	    this.$store.commit("UPDATE_LISTS", value);
	  }
	}
      },
      components: {
	List, 
	draggable,
        Newlist
      },
      methods: {
        ...mapActions(["loadList", "moveList"])
      },
      beforeMount() {
        this.loadList();
      }
    });
  }
});
