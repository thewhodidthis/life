import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.es',
  dest: 'dist/life.js',
  format: 'iife',
  indent: true,
  sourceMap: true,
  moduleName: 'Life',
  plugins: [
    babel(),
    nodeResolve(),
  ],
};
