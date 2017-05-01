import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.es',
  plugins: [
    babel(),
    nodeResolve(),
  ],
  format: 'iife',
  interop: false,
  moduleName: 'Life',
  dest: 'example/life.js',
};
