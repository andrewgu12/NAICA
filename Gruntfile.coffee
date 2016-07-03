module.exports = (grunt) ->
  grunt.initConfig
    sass:
      dist:
        options:
          style: 'expanded'
          sourcemap: 'none'
        files:
            'public/stylesheets/library.css' : 'public/sass/library.scss'
    watch:
      styles:
        files: 'public/sass/*.scss'
        tasks: ['sass']

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.registerTask 'default', ['watch']
