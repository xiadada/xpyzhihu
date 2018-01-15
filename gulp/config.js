var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth()+1,
	day = date.getDate();

month = month > 9 ? month : '0' + month;
day = day > 9 ? day : '0' + day;
module.exports = {

	"font": {
		"version": "1.0.0",
		"className": "fonticon",
		"fontName": "font-icon"
	},

	server_config: {
		test: {
			host: '172.16.10.4',
  			port: 22,
  			username: 'root',
  			password: 'w4c123'
		}
	},


	build: {
		module_name: 'webso',

		release_name: 'dataCollision-frontend-module-'+ year + month + day

	},

	rjs: {
		tempDir: "temp_",
		destDir: "rhyton-godway-rjs",

		release_name: 'dataCollision-frontend-module-'+ year + month + day

	}
	
}