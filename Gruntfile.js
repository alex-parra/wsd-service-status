'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Tasks
    sass: {
      dist: {
        options: {
          sourceMap: true,
        },
        files: [
          {
            expand: true,
            cwd: 'src/scss',
            src: ['**/*.scss'],
            dest: 'public/css',
            ext: '.css',
          },
        ],
      },
    },

    postcss: {
      options: {
        map: false,
        processors: [require('autoprefixer')()],
      },
      dist: {
        src: 'public/css/style.css',
      },
    },

    cssmin: {
      options: {
        sourceMap: true,
      },
      target: {
        files: [
          {
            expand: true,
            cwd: 'public/css',
            src: ['*.css', '!*.min.css'],
            dest: 'public/css',
            ext: '.min.css',
          },
        ],
      },
    },

    uglify: {
      build: {
        src: ['src/js/*.js'],
        dest: 'public/js/script.min.js',
      },
    },

    watch: {
      css: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass', 'postcss', 'cssmin'],
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['uglify'],
      },
    },
  });

  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};
