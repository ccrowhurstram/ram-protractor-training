import { browser, element, by, ElementFinder, promise } from "protractor";
import { Locator } from "protractor/built/locators";

export interface InputElementFinder<T> extends ElementFinder {
    getValue(): promise.Promise<string>;
    setValue(arg: T): promise.Promise<void>;
    validationElem: ElementFinder;
}

export function inputElement<T>(locator: Locator): InputElementFinder<T> {
    let elem = element(locator) as any as InputElementFinder<T>;
    elem.setValue = setValue;
    elem.getValue = getValue;
    elem.validationElem = elem.element(by.xpath('following-sibling::span'));

    return elem;

    function getValue() {
        return elem.getAttribute('value');
    }

    function setValue(arg: T) {
        let val: string;
        if (typeof arg === 'number') {
            val = arg.toString();
        } else {
            val = (arg || '').toString();
        }

        elem.clear();
        return elem.sendKeys(val);
    }
}