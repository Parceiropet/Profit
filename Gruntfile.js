(function() {

  'use strict';

  var middlewares = require('./middleware');
  var url = require('url');
  var proxy = require('proxy-middleware');
  var httpPlease = require('connect-http-please');
  var serveStatic = require('serve-static');

  module.exports = function(grunt) {

    var accountName, _results, rewriteLocation, config, environment, secureUrl, imgProxyOptions, name, pkg, portalHost, rewriteReferer, portalProxyOptions, results, taskArray, taskName, tasks, verbose;

    pkg = grunt.file.readJSON('package.json');
    accountName = process.env.VTEX_ACCOUNT || pkg.accountName || 'basedevmkp';
    environment = process.env.VTEX_ENV || 'vtexcommercestable';

    secureUrl = process.env.VTEX_SECURE_URL || pkg.secureUrl;

    verbose = grunt.option('verbose');
    if (secureUrl) {
      imgProxyOptions = url.parse("https://" + accountName + ".vteximg.com.br/arquivos");
    } else {
      imgProxyOptions = url.parse("http://" + accountName + ".vteximg.com.br/arquivos");
    }
    imgProxyOptions.route = '/arquivos';

    portalHost = accountName + "." + environment + ".com.br";
    if (secureUrl) {
      portalProxyOptions = url.parse("https://" + portalHost + "/");
    } else {
      portalProxyOptions = url.parse("http://" + portalHost + "/");
    }
    portalProxyOptions.preserveHost = true;
    portalProxyOptions.cookieRewrite = accountName + ".vtexlocal.com.br";

    rewriteReferer = function(referer) {
      if (referer == null) {
        referer = '';
      }
      if (secureUrl) {
        referer = referer.replace('http:', 'https:');
      }
      return referer.replace('vtexlocal', environment);
    };

    rewriteLocation = function(location) {
      return location.replace('https:', 'http:').replace(environment, 'vtexlocal');
    };

    config = {
      fileName: pkg.name,
      clean: {
        main: ['build']
      },
      copy: {
        main: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: ['**', '!**/*.sass', '!**/*.scss'],
            dest: 'build/'
          }]
        }
      },
      compass: {
        dist: {
          options: {
            config: 'config.rb'
          }
        }
      },
      cssmin: {
        main: {
          expand: true,
          cwd: 'build/dev',
          src: ['*.css'],
          dest: 'build/arquivos/',
          ext: '-<%= fileName %>.min.css'
        }
      },
      jshint: {
        options: {
          reporter: require('jshint-stylish'),
          force: true,
          globals: {
            jQuery: true
          }
        },
        main: [
          'src/scripts/**/*.js',
        ]
      },
      uglify: {
        options: {
          compress: {
            drop_console: false
          }
        },
        main: {
          files: [{
            expand: true,
            cwd: 'src/vendor/bower_components/modernizr/',
            src: ['modernizr.js'],
            dest: 'build/arquivos'
          }, {
						'build/arquivos/<%= fileName %>.min.js': [
								'src/vendor/bower_components/slick.js/slick/slick.min.js',
								'src/vendor/bower_components/jquery.maskedinput/dist/jquery.maskedinput.js',
								'src/scripts/vendor/easyzoom.min.js',
								'src/scripts/<%= fileName %>.js',
								'src/scripts/app/constructors/**/*.js',
								'src/scripts/app/modules/**/*.js',
								'src/scripts/app/pages/**/*.js',
								'src/scripts/app/*.js'
						]
          }, {
            'build/arquivos/vtex-smartResearch.min.js': [
              'src/scripts/vendor/vtex-smartResearch.dev.js'
            ]
          }]
        }
      },
      concat: {
        dist: {
          src: [
							'src/vendor/bower_components/slick.js/slick/slick.min.js',
							'src/vendor/bower_components/jquery.maskedinput/dist/jquery.maskedinput.js',
							'src/scripts/vendor/easyzoom.min.js',
							'src/scripts/<%= fileName %>.js',
							'src/scripts/app/constructors/**/*.js',
							'src/scripts/app/modules/**/*.js',
							'src/scripts/app/pages/**/*.js',
							'src/scripts/app/*.js'
					],
          dest: 'build/arquivos/<%= fileName %>.dev.js'
        },
      },
      imagemin: {
        main: {
          files: [{
            expand: true,
            cwd: 'src/images',
            src: ['*.{png,jpg,gif}'],
            dest: 'build/arquivos/'
          }]
        }
      },
      connect: {
        http: {
          options: {
            hostname: "*",
            livereload: true,
            port: process.env.PORT || 80,
            middleware: [
              middlewares.disableCompression,
              middlewares.rewriteLocationHeader(rewriteLocation),
              middlewares.replaceHost(portalHost),
              middlewares.replaceReferer(rewriteReferer),
              middlewares.replaceHtmlBody(environment, accountName, secureUrl),
              httpPlease({
                host: portalHost,
                verbose: verbose
              }), serveStatic('./build'),
              proxy(imgProxyOptions),
              proxy(portalProxyOptions),
              middlewares.errorHandler
            ]
          }
        }
      },
      watch: {
        options: {
          livereload: true
        },
        images: {
          files: ['src/**/*.{png,jpg,gif}'],
          tasks: ['imagemin']
        },
        main: {
          files: ['src/**/*.html', 'src/**/*.css'],
          tasks: ['copy']
        },
        js: {
          files: ['src/scripts/**/*.js'],
          tasks: ['jshint', 'uglify']
        },
        css: {
          files: ['src/styles/**/*.scss'],
          tasks: ['compass', 'cssmin']
      },
        grunt: {
          files: ['Gruntfile.js']
        }
      }
    };
    tasks = {
      build: ['clean', 'compass', 'cssmin', 'imagemin', 'jshint', 'uglify'],
      devJs: ['concat'],
      devoff: ['build', 'watch'],
      'default': ['build', 'connect', 'watch']
    };

    grunt.template.process('<%= fileName %>', {
      data: config
    });

    grunt.initConfig(config);
    for (name in pkg.devDependencies) {
      if (name.slice(0, 6) === 'grunt-') {
        grunt.loadNpmTasks(name);
      }
    }

    _results = [];
    for (taskName in tasks) {
      taskArray = tasks[taskName];
      _results.push(grunt.registerTask(taskName, taskArray));
    }
    return _results;
  };

}).call(this);
