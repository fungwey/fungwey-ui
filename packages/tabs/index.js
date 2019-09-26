// 导入组件，组件必须声明 name
import FWTabs from './src/tabs'

// 为组件提供 install 安装方法，供按需引入
FWTabs.install = function (Vue) {
  Vue.component(FWTabs.name, FWTabs)
}

// 默认导出组件
export default FWTabs
