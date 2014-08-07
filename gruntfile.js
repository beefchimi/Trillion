module.exports = function(grunt) {

	"use strict"; // not sure what this does

	// Load each plugin
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Grunt Configuration
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Delete all build files
		clean: {

			clean: [
				'assets/media/images/build/*',
				'assets/media/svg/build/*',
				'assets/media/svg/master.svg',
				'assets/scripts/build/*',
				'assets/styles/build/*'
			]

		},

		// SASS Processor and Minify
		sass: {

			dist: {
				options: {
					style: 'compressed',
					sourcemap: true
				},
				files: {
					'assets/styles/build/styles.css' : 'assets/styles/source/imports.scss'
				}
			}

		},

		// Apply vendor prefixes to compiled CSS
		autoprefixer: {

			options: {
				// browsers: ['last 2 version', 'ie 8', 'ie 9'],
				map: true // not sure what performance is like when sass creates a map and autoprefixer updates it...
			},
			dist: {
				files: {
					'assets/styles/build/styles.css' : 'assets/styles/build/styles.css'
				}
			}

		},

		// use jshint?
		// should plugins and custom scripts be separate? more likely to update custom scripts than plugins...

		// JS Concatenate and Minify
		uglify: {

			dist: {
				options: {
					sourceMap: true
				},
				files: {
					'assets/scripts/build/scripts.js' : ['assets/scripts/source/plugins.js', 'assets/scripts/source/main.js']
				}
			}

		},

		// Compress PNGs, JPGs, and GIFs
		imagemin: {

			dist: {
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [{
					expand: true,
					cwd: 'assets/media/images/source/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/media/images/build/'
				}]
			}

		},

		// Compress source SVGs
		svgmin: {

			options: {
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false },
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/media/svg/source/',
					src: ['**/*.svg'],
					dest: 'assets/media/svg/build/',
					ext: '.svg'
				}]
			}

		},

		// Compile SVGs to a single file
		svgstore: {

			options: {
/*
				includedemo : true,
				svg: {
					viewBox : '0 0 100 100'
				},
*/
				formatting : {
					indent_size : 1,
					indent_char : '	'
				}
			},
			default: {
				files: {
					'assets/media/svg/master.svg' : ['assets/media/svg/build/*.svg']
				}
			}

		},

		// Deploy development project to staging / production
		rsync: {

/*
			dist: {
				options: {
					src: './',
					dest: '../staging',
					recursive: true,
					syncDest: true,
					exclude: ['.git*', '.sass-cache', 'node_modules', 'gruntfile.js', 'package.json', 'LICENSE', 'README.md', '.DS_Store']
				}
			}
*/

			stage: {
				options: {
					src: './',
					dest: '/nfs/c06/h06/mnt/186705/domains/curtisdulmage.com/html/sites/trillion',
					host: 'curtisdulmage.com@s186705.gridserver.com',
					recursive: true,
					syncDest: true,
					exclude: ['.git*', '.sass-cache', 'node_modules', 'gruntfile.js', 'package.json', 'LICENSE', 'README.md', '.DS_Store']
				}
			}

/*
			prod: {
				options: {
					src: './',
					dest: '/var/www/site',
					host: 'user@live-host',
					recursive: true,
					syncDest: true,
					exclude: '<%= rsync.stage.exclude %>'
				}
			}
*/

		},

		// Watch for changes on File > Save
		watch: {

/*
			src: {
				files: ['*.html', '*.php', '*.css', '*.js'], // '*.html, *.php, *.css, *.js' // '*.html', '*.php', '*.css', '*.js'
				options: { livereload: true }
			},
*/

			html: {
				files: ['**/*.php'],
				options: {
					livereload: true,
				}
			},

			css: {
				files: ['assets/styles/source/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					livereload: true,
				}
			},

			js: {
				files: ['assets/scripts/source/*.js'],
				tasks: ['uglify'],
				options: {
					livereload: true,
				}
			}

		}

	});

	// grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'autoprefixer', 'uglify', 'imagemin', 'svgmin', 'svgstore']);

	grunt.registerTask('buildfiles', ['sass', 'autoprefixer', 'uglify']);

	grunt.registerTask('buildmedia', ['newer:imagemin', 'newer:svgmin', 'newer:svgstore']);

};