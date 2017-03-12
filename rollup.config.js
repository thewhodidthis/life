import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.es',
  plugins: [
    babel(),
    nodeResolve(),
  ],
  targets: [
    {
      format: 'iife',
      indent: true,
      sourceMap: true,
      moduleName: 'Life',
      dest: 'dist/life.js'
    },
    {
      format: 'cjs',
      dest: 'index.js',
      external: [
        '@thewhodidthis/otto'
      ]
    }
  ]
};
