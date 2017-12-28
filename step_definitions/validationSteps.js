"use strict";

const { defineSupportCode } = require('cucumber');
const fs = require('fs');
const path = require('path');
const world = require('../pages/world');
const query = require(path.resolve('./framework/helper/query'));
const state = require(path.resolve('./framework/helper/state'));
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;


defineSupportCode(({ Then, setDefaultTimeout }) => {
    setDefaultTimeout(timeoutEveryStep);

    Then(/^I should be on "(.*)" page$/, (page) => {
        state.setState(page);
        return expect(browser.getCurrentUrl()).to.eventually.contain(state.getUrl());
    });

    Then(/^"(.*)" element should be visible$/, (element) => {
        return expect(query.getProtractorElement(element).isPresent()).to.eventually.be.true;
    });

    Then(/^Text of element "(.*)" should (not )?contain "(.*)"$/, (element, isNot, value) => {
        if (isNot) {
            return expect(query.getProtractorElement(element).getText()).to.not.contain(value);
        } else {
            return expect(query.getProtractorElement(element).getText()).to.eventually.contain(value);
        }
    });

    Then (/^Element "(.*)" should (not )?be on screen after scrolling on "(.*)"$/, (element, isNot, top) => {
        let y, height;
        if (isNot) {
            return query.getProtractorElement(element).getLocation().then((res) => {
                y = res.y;
                return query.getProtractorElement(element).getSize().then((size) => {
                    height = size.height;
                });
            }).then(() => {
                return (y + height - top <= 0) || (y + height - top >= 1050);
            });
        } else {
            return query.getProtractorElement(element).getLocation().then((res) => {
                y = res.y;
                return query.getProtractorElement(element).getSize().then((size) => {
                    height = size.height;
                });
            }).then(() => {
                return (y + height - top > 0) || (y + height - top < 1050);
            });
        }
    });
});

