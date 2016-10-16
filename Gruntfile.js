module.exports = function (grunt) {

    grunt.initConfig({
        html_w_style: grunt.file.read("index.html")
            .replace(/@STYLES/, grunt.file.read("styles/styles_min.css")),
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'min/index.html': 'index.html'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: true,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'styles_min.css': [
                        'css/font-awesome.min.css',
                        'css/superslides.css',
                        'css/masonry.css',
                        'css/fancybox.css',
                        //'css/animate.css',
                        'css/bg/gray.css',
                        'css/color/yellow.css',
                        'css/style.css'
                    ]
                }
            },
            test: {
                files: {
                    'styles_min.css': [
                        'css/test.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'js/all_min.ug.js': [
                        'js/jquery-1.10.0.min.js',
                        'js/jquery.nicescroll.js',
                        'js/jquery.animate-enhanced.min.js',
                        'js/jquery.easing.1.3.js',
                        'js/jquery.superslides.min.js',
                        'js/jquery.masonry.min.js',
                        'js/jquery.fancybox.min.js',
                        'js/snabbt.min.js',
                        'js/jquery.touchSwipe.min.js',
                        'js/functions.js'
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'js/jquery-1.10.0.min.js',
                    'js/jquery.nicescroll.js',
                    'js/jquery.animate-enhanced.min.js',
                    'js/jquery.easing.1.3.js',
                    'js/jquery.superslides.min.js',
                    'js/jquery.masonry.min.js',
                    'js/jquery.fancybox.min.js',
                    'js/snabbt.min.js',
                    'js/jquery.touchSwipe.min.js',
                    'js/functions.js'
                ],
                dest: 'js/all_min.js'
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false
                }
            },
            templates: {
                files: ['jade/*.jade'],
                tasks: ['jade'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'expanded'
                },
                files: {
                    'styles/main_global.css': 'sass/main_global.scss'
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
};