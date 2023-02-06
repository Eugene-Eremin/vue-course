<template>
    <div class="dialog" v-if="show" @click="hideDialog"> <!--v-if простой логический оператор-->
        <div @click.stop class="dialog__content"> <!--@click.stop предотвращает какому либо клику откуда либо кликнуться этому тегу-->
           <slot></slot> 
        </div>
    </div>
</template>

<script>
import toggleMixin from '@/mixsins/toggleMixin';

export default {
    name: 'my-dialog',
    mixins: [toggleMixin], // таким образом мы можем сюда добивить mixin. Это сипользуется для того, чтобы если у многих компонентов похожие скрипты, опять же для того чтобы не писать на каждом один и тот же код, используется один скрипт
    mounted() {
        console.log('dialog mounted') // как и в миксине как и тут отработают оба кода, они друг друга не перекрывают
    }
}
</script>

<style>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    position: fixed;
    display: flex;
}

.dialog__content {
    margin: auto;
    background-color: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}
</style>