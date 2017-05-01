import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.es',
  interop: false,
  plugins: [
    babel(),
    nodeResolve(),
  ],
  external: [
    '@thewhodidthis/otto'
  ],
  globals: {
    '@thewhodidthis/otto': 'Otto'
  },
  targets: [
    {
      format: 'iife',
      sourceMap: true,
      moduleName: 'Life',
      dest: 'dist/life.js',
    },
    {
      format: 'cjs',
      dest: 'index.js',
    }
  ]
};
