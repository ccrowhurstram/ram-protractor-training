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

import { ItemList } from "./screens/item-list";
import { UserListScreen, UserList } from "./exercise2-screen";


describe("Exercise 2 - ", () => {
    let screen: UserListScreen;
    beforeAll(() => {
        screen.open();
    });

    it('can count users using `by.repeater`', () => {
        expect(screen.userList.items.count()).toBeGreaterThan(0);
    });

    it('can find email address in first row', () => {
        expect(screen.userList.get(0).email.getText()).toBe('chuck@gmail.com');
    });

    it('can find email address for "John Rambo"', async () => {
        const ramboRow = screen.userList.find(UserList.where.nameEq('John Rambo'))
        expect(ramboRow.email.getText()).toBe('rambo@gmail.com');
    });

});