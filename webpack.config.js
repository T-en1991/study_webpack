// 导入处理路径的模块
var path = require('path');
// 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'), // 项目入口文件
  output: { // 配置输出选项
    path: path.resolve(__dirname, 'dist'), // 配置输出的路径
    filename: 'bundle.js' // 配置输出的文件名
  }
}