import { ElementArrayFinder, promise, ElementFinder } from "protractor/built";

type ItemListType<TList> = new(items: ElementArrayFinder) => TList;

export abstract class ItemList<T> {
    private type: ItemListType<ItemList<T>>;
    constructor(public items: ElementArrayFinder) {
        this.type = Object.getPrototypeOf(this).constructor;
    }
    
    get(index: number) {
        return this.wrap(this.items.get(index));
    }

    filter(predicate: (item: T, index: number) => promise.Promise<boolean> | boolean) {
        const matches = this.items.filter((item, idx) => {
            const wrapper = this.wrap(item);
            return predicate(wrapper, idx);
        });
        return this.create(matches);
    }

    first() {
        return this.get(0);
    }

    find(predicate: (item: T, index: number) => promise.Promise<boolean> | boolean) {
        return this.filter(predicate).first();
    }

    protected create(items: ElementArrayFinder): ItemList<T> {
        return new this.type(items);
    }
    protected abstract wrap(item: ElementFinder): T;
}