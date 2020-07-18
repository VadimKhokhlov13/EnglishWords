<template>
    <div>
        <form @submit.prevent="onSubmit">
        <div class="form-row align-items-center">
            <div class="col-auto">
                <input type="text" class="form-control mb-2" 
                id="inlineFormInput" placeholder="word" 
                v-model="word" v-bind:class="{ 'is-invalid': !isWord }">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control mb-2" 
                id="inlineFormInputGroup" placeholder="translation" 
                v-model="translation" v-bind:class="{ 'is-invalid': !isTranslation }">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-2">Add</button>
            </div>
            </div>
        </form>
        <div class="alert alert-success" role="alert" 
            v-bind:class="{ invisible: !added }">
            Word <b style="font-size: 24px">{{ addedWord }}</b> added successfully
        </div>
        <div class="alert alert-danger" role="alert" 
            v-bind:class="{ invisible: !error }">
            {{ error }}
        </div>
    </div>   
</template>

<script>
import RequestService from '../RequestService';

export default {
    data() {
        return {
            word: '',
            translation: '',
            isWord: true,
            isTranslation: true,
            added: false,
            error: false,
            addedWord: ''
        }
    },
    methods: {
        onSubmit() {
            if(!this.word || !this.translation) {
                if (!this.word) {
                    this.isWord = false;
                } else {
                    this.isWord = true;
                }
                if (!this.translation) {
                    this.isTranslation = false;
                } else {
                    this.isTranslation = true;
                }
            } else {
                RequestService.addWord({word: this.word, translation: this.translation})
                    .then(response => {
                        this.addedWord = this.word,
                        this.word = '';
                        this.translation = '';
                        this.isWord = true;
                        this.isTranslation = true;   
                        this.error = false;
                        this.added = true;          
                    })
                    .catch(error => {
                        this.added = false;
                        this.error = error.message;
                    });
                
            }
        }
    }
}
</script>

<style scoped>
    form {
        display: flex;
    }

    input {
        width: 400px;
    }
</style>