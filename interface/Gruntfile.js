module.exports = function (grunt) {

    // chargement des taches Grunt
    require('load-grunt-tasks')(grunt);

    // configuration des taches
    grunt.initConfig({
        
        watch: {
            compass: {
                files: ['src/scss/{,*/}*.scss'],
                tasks: ['compass:livereload']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'src/*.html',
                    'src/css/*.css',
                    'src/images/*.png'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost' // utiliser 0.0.0.0 pour autoriser le livereload depuis d'autres devices
            },
            livereload: {
                options: {
                    open: true,
                    base: ['src']
                }
            }
        },

        clean: {
            dist: ['dist']
        },

        compass: {
            livereload: {
                options: {
                    debugInfo: true
                }
            },
            dist: {
                options: {
                    cssDir: 'dist/css',
                    outputStyle: 'compressed'
                }
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    dest: 'dist',
                    src: [
                        '*.html',
                        'images/*.*'
                    ]
                }]
            }
        }
    });

    // definition de taches
    grunt.registerTask('server',  ['connect:livereload', 'watch']);
    grunt.registerTask('live',    ['server']);
    grunt.registerTask('build',   ['clean:dist', 'compass:dist', 'copy:dist']);
    grunt.registerTask('default', ['build']);

};
