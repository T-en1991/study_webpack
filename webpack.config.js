const path=require('path')
module.exports = {
  entry: './第一章/src/index.js',
  output:{
    filename: "bundle.js"
  },
  mode:'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
}
