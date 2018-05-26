var path = require('path')

module.exports = {
	template: "swig", // whatever template engine you like
	mock: "/mock/mock.json", // dir for mock data
	webpack: true, // flag for using webpack or not
	webpackConfigPath: path.join(__dirname, "./webpack.dev.config.js"),
	proxy: {
		route: "/api",
		origin: "http://192.168.43.90:20000"
	},
	staticDir: "/static",
	templateDir: "/templates",
}