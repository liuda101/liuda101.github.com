module.exports = function(grunt){
	grunt.initConfig({
		concat: {
			js: {
				src: [
					'src/loader.js',
					'src/maps.js',
					'src/singleplayer.js',
					'src/mouse.js',
					'src/game.js'
				],
				dest: 'scripts/game.js'
			},
			entity: {
				src: [
					'src/buildings.js',
					'src/vehicles.js',
					'src/aircarft.js',
					'src/terrain.js'
				],
				dest: 'scripts/entities.js'
			},
			css: {
				src: [
					'src/common.css',
					'src/startScreen.css',
					'src/loadingScreen.css',
					'src/missionScreen.css',
					'src/gameInterfaceScreen.css'
				],
				dest: 'styles/game.css'
			}
		},
		watch: {
			scripts: {
				files: ['src/*.js','src/*.css','Gruntfile.js'],
				tasks: ['concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat']);
};