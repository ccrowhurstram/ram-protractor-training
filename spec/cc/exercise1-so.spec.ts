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

import { ContactDetailScreen } from "./exercise1-screen";

describe("Exercise 1 - ", () => {

    let screen: ContactDetailScreen;
    beforeAll(() => {
        screen = new ContactDetailScreen();
        screen.open();
    });

    describe("when user open the contact info form - ", () => {

        it('should display contact name', () => {
            expect(screen.name.getText()).toBe('Bruce Lee');
        });

        it('should display contact email', () => {
            expect(screen.email.getText()).toBe('bruce.lee@google.com');
        });

        it('should display contact phone', () => {
            expect(screen.phone.getText()).toBe('212 555-1234');
        });

        it('should support contact name update', () => {
            expect(screen.nameInput.isPresent()).toBe(true);
        });

        it('should support contact email update', () => {
            expect(screen.emailInput.isPresent()).toBe(true);
        });

        it('should support contact phone update', () => {
            expect(screen.phoneInput.isPresent()).toBe(true);
        });

        it('should support form submission', () => {
            expect(screen.submit.isPresent()).toBe(true);
        });
    });

    describe("when update the contact info detail - ", () => {

        it('should redisplay change to name when submitted', () => {
            // when
            screen.nameInput.setValue('Christian Crowhurst');
            screen.submit.click();

            // then
            expect(screen.name.getText()).toBe('Christian Crowhurst');
        });

        it('should redisplay change to phone when submitted', () => {
            // when
            screen.phoneInput.setValue('4575157');
            screen.submit.click();

            // then
            expect(screen.phone.getText()).toBe('4575157');
        });
    });

    describe("validate email address - ", () => {

        it('when valid should not show validation error', () => {
            screen.emailInput.setValue('c.c@gmail.com');
            expect(screen.emailInput.validationElem.isDisplayed()).toBe(false);
        });

        it('when invalid should show validation error', () => {
            screen.emailInput.setValue('c.c');
            expect(screen.emailInput.validationElem.isDisplayed()).toBe(true);
        });
    });
});