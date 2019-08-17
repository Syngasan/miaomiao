export default {
    path: '/mine',
    component: () => import('@/views/Mine'),
    children: [
        { path: 'center', component: () => import('@/views/Mine/center') },
        { path: 'register', component: () => import('@/components/Register') },
        { path: 'login', component: () => import('@/components/Login') },
        { path: 'findpassword', component: () => import('@/components/FindPassword') },
        { path: '/mine', redirect: 'center' }

    ]
}