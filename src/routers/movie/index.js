// 暴露整个
export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [//子路由
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
            path: 'detail/1/:id',//动态路由
            components: {
                default: () => import('@/components/NowPlaying'), //默认显示的视图
                detail: () => import('@/views/Movie/detail')    //在命名视图显示
            },
            props: { //路由组件传参
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
            redirect: '/movie/nowplaying' //重定向
        },

    ]
}