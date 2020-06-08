module.exports = {
    plugins: {
        // ...
        'postcss-px-to-viewport': {
            // options
            viewportWidth: 375,
            unitPrecision: 5,
            viewportUnit: 'vw',
            minPixelValue: 1,
            mediaQuery: false,
            fontViewportUnit: 'vw',
            landscapeUnit: 'vw',
            landscapeWidth: 667,
            exclude: /\.\/src\//
        }
    }
}