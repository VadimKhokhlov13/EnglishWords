<template>
  <div>
    <h2>Words</h2>
    <Loading v-if="loading"/>
    <WordList
      v-else-if="words.length"
      :words="words"
      @remove-word="removeWord"
    />
    <p v-else>No words!</p>
  </div>
</template>

<script>
import WordList from '@/components/WordList';
import Loading from '@/components/Loading';
import RequestService from '../RequestService';

export default {
  name: 'app',
  components: {
    WordList, Loading
  },
  data() {
      return {
          words: [],
          loading: true,
          error: ''
      }
  },
  async created() {
    try {
      this.words = await RequestService.getWords();
      this.loading = false;
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    removeWord(id) {
      this.words = this.words.filter(word => word.id != id);
      RequestService.deleteWord(id)
        .then(response => {
        })
        .catch(error => {
            console.log(error.message);
        });
    }
  }
}
</script>