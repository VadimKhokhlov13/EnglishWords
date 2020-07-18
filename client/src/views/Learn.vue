<template>
    <div>
        <h1>Learn</h1>
        <Loading v-if="loading"/>
        <Learning
            v-else-if="item"
            :item="item"
            @get-word="getWord"
            @set-points="setPoints"
        />
        <p v-else>No words to remember!</p>
    </div>
</template>

<script>
import RequestService from '../RequestService';
import Learning from '../components/Learning';
import Loading from '../components/Loading';

export default {
    components: {
        Learning, Loading
    },
    data() {
        return  {
            item: false,
            loading: true
        };
    },
    created() {
        this.getWord();
    },
    methods: {
        async getWord() {
            try {
                const id = (this.item != false) ? this.item.id : 0;
                this.item = await RequestService.getWord(id);
                this.loading = false;
            } catch(err) {
                this.error = err.message;
            }
        },
        setPoints(isRemembered) {
            this.loading = true;
            const id = this.item.id;
            RequestService.setPoints(id, isRemembered)
                .then(response => {
                    this.getWord();
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }
}
</script>