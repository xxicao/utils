import resolve from 'rollup-plugin-node-resolve'; // 解析第三方模块
import commonjs from 'rollup-plugin-commonjs'; // 将CommonJS模块转换为 ES2015
import babel from 'rollup-plugin-babel'; // es6新特性来编写代码
import { terser } from 'rollup-plugin-terser'; // 压缩js代码
import { eslint } from 'rollup-plugin-eslint'; // js代码检测

export default {
  input: 'src/main.js',
  output: [
    { file: 'dist/bundle.min.js', format: 'umd', name:'utils' },
    { file: 'dist/bundle.esm.js', format: 'es', name:'utils' },
  ],
  plugins: [
    resolve(),
    commonjs(),
    eslint({
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    babel({ 
      exclude: 'node_modules/**',
      runtimeHelpers: true,
     }),
    terser()
  ]
}