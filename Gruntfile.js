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
                banner: '/* <%= pkg.title %> - v<%= pkg.version %>\n' +
                    ' * <%= pkg.homepage %>\n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %>\n' +
                    ' * Licensed GPLv2+' +
                    ' * \n' +
                    ' * Do not modify this file directly, use the matching LESS file instead\n' +
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

        // Create readme.txt
        wp_readme_to_markdown: {
            development: {
                files: {
                  'README.md': 'readme.txt'
                },
            },
        },

        // Makepot
        makepot: {
            development: {
                options: {
                    cwd: '',           // Directory of files to internationalize.
                    domainPath: '/languages',    // Where to save the POT file.
                    i18nToolsPath: '/Users/ze/Projects/Repos/i18n\ tools/', // Path to the i18n tools directory.
                    mainFile: 'style.css',      // Main project file.
                    potFilename: 'the-outlands.pot',   // Name of the POT file.
                    type: 'wp-theme'  // Type of project (wp-plugin or wp-theme).
                }
            }
        },

        // Watch settings
        watch: {
            css: {
                files: ['css/less/*.less'],
                tasks: ['less:style', 'cssmin'],
            readme: {
                files: ['readme.txt'],
                tasks: ['wp_readme_to_markdown:development'],
            }
          }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wp-readme-to-markdown');
    grunt.loadNpmTasks('grunt-wp-i18n');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['less', 'cssmin', 'wp_readme_to_markdown', 'makepot']);

};