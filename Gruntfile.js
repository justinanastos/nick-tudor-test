//jshint camelcase: false
var _;
var matchdep;
var chalk;
var module;

_ = require('underscore');
matchdep = require('matchdep');
chalk = require('chalk');

module.exports = function(grunt) {

    var config;
    var pkg;

    pkg = grunt.file.readJSON('package.json');
    config = grunt.file.readYAML('config/grunt.yml').config;

    //-- version must match '^(?:^(?!-)[a-z\d\-]{0,62}[a-z\d]$)$'
    function sanitizeVersion(dirtyVersion) {
        return (dirtyVersion || '').replace(/(.)/, 'v$1').replace(/[^a-z0-9]/g, '-');
    }

    grunt.initConfig({
        pkg: pkg,
        sanitizeVersion: sanitizeVersion,
        semver: require('semver'),
        secret: grunt.file.readJSON('secret.json'),

        sftp: {
            production: {
                files: {
                    './': [
                        'web/vendor/requirejs/require.js',
                        'web/css',
                        'web/index.html',
                        'web/build/require-main.js',
                        'web/build/require-main.js.map'
                    ]
                },
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>',
                    port: '<%= secret.port %>',
                    srcBasePath: 'web/',
                    showProgress: true,
                    path: '/home/jusana/nick-tudor-test',
                    createDirectories: true
                }
            }
        },

        imagemin: {
            build: {
                files: [{
                    expand: true,
                    src: [config.files.img.src],
                    // Just replace the file
                    dest: '.'
                }]
            }
        },

        preprocess: {
            production: {
                files: {
                    'web/index.html': 'web/index.template.html'
                },
                options: {
                    context: {
                        PRODUCTION: true
                    }
                }
            },
            dev: {
                files: {
                    'web/index.html': 'web/index.template.html'
                }
            }
        },

        groc: {
            normal: {
                src: config.files.js.app.src
            },
            options: {
                index: 'index.html',
                out: config.files.groc.dest,
                strip: 'web/js'
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            inline: {
                files: {
                    src: config.files.js.app.src
                }
            },
            startup: {
                options: {
                    force: true
                },
                files: {
                    src: config.files.js.app.src
                }
            }
        },

        jscs: {
            inline: {
                files: {
                    src: config.files.js.app.src
                }
            },
            startup: {
                options: {
                    force: true
                },
                files: {
                    src: config.files.js.app.src
                }
            }
        },

        requirejs: {
            options: {
                findNestedDependencies: true,
                generateSourceMaps: true,
                optimize: 'uglify2',
                preserveLicenseComments: false,
                uglify2: {
                    //Example of a specialized config. If you are fine
                    //with the default options, no need to specify
                    //any of these properties.
                    output: {
                        beautify: false
                    },
                    compress: {
                        sequences: false
                    },
                    warnings: false,
                    mangle: false
                }
            },
            prod: {
                options: {
                    appDir: config.requirejs.appDir,
                    baseUrl: config.requirejs.baseUrl,
                    dir: config.requirejs.dir,
                    mainConfigFile: config.requirejs.mainConfigFile,
                    modules: config.requirejs.modules
                }
            },
            dev: {
                options: {
                    appDir: config.requirejs.appDir,
                    baseUrl: config.requirejs.baseUrl,
                    dir: config.requirejs.dir,
                    mainConfigFile: config.requirejs.mainConfigFile,
                    modules: config.requirejs.modules,
                    optimize: 'none'
                }
            }
        },
        sass: {
            options: {
                loadPath: config.files.scss.loadPaths,
                style: 'compact'
            },
            build: {
                src: config.files.scss.app.src,
                dest: config.files.scss.app.dest
            }
        },
        scsslint: {
            allFiles: config.files.scss.watch,
            options: {
                bundleExec: false,
                config: '.scss-lint.yml',
                colorizeOutput: true
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            'pre-commit-hook': {
                src: 'pre-commit-hook.sh',
                dest: '.git/hooks/pre-commit'
            }
        },
        watch: {
            imagemin: {
                files: config.files.img.src,
                tasks: 'newer:imagemin:build'
            },
            livereload: {
                options: {
                    livereload: config.liveReloadPort
                },
                files: [].concat(
                    'web/css/main.css',
                    config.files.js.app.src,
                    config.files.handlebars.src
                )
            },
            scss: {
                options: {
                    interrupt: true
                },
                files: config.files.scss.watch,
                tasks: 'sass'
            }
        }
    });
    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('prepare_livereload', 'Build Locale files.', function() {
        var filename;
        var generateLiveReload;

        filename = config.files.js.livereload;
        generateLiveReload = function(port) {
            return '(function() {\n    \'use strict\';\n    var existing_script_tag = document.getElementsByTagName(\'script\')[0];\n    var host;\n    var new_script_tag = document.createElement(\'script\');\n    var url;\n    host = (location.host || \'localhost\').split(\':\')[0];\n    url = \'http://\' + host + \':' + port + '/livereload.js?snipver=1\';\n    new_script_tag.src = url;\n    existing_script_tag.parentNode.insertBefore(new_script_tag, existing_script_tag);\n})(); ';
        };

        grunt.file.write(filename, generateLiveReload(config.liveReloadPort));
        grunt.log.writeln('File ' + chalk.cyan(filename) + ' created');
    });

    grunt.registerTask('dev', [
        'symlink:pre-commit-hook',
        'preprocess:dev',
        'sass',
        'newer:imagemin:build',
        'prepare_livereload',
        'watch'
    ]);
    grunt.registerTask('default', 'dev');

    grunt.registerTask('deploy', [
        'sass',
        'preprocess:production',
        'requirejs:prod',
        'sftp:production'
    ]);

    // Register task for validating code.
    grunt.registerTask('validate-code', ['jshint:inline', 'jscs:inline', 'scsslint']);
    grunt.registerTask('test', ['validate-code']);
};
