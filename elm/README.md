#安装环境

1、全局安装vue-cli，如果安装过就不再在项目目录安装了

2、构建项目  vue init webpack(webpack项目模版类型，目前有6个)  name(项目名字)

3、安装vue-resource  cnpm install vue-resource -S

   -S是--save的简写，--save安装插件到package.json的dependencies中，是会发布到生产环境，像vue全家桶中的东西则就需要融合到生产环境中
   
   --save-dev 则是安装到package.json的devDependencies中，只是用于开发环境，例如一些编译插件
   
4、安装less less-loader、style-loader和css-loader(安装vue-cli时已经安装了)

  cnpm install less less-loader style-loader --save-dev
  
  这里就不需要对less、less-loader做webpack规则配置了，utils.js中已经对css各种预处理语言进行了配置加载器,后续需要对css做资源引入整合，可用sass-resources-loader


tip;
1.webpack.base.conf.js是vue开发环境下的webpack的配置文件，可以在其中的resolve下设置缩略路径，这样方便后面引用。

2.在config中index.js中更改服务的主机地址和端口

# elm

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
