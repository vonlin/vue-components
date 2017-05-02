import configs from './components.config.json'


const registerRoute = (config) => {
  let route = [];
  config.map(page =>
    route.push({
      name: page.cname,
      path: page.cpath,
      component: require(`./components${page.cpath}${page.cpath}`),
      meta: {
        title: page.cname
      }
    })
  )

  return { route, navs: config };
};

const route = registerRoute(configs);

route.route.push({
  path: '/',
  component: require('./components/Main')
},{
  path: '/home',
  component: require('./components/Home'),
  meta: {
    title: "组件列表"
  }
});



export const navs = route.navs;
export default route.route;

