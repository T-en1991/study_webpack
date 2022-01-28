const path=require('path')
const glob=require('glob')
const webpack=require('webpack')
const htmlWebpackPlugin= require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//多页面打包
const getEntryAndHtmlPluginJs=()=>{
  let entry={}
  let htmlWebPluginJs=[]

  const entryFiles=glob.sync(path.join(__dirname,'./src/views/*/main.js'));

  Object.keys(entryFiles).map(item=>{
    const entryFile=entryFiles[item];
    const match=entryFile.match(/src\/views\/(.*)\/main.js/);
    const pageName=match&&match[1];
    entry[pageName]=entryFile;
    htmlWebPluginJs.push(
      new htmlWebpackPlugin({
        template:path.join(__dirname,`src/views/${pageName}/index.html`),
        filename: `${pageName}/${pageName}.html`,
        chunks:[pageName]
      })
    )
  })
  return {
    entry,
    htmlWebPluginJs
  }
}

const { entry, htmlWebPluginJs}=getEntryAndHtmlPluginJs()

console.log(entry)
console.log(htmlWebPluginJs)

module.exports={
  // entry: './src/views/demo1/main.js',
  entry,
  output:{
    filename: "[name].js",
    path: path.resolve(__dirname,'./dist'),
    publicPath: "/test1/dist/"
  },
  devServer: {
    port:8888,
    open:true
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test:/\.less$/,
        use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']
      },
      {
        //匹配图片资源
        test: /\.(jpg|png|gif|svg)$/,
        //使用一个loader可以使用loader:"url-loader"、use:"url-loader"、use:["url-loader"]
        //url-loader是依赖file-loader的所以下载时要下载url-loader和file-loader两个包
        loader:"url-loader",
        options: {
          //图片小于8kb,就会被base64处理，大于8k不处理，优点减少请求数量（base64在客户端本地解码减少服务器压力，如果图片过大海继续采用base64编码会导致cpu调用率上升，网页加载时变卡），缺点图片体积会更大（文件速度会更慢）
          limit:1*1024,
          //关闭urlloader的es6模块化，使用commjs解析，以解决打包前html里的<img>在打包后html中图片src="[object moudle]"的问题（新版本已经修复不需要了），原因是url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          esModule:false,
          //给图片重命名，默认会将图片命名成一个很长的hash字符串.ext后缀
          //[hash:10]   取图片hash前10位
          //[ext]   取文件原来扩展名
          name:'[hash:10].[ext]',
          outputPath:'./img',
          publicPath:'./img'
        }
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin('菜鸟教程 webpack 实例'),
    ...htmlWebPluginJs,
    // new htmlWebpackPlugin({template:'./src/views/demo1/index.html', filename: "demo1/demo1.html", chunks: ['demo1']}),
    // new htmlWebpackPlugin({template:'./src/views/demo2/index.html', filename: "demo2/demo2.html", chunks: ['demo2']}),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css'
    })
  ]
}
