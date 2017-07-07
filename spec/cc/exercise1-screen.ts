import { element, by, browser } from "protractor/built";
import { inputElement } from "./screens/input-element";

export class ContactDetailScreen {
    email = element(by.binding('ctrl.displayUser.email'));
    emailInput = inputElement(by.model('ctrl.user.email'));
    name = element(by.binding('ctrl.displayUser.name'));
    nameInput = inputElement(by.model('ctrl.user.name'));
    phone = element(by.binding('ctrl.displayUser.phone'));
    phoneInput = inputElement(by.model('ctrl.user.phone'));
    submit = element(by.css('button.waves-effect'));
    open() {
        return browser.get('http://localhost:9000/#/exercise1');
    }
}
