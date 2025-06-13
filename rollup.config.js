import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            sourcemap: true,
            exports: "named"
        },
        {
            file: 'dist/index.mjs',
            format: 'esm',
            sourcemap: true,
            exports: "named"
        },
    ],
    plugins: [
        typescript({ tsconfig: './tsconfig.json' }),
        resolve(),
        commonjs(),
    ],
    external: ['tslib'],
};
