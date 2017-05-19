import configs from './components.config.json'
import cheader from './components/Header';

const registerRoute = (config) => {
  let route = [];
  config.map(page =>
    route.push({
      name: page.cname,
      path: page.cpath,
      components: {cmain:require(`./components${page.cpath}${page.cpath}.vue`), cheader:cheader},
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
  components: {cmain:require('./components/Home'),cheader:cheader},
},{
  path: '/home',
  components: {cmain:require('./components/Home'),cheader:cheader},
  meta: {
    title: "组件列表"
  }
});

export const navs = route.navs;
export default route.route;

