module.exports = function(grunt){

	grunt.initConfig({
		transport : {
			options : {
				format : 'application/dist/{{filename}}'
			},
			application : {
				files : {
					'.build' : ['application.js','util.js']
				}
			}
		},
		concat : {
			main : {
				options : {
					relative : true
				},
				files : {
					'dist/application.js' : ['.build/application.js'],
					'dist/application-debug.js' : ['.build/application-debug.js']
				}
			}
		},
		uglify : {
			main : {
				files : {
					'dist/application.js' : ['dist/application.js']
				}
			}
		},
		clean : {
			build : ['.build']
		}
	});

	grunt.loadNpmTasks('grunt-cmd-transport');
	grunt.loadNpmTasks('grunt-cmd-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('build',['transport','concat','uglify','clean'])
};