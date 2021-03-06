// How we should do it?

// I would say we should do the exercise in two ways. 
// 1. First we should write tests by having everything in the spec file such as the logic required 
//     to interact the angular template or use of protractor specific vocabularies(by.binding, by.model... etc)
//     to locate elements. 

// 2. Then we should create the page object for this test file and move the required logic to interact with
//     Angular template, into it. In this case our spec file will only have the assertion (expect) statements 
//     in the end.

// The minimum scenario we could cover for exercise 2, are as:

// 1. Count the number of users by using the locator element.all(...) 
// 2. Count the number of users by using a by.repeater(...)
// 3. Find Chuck Norris email address in the first row
// 4. Find the email address for John Rambo
// 5. Get the Email columns information

import { browser, element, by, ElementFinder } from "protractor/built";

describe("Exercise 2 - ", () => {
    beforeAll(() => {
        browser.get('http://localhost:9000/#/exercise2');
    });

    it('can count users using `element.all`', () => {
        const count = element.all(by.css('tbody > tr')).count();
        expect(count).toBeGreaterThan(0);
    });

    it('can count users using `by.repeater`', () => {
        const count = element.all(by.repeater('row in ctrl.userList')).count();
        expect(count).toBeGreaterThan(0);
    });

    it('can find email address in first row', () => {
        const firstRowEmail = element.all(by.repeater('row in ctrl.userList'))
            .get(0)
            .element(by.binding('row.email'));

        expect(firstRowEmail.getText()).toBe('chuck@gmail.com');
    });

    it('can find email address for "John Rambo"', async () => {
        const ramboRow = await element.all(by.repeater('row in ctrl.userList'))
            .filter(row => {
                return row.element(by.binding('row.name')).getText().then(name => name === 'John Rambo')
            })
            .map(row => row.element(by.binding('row.email')).getText());
        expect(ramboRow[0]).toBe('rambo@gmail.com');
    });

});