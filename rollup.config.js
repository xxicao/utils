import resolve from 'rollup-plugin-node-resolve'; // 帮助 Rollup 查找外部模块，然后导入
import commonjs from 'rollup-plugin-commonjs'; // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import babel from 'rollup-plugin-babel'; // es6新特性来编写代码
import { terser } from 'rollup-plugin-terser'; // 压缩js代码
import { eslint } from 'rollup-plugin-eslint'; // js代码检测

var pkg = require('./package.json')


export default {
  input: 'src/main.js',
  output: [
    { file: pkg.main, format: 'cjs', name:'tools' },
    { file: pkg.module, format: 'es', name:'tools' },
    { file: pkg.module, format: 'umd', name:'tools' }
  ],
  plugins: [
    resolve(),
    commonjs(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    babel({ 
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true,       // 使plugin-transform-runtime生效
     }),
    terser()
  ]
}