import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

const pkg = require('./package.json')

const pluginConf = [
  typescript({
    typescript: require('typescript')
  }),
  replace({
		'process.env.NODE_ENV': "'production'",
	}),
	resolve()
]

export default {
  input: 'src/core/index.ts',
  plugins: pluginConf,
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: 'lib/rabbit.umd.js',
      name: 'Rabbit',
      format: 'umd'
    }
  ]
}
