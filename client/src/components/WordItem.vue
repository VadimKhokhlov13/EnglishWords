<template>
    <tr>
        <td>{{ word.word }}</td>
        <td>{{ word.translation }}</td>
        <td>{{ word.points }}</td>
        <td>{{ word.date | date }}</td>
        <td>
            <button class="btn btn-danger" @click="$emit('remove-word', word.id)">Delete</button>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        word: {
            type: Object,
            required: true
        }
    },
    filters: {
        date: (value) => {
            let date = new Date(value * 1000);
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            let mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            let yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;

            return dd + '.' + mm + '.' + yy;
        }
    }
}
</script>
