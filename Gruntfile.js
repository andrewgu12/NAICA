module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'public/stylesheets/library.css': 'public/sass/library.scss'
        }
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: true
      },
      my_target: {
        files: {
          'public/javascript/app.min.js': ['bower_components/jquery/dist/jquery.js', 'public/javascript/modernizr.js', 'bower_components/foundation-sites/dist/foundation.js', 'public/javascript/library.js']
        }
      }
    },
    watch: {
      styles: {
        files: 'public/sass/*.scss',
        tasks: ['sass']
      },
      uglify: {
        files: 'public/javascript/library.js',
        tasks: ['uglify']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  return grunt.registerTask('default', ['watch']);
};
