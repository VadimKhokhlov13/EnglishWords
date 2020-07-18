<template>
    <div>
        <table class="table table-responsive-sm">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Word</th>
                <th scope="col">Translation</th>
                <th scope="col">Points</th>
                <th scope="col">Next meeting</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <WordItem
                    v-for="(word, index) of words" :key="index"
                    :word="word"
                    @remove-word="removeWord"
                />
            </tbody>
        </table>
    </div>
</template>

<script>
import WordItem from '@/components/WordItem';

export default {
    props: ['words'],
    components: {
        WordItem
    },
    methods: {
        removeWord(id) {
            this.$emit('remove-word', id);
        }
    }
}
</script>

<style scoped>
    ul {
       list-style: none;
       margin: 0;
       padding: 0; 
    }
</style>