<template>
    <!--!!! При введение из другого компонента modelValue здесь тоже будет записыватья с помощью update:modelValue. :value может использоваться для передачи пропа др. компоненту 'но тут я хз для чего он, т.к. и без него работает все' --><input :value="modelValue" @input="updateInput" class="input" type="text"> <!--Вместо :value="modelValue" пишем :value="value"-->
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number] // И тут уже вместо modelValue пишем value
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value) // И тут вместо 'update:modelValue' пишем 'update:value'
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>