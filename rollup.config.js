import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.es',
  dest: 'index.js',
  format: 'cjs',
  interop: false,
  plugins: [
    babel(),
  ],
  external: [
    '@thewhodidthis/otto'
  ],
};
