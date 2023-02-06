<template>
    <select :value="modelValue" @change="changeOption">
        <option disabled value="">Выберите из списка</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
</template>

<script>
export default {
    name: 'my-select',   
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOption(event) { // Вместо event можно что угодно написать и будет работать в данном случае, но хз можно ли так делать
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>

</style>