import { ElementArrayFinder, promise, ElementFinder } from "protractor/built";

export abstract class ItemList<TItem, TList extends ItemList<TItem, TList>> {
    constructor(public items: ElementArrayFinder) {}
    
    get(index: number) {
        return this.wrap(this.items.get(index));
    }

    filter(predicate: (item: TItem, index: number) => promise.Promise<boolean> | boolean) {
        const matches = this.items.filter((item, idx) => {
            const wrapper = this.wrap(item);
            return predicate(wrapper, idx);
        });
        return this.create(matches);
    }

    first() {
        return this.get(0);
    }

    find(predicate: (item: TItem, index: number) => promise.Promise<boolean> | boolean) {
        return this.filter(predicate).first();
    }

    protected abstract create(items: ElementArrayFinder): TList;
    protected abstract wrap(item: ElementFinder): TItem;
}