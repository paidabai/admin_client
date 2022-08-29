1. rsf  WebStorm快速创建函数组件
2. 路由表：在src目录下建立一个文件夹routes，在该目录下新建一个index.js，编写下自己需要的路由组件
3. 页面引入路由表const elementRoute = useRoutes(路由表名)
4. 把{elementRoute}放入需要的页面位置
5.  children:[ 嵌套组件
    { 
    path:'地址', //不需要'/'
    element:<News/>  组件名
    },
6. 嵌套路由的组件<Outlet/>放在路由需要显示的位置