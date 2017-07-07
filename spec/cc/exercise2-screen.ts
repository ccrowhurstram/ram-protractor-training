import { browser, element, by } from "protractor";
import { ElementArrayFinder, ElementFinder } from "protractor/built";
import { Locator } from "protractor/built/locators";
import { ItemList } from "./screens/item-list";

export class UserList extends ItemList<UserRow, UserList> {

    protected create(items: ElementArrayFinder) {
        return new UserList(items);
    }

    protected wrap(item: ElementFinder) {
        return new UserRow(item);
    }

    static byLocator(locator: string | Locator) {
        const loc = typeof locator === 'string' ? by.repeater(locator) : locator;
        return new UserList(element.all(locator));
    }

    static where = {
        nameEq: function(name: string) {
            return (user: UserRow) => user.name.getText().then(n => n === name);
        }
    };
}

export class UserRow {
    email = this.row.element(by.binding('row.email'));
    name = this.row.element(by.binding('row.name'));
    constructor(public row: ElementFinder) {}
}

export class UserListScreen {
    userList = UserList.byLocator('row in ctrl.userList');
    open() {
        browser.get('http://localhost:9000/#/exercise2');
    }
}