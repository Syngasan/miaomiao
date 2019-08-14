export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: "city",
            component: () => import('@/components/City')
        },
        {
            path: "nowplaying",
            component: () => import('@/components/NowPlaying')
        },
        {
            path: "search",
            component: () => import('@/components/Search')
        },
        {
            path: "comingsoon",
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'detail/1/:id',
            components: {
                default: () => import('@/components/NowPlaying'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:id',
            components: {
                default: () => import('@/components/ComingSoon'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: "/movie",
            redirect: '/movie/nowplaying'
        },

    ]
}