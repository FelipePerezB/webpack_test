const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") 
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const cssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const Dotenv = require("dotenv-webpack")
// const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// const CopyPlugin = require("copy-webpack-plugin") 

module.exports = {
    entry:"./src/index.js",
    output:{
        path: path.resolve(__dirname,"dist"),
        filename:"[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]",
        clean:true
    },
    resolve:{
        extensions:[".js"],
        alias:{
            "@utils":path.resolve(__dirname, "src/utils"),
            "@templates":path.resolve(__dirname, "src/templates"),
            "@styles":path.resolve(__dirname, "src/styles"),
            "@images":path.resolve(__dirname, "src/assets/images"),
            "@utils":path.resolve(__dirname, "src/utils"),
        }
    },
    mode:"production",
    module:{
        rules:[
        {
            test:/\.m?js$/,
            exclude:/node_modules/,
            use:{
                loader:"babel-loader"
            }
        },
        {
            test:/\.css$/i,
            use:[
                miniCssExtractPlugin.loader,
                "css-loader"
                ]
        },
        {
            test:/\.(png|svg|jpg|jpeg|gif)/,
            type:"asset/resource"
        },
        {
            test:/\.(woff|woff2)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'static/fonts/[hash][ext][query]',
            }
        }
    ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject:true,
            template:"./public/index.html",
            filename:"./index.html"
        }),
        new miniCssExtractPlugin({
            filename:"assets/[name].[contenthash].css"
        }),
        new Dotenv(),
        // new CleanWebpackPlugin
        // new CopyPlugin({
        //     patterns:[
        //         {
        //             from: path.resolve(__dirname, "src", "assets/images"),
        //             to:"assets/images"
        //         }
        //     ]
        // })
    ],
    optimization:{
        minimize:true,
        minimizer:[
            new cssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
}