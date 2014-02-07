module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Configuration for concatinating files goes here.
        },

        // LESS to CSS
        less : {
            style: {
                options: {
                  paths: ["css/less"]
                },
                files: {
                  "css/style.css": "css/less/style.less"
                }
            }
        },

        // Minify CSS
        cssmin: {
            options: {
                banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
                    ' * <%= pkg.homepage %>\n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %>\n' +
                    ' * Licensed GPLv2+' +
                    ' */\n'
            },

            minify: {
                expand: true,

                cwd: 'css/',
                src: ['style.css'],

                dest: 'css/',
                ext: '.min.css'
            }
        },

        // Watch settings
        watch: {
          css: {
            files: ['css/less/*.less'],
            tasks: ['less:style', 'cssmin'],
            options: {
              livereload: true,
            }
          }
        }
        });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['less', 'cssmin']);

};