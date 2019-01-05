import typescript from 'typescript'
import RollTS from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import { minify } from 'uglify-es'

const pkg = require('./package.json')

const pluginConf = [
  RollTS({ typescript }),
  replace({
		'process.env.NODE_ENV': "'production'",
	}),
  resolve(),
  commonjs()
]

const umdProduction = {
  input: 'src/core/index.ts',
  plugins: pluginConf.concat([
    uglify({
			compress: {
				pure_getters: true
			},
			output: {
				comments: false
			},
		}, minify)
  ]),
  output: [
    {
      file: 'lib/umd/rabbit.umd.js',
      name: 'Rabbit',
      format: 'umd'
    }
  ]
}

const production = {
  input: 'src/rabbit/index.ts',
  plugins: pluginConf,
  output: {
    file: pkg.module,
    format: 'es'
  }
}

const cjsProduction = {
  ...production,
  plugins: pluginConf.concat([
    uglify({
			compress: {
				pure_getters: true
			},
			output: {
				comments: false
			},
		}, minify)
  ]),
  output: {
    file: pkg.main,
    format: 'cjs'
  }
}

export default [ production, cjsProduction, umdProduction ]
