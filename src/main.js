import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI';
import router from '@/router/router';
import directives from '@/directives/index';
import store from '@/store/index'

const app = createApp(App);

Object.values(components).forEach(component => {
    app.component(component.name, component)
})

Object.values(directives).forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(router)
    .use(store)
    .mount('#app');

    /*
import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI';
import router from '@/router/router';
import directives from '@/directives/index';

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(router)
    .mount('#app');

*/