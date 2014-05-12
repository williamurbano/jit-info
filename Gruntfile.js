module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',

    clean: [
      'build/css',
      'build/js',
      'build/images',
      'build/vendor'
    ],

    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          "build/css/<%= pkg.name %>.css": "src/less/<%= pkg.name %>.less"
        }
      },

      production: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },

        files: {
          "build/css/<%= pkg.name %>.min.css": "src/less/<%= pkg.name %>.less"
        }
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        separator: '\n\n'
      },
      development: {
        src: [
        'src/js/<%= pkg.name %>.js'
        ],
        dest: 'build/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      production: {
        options: {
          compress: true,
          mangle: true
        },
        files: {
          'build/js/<%= pkg.name %>.min.js': ['build/js/<%= pkg.name %>.js']
        }
      }
    },

    copy: {
      production: {
        files: [
        {
          expand: true,
          cwd: 'src/vendor/',
          src: ['**'],
          dest: 'build/vendor/'
        },
        {
          expand: true,
          cwd: 'src/images',
          src: ['**'],
          dest: 'build/images'
        }
        ]
      }
    },

    watch: {
      less: {
        files: ['src/less/**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },

      js: {
        files: ['src/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          nospawn: true
        }
      },

      images: {
        files: ['src/images/**/*.*'],
        tasks: ['copy'],
        options: {
          nospawn: true
        }
      },

      vendor: {
        files: ['src/vendor/**/*.*'],
        tasks: ['copy'],
        options: {
          nospawn: true
        }
      }
    }
  });

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');

grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['clean', 'less', 'concat', 'uglify', 'copy']);

};