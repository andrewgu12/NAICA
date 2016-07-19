module.exports = (grunt) ->
  grunt.initConfig
    sass:
      dist:
        options:
          style: 'expanded'
          sourcemap: 'none'
        files:
            'public/stylesheets/library.css' : 'public/sass/library.scss'
    coffee:
      compile:
        options: 
          bare: true
        files:
          'public/javascript/library.js' : 'public/coffeescript/*.coffee'
    uglify:
      options:
        mangle: false
        compress: false
      my_target:
        files:
          'public/javascript/app.min.js' : ['bower_components/jquery/dist/jquery.js', 'public/javascript/modernizr.js', 'bower_components/foundation-sites/dist/foundation.js','public/javascript/library.js']
    watch:
      styles:
        files: 'public/sass/*.scss'
        tasks: ['sass']
      coffee:
        files: 'public/coffeescript/*.coffee'
        tasks: ['coffee']
      uglify:
        files: 'public/javascript/library.js'
        tasks: ['uglify']

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.registerTask 'default', ['watch']
