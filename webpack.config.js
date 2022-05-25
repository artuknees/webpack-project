const path = require('path'); // path ya es un elemento disponible en node asique lo pongo solo asi.
// me da info del lugar donde estoy en general.
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { // exportaremos las configuraciones
    entry: './src/index.js', // ese es el punto de entrada de la aplicacion
    output: {
        path: path.resolve(__dirname,'dist'), // para saber donde se encuentra el proyecto
        filename: 'main.js', // como se llama el archivo resultante
    }, // hacia donde enviamos lo que prepara webpack. tiene un nombre especifico para esto y es dist
    resolve: {
        extensions: ['.js'] // las extensiones con las que voy a trabajar
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // expresion regular que dice: usar cualquier extension mjs o js. mjs es para modulos
                exclude: /node_modules/, // ahora voy a excluir - no quiero que use elementos js o modulos que esten en node-modules
                use: {
                    loader: 'babel-loader' // le digo que use babel-loader
                }
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            inject: true, // haga insercion de los elementos
            template: './public/index.html', // cual es el template a usar
            filename: './index.html' // toma nuestro template, lo transforma como decimos y lo va a llamar asi en dist.
        })
    ]
}