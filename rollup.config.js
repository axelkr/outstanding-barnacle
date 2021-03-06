import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'outstandingBarnacle',
    globals: {
    }
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    terser()
  ],
  external: []
};