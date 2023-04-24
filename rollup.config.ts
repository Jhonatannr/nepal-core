import copy from 'rollup-plugin-copy'
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import multi from '@rollup/plugin-multi-entry';

const external = [
    ...Object.keys(pkg.dependencies || {}),
    "@al/core",
    "@al/core/*"
];

const commonPlugins = [
    typescript({
        typescript: require('typescript'),
    }),
    multi(),
    // terser() // minifies generated bundles
];

function configureEntryPoint( bundleName, directory ) {
    if ( ! directory ) {
        directory = bundleName;
    }
    return {
        input: [ `lib/${directory}/src/index.ts`,
        ],
        output: {
            file: `dist/${bundleName}.esm2015.js`,
            format: 'esm', // Keep the bundle as an ES module file
            sourcemap: true,
        },
        external,
        plugins: [ ...commonPlugins ]
    };
}

export default [
    configureEntryPoint( 'index', 'nucleus' ),
    configureEntryPoint( 'testing' ),
    configureEntryPoint( 'navigation' ),
    configureEntryPoint( 'platform-browser' ),
    configureEntryPoint( 'defender' ),
    configureEntryPoint( 'support' ),
    configureEntryPoint( 'configuration' ),
    configureEntryPoint( 'incidents' ),
    configureEntryPoint( 'search' ),
    configureEntryPoint( 'assets' ),
];
