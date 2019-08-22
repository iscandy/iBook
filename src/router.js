import Vue from 'vue';
import Router from 'vue-router';
const classic = () =>
    import ('./view/classic/classic');
const book = () =>
    import ('./view/book/book');

const favor = () =>
    import ('./view/favor/favor');

const about = () =>
    import ('./view/about/about.vue');

import bookDetail from './view/book-detail/book-detail'
import bookSearch from './view/book-search/book-search.vue'



Vue.use(Router);

const routes = [{
        path: '/',
        redirect: '/classic'
    },
    {
        path: '/classic',
        component: classic,
        name: 'classic',
        meta: {
            title: '推荐'
        }
    },
    {
        path: '/book',
        component: book,
        name: 'book',
        meta: {
            title: '书本'
        },
        children: [{
                path: '/book/detail/:id',
                component: bookDetail,
                meta: {
                    title: '书本详情'
                },
                name: 'book-detail',
            },
            {
                path: '/book/search',
                component: bookSearch,
                meta: {
                    title: '书本搜索'
                },
                name: 'book-search',
            },
        ]
    },
    {
        path: '/favor',
        component: favor,
        meta: {
            title: '喜欢'
        },
        name: 'favor',
    },
    {
        path: '/about',
        component: about,
        meta: {
            title: "关于我们"
        },
        name: 'about',
    }
];


const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
    router
};