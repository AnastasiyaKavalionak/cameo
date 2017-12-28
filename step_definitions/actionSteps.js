'use strict';

const {defineSupportCode} = require('cucumber');
const path = require('path');
const world = require('../pages/world');
const query = require(path.resolve('./framework/helper/query'));
const state = require(path.resolve('./framework/helper/state'));
const Memory = require(path.resolve('./framework/helper/memory'));
const memory = new Memory(path.resolve('./config/' + 'creds.json'));

defineSupportCode(({Given, When, setDefaultTimeout}) =>{
    setDefaultTimeout(timeoutEveryStep);

    Given(/^I am on "(.*)" page$/, (page) => {
        state.setState(page);
        return browser.get(state.getUrl());
    });

    When(/^I click on "(.*)"$/, (button)=> {
        return query.getProtractorElement(button).click();
    });

    When(/^I wait browser title "(.*)"$/, (title)=> {
        return browser.wait(EC.titleIs(title), defTimeoutExplicit);
    });

    When(/^I type "(.*)" in "(.*)"$/, (text, element) => {
        // check if we have imported constant in Memory object
        let parsedText = (memory[text]) ? memory[text] : text;

        return query.getProtractorElement(element).sendKeys(parsedText);
    });

    When(/^I clear "(.*)"$/, (element) => {
        return query.getProtractorElement(element).clear();
    });

    When(/^I sleep "(.*)"$/, timeout => {
        return browser.sleep(+timeout * 1000);
    });

    When(/^I wait until element "(.*)" is (not )?visible$/, (element, isNot) => {
        if (isNot) {
            if(element === "Move To") { browser.pause()}
            return browser.wait(EC.invisibilityOf(query.getProtractorElement(element)), defTimeoutExplicit);
        } else {
            return browser.wait(EC.visibilityOf(query.getProtractorElement(element)), defTimeoutExplicit);
        }
    });

    When (/^I scroll to "(.*)"$/, (coordinate) => {
        return browser.executeScript(`window.scrollBy(0, ${coordinate})`);
    });

    When (/^I wait until element "(.*)" is (not )?clickable$/, (element, isNot) => {
        if (isNot) {
            return browser.wait(EC.not(EC.elementToBeClickable(query.getProtractorElement(element))), defTimeoutExplicit);
        } else {
            return browser.wait(EC.elementToBeClickable(query.getProtractorElement(element)), defTimeoutExplicit);
        }
    });
});
