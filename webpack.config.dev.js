const path = require('path'); // path ya es un elemento disponible en node asique lo pongo solo asi.
// me da info del lugar donde estoy en general.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // llamo al recurso que isntale
const CopyPlugin = require('copy-webpack-plugin'); // llamo al plugin para copiar
const Dotenv = require('dotenv-webpack');


module.exports = { // exportaremos las configuraciones
    entry: './src/index.js', // ese es el punto de entrada de la aplicacion
    output: {
        path: path.resolve(__dirname,'dist'), // para saber donde se encuentra el proyecto
        filename: '[name].[contenthash].js', // como se llama el archivo resultante
        assetModuleFilename: 'assets/images/[hash][ext][query]' // para que mueva las imagenes donde quiero.
    }, // hacia donde enviamos lo que prepara webpack. tiene un nombre especifico para esto y es dist
    resolve: {
        extensions: ['.js'], // las extensiones con las que voy a trabajar
        alias: {
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),
        }
    },
    mode: 'development',
    // watch: true, // antes estaba en true
    module: {
        rules: [
            {
                test: /\.m?js$/, // expresion regular que dice: usar cualquier extension mjs o js. mjs es para modulos
                exclude: /node_modules/, // ahora voy a excluir - no quiero que use elementos js o modulos que esten en node-modules
                use: {
                    loader: 'babel-loader' // le digo que use babel-loader
                }
            },
            {
                test: /\.css|\.styl$/i, // expresion regular para usar css y stylus
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    },
                }
            },
            // Solucion extra para que no se carguen las fuentes como imagen
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
            //     type: "asset/resource",
            //     generator: {
            //       filename: "assets/fonts/[hash][ext]",
            //     },
            //   }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            inject: true, // haga insercion de los elementos
            template: './public/index.html', // cual es el template a usar
            filename: './index.html' // toma nuestro template, lo transforma como decimos y lo va a llamar asi en dist.
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src", "assets/images"),
                    to: "assets/images" // manda a dist -> assets/images
                } // en el objeto decimos desde donde y hacia donde se mueve.
            ]
        }),
        new Dotenv(), // armo la instancia del copiador
    ],
    devServer: {
        static: path.join(__dirname,'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3006,
    }
}