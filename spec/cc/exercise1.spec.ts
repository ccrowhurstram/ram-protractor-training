// How we should do it?

// I would say we should do the exercise in two ways. 
// 1. First we should write tests by having everything in the spec file such as the logic required 
//     to interact the angular template or use of protractor specific vocabularies(by.binding, by.model... etc)
//     to locate elements. 

// 2. Then we should create the page object for this test file and move the required logic to interact with
//     Angular template, into it. In this case our spec file will only have the assertion (expect) statements 
//     in the end.

// The minimum scenarios we could cover for exercise 1, are as:

// 1. Find a specific element by different locators e.g. by.binding, by.css, by.model etc. and check whether 
//     that element is present on the screen.
// 2. Get the input element and replace it existing value with the new value. Test whether the new value 
//      replaced the existing one. 
// 3. Replace the name, email address or phone no and then hit the save button. Test whether it updates 
//      the contact info detail.
// 4. Validates the email address.

import { browser, element, by } from "protractor";

describe("Exercise 1 - ", () => {

    beforeAll(() => {
        browser.get(browser.baseUrl);
    });

    describe("when user open the contact info form - ", () => {
        beforeAll(() => {
            browser.get('http://localhost:9000/#/exercise1');
        });

        it('should display contact name', () => {
            expect(element(by.binding('ctrl.displayUser.name')).getText()).toBe('Bruce Lee');
        });

        it('should display contact email', () => {
            expect(element(by.binding('ctrl.displayUser.email')).getText()).toBe('bruce.lee@google.com');
        });

        it('should display contact phone', () => {
            expect(element(by.binding('ctrl.displayUser.phone')).getText()).toBe('212 555-1234');
        });

        it('should support contact name update', () => {
            expect(element(by.model('ctrl.user.name')).isPresent()).toBe(true);
        });

        it('should support contact email update', () => {
            expect(element(by.id('email')).isPresent()).toBe(true);
        });

        it('should support contact phone update', () => {
            expect(element.all(by.tagName('input')).get(2).isPresent()).toBe(true);
        });

        it('should support form submission', () => {
            expect(element(by.css('button.waves-effect')).isPresent()).toBe(true);
        });
    });

    describe("when update the contact info detail - ", () => {
        beforeEach(() => {
            browser.get('http://localhost:9000/#/exercise1');
        });

        it('should redisplay change to name when submitted', () => {
            // when
            const input = element(by.model('ctrl.user.name'));
            input.clear();
            input.sendKeys('Christian Crowhurst');

            const submitBtn = element(by.css('button.waves-effect'));
            submitBtn.click();

            // then
            expect(element(by.binding('ctrl.displayUser.name')).getText()).toBe('Christian Crowhurst');
        });

        it('should redisplay change to phone when submitted', () => {
            // when
            const input = element(by.model('ctrl.user.phone'));
            input.clear();
            input.sendKeys('4575157');

            const submitBtn = element(by.css('button.waves-effect'));
            submitBtn.click();

            // then
            expect(element(by.binding('ctrl.displayUser.phone')).getText()).toBe('4575157');
        });
    });

    describe("validate email address - ", () => {
        beforeEach(() => {
            browser.get('http://localhost:9000/#/exercise1');
        });
        
        it('when valid should not show validation error', () => {
            // whne
            const input = element(by.model('ctrl.user.email'));
            input.clear();
            input.sendKeys('c.c@gmail.com');

            // then
            
        });
        
        it('when invalid should show validation error', () => {
            // whne
            const input = element(by.model('ctrl.user.email'));
            input.clear();
            input.sendKeys('c.c');

            // then  
            const errorMsg = input.element(by.xpath('following-sibling::span'));
            expect(errorMsg.isPresent()).toBe(true);
        });
    });
});