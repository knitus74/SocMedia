var nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: {
		app: "./app.js",
		index: "./public/scripts/index.jsx"
	},

	output:{
		path: __dirname + "/dist", filename: "[name].js"
	},

	target: 'node',

	externals: [nodeExternals()],

	node: {
   		fs: "empty",
   		tls: "empty",
   		net: "empty",
   		child_process: "empty",
	},

	module: {
	  	rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env']
	        }
	      }
	    },
	    {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
            }
        }
	  ]
	},
	watch: true,
}