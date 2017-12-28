'use strict';

const fs = require('fs');

module.exports = {
    highlight: function (elem) {
        browser.executeScript('arguments[0].style.backgroundColor = "#00ff00"' , elem);
    },

    createScreenshot: function () {
        return new Promise((resolve, reject)=>{
            browser.takeScreenshot().then((screen)=>{
                let date = new Date().toLocaleString("en").replace(/[/:\s,]/g, '');
                let path = './screenshot/' + date + '.png';
                fs.writeFile(path, screen, 'base64', function(err) {
                    if(err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        });
    },

    createDir: function (path) {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }

    },

    extendsFields: function(Class, BaseClass){
        let obj = new BaseClass();

        for(let key in obj){
            Class[key] = obj[key];
        }
    }

};