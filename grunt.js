'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: '<json:bower.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'src/modules/**/*.js'
        ],
        dest: 'dist/dangle.donut.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/dangle.donut.min.js'
      }
    },
    lint: {
      files: [
        'grunt.js', 
        '<config:concat.dist.dest>', 
        'src/**/*.js'
      ]
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        globalstrict: true
      },
      globals: {
        exports: true,
        module: false
      }
    },
    uglify: {
      codegen: {
        ascii_only: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat min');

};
