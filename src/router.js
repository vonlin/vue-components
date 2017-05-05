import configs from './components.config.json'
import cheader from './components/Header';

const registerRoute = (config) => {
  let route = [];
  config.map(page =>
    route.push({
      name: page.cname,
      path: page.cpath,
      components: {cmain:require(`./components${page.cpath}${page.cpath}`), cheader:cheader},
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
  components: {cmain:require('./components/Home'),cheader:cheader},
  meta: {
    title: "组件列表"
  }
});

export const navs = route.navs;
export default route.route;

