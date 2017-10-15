const conf = require('./gulp.conf');

module.exports = function (config) {
  const configuration = {
    basePath: '../',
    singleRun: true,
    colors: true,
    autoWatch: false,
    logLevel: 'DEBUG',
    browserConsoleLogOptions: {
      terminal: true,
      level: ""
    },
    browsers: [
        /*'Chrome',*/
        'PhantomJS'
    ],
    frameworks: [
        'browserify',
        'jasmine'
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/karma-read-json/karma-read-json.js',
      conf.path.src('app.env.js'),
      conf.path.src('/app/components/*/*.js'),
      conf.path.src('../tests/unit/*.spec.js'),
      {pattern: 'src/mocks/*.data', included: false},
    ],
    preprocessors: {
        [conf.path.src('app.env.js')]: [
            'webpack'
        ],
        [conf.path.src('/app/components/*/*.js')]: [
            'webpack'
        ],
        [conf.path.src('../tests/unit/*.spec.js')]: [
            'webpack'
        ],
        [conf.path.src('**/*.html')]: [
            'ng-html2js'
        ],
        'app/components/*/*.js': ['babel'],
        'tests/unit/*.spec.js': ['babel'],
        'app/components/*/*.js': ['browserify'],
        'tests/unit/*.spec.js': ['browserify'],
    },
    babelPreprocessor: {
        options: {
            presets: ['es2015']
        }
    },
    browserify: {
        debug: true,
        "transform": [
            ["babelify", {
                "presets": ["es2015"],
                ignore: /node_modules/
            }]
        ]
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: `${conf.paths.src}/`
    },
    reporters: ['spec', 'coverage', 'junit', 'html'],
    coverageReporter: {
        type: 'html',
        dir: 'tests/unit/coverage/',
        subdir: '.'
    },
    htmlReporter: {
        outputFile: 'tests/unit/reports/index.html',
        pageTitle: 'Unit Tests',
        subPageTitle: 'XYZ',
        groupSuites: true,
        useCompactStyle: true,
        useLegacyStyle: true
    },
    webpack: require('./webpack-test.conf'),
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-htmlfile-reporter'),
      require('karma-junit-reporter'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-coverage'),
      require('karma-ng-html2js-preprocessor'),
      require('karma-webpack'),
      require('karma-babel-preprocessor'),
      require('karma-browserify')
    ]
  };

  config.set(configuration);
};
