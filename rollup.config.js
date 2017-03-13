import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.es',
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
      indent: true,
      interop: false,
      sourceMap: true,
      moduleName: 'Life',
      dest: 'dist/life.js',
    },
    {
      format: 'cjs',
      interop: false,
      dest: 'index.js',
    }
  ]
};
