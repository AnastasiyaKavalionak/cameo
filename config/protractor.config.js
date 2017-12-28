'use strict';

const path = require('path');
const commonUtils = require('../utils/common');


exports.config = {
    directConnect: true,
    baseUrl: 'https://vimeo.com/cameo',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--window-size=1680,1050', '--disable-notifications', '--disable-infobars'],
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'default_directory': path.resolve('./output'),
                }
            }
        },
        platform: "Windows 10",
        maxDuration: 10800
    },
    specs: [
        path.resolve('./features/**.feature')
    ],
    onPrepare: function () {
        commonUtils.createDir('./output');
        global.EC = protractor.ExpectedConditions;
        global.timeoutEveryStep = 100 * 1000;
        global.defTimeoutExplicit = 15000;
        browser.waitForAngularEnabled(true);
        browser.angularAppRoot('body');
    },
    cucumberOpts: {
        require: [path.resolve('./step_definitions/**.js')],
        format: ['json:output/log.json'],
        tags: ['']
    },
    allScriptsTimeout: 200000,
    getPageTimeout: 100000,
    framework: 'custom',
    rootElement: 'body',
    frameworkPath: require.resolve('protractor-cucumber-framework')
};
