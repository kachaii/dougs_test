import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
    selector: '[appSelectedCategory]',
})
export class SelectedCategoryDirective {
    @Input() appSelectedCategory: boolean;
    @Input() isAlphaOrder: boolean;
    @Input() index: number;
    @Input() count: number;

    @HostBinding('class.item-alpha-order')
    get itemAlphaOrderClass() {
        return this.isAlphaOrder;
    }

    @HostBinding('class.last')
    get beforeLastClass() {
        const isOdd = this.count % 2 !== 0;
        const isLast = this.index === this.count;
        const isBeforeLast = this.index === this.count - 1;

        if (isOdd) {
            return isLast;
        }
        return isLast || isBeforeLast;
    }
    @HostBinding('class.active')
    get selectedCategoriesClass() {
        return this.appSelectedCategory;
    }

    constructor() { }
}

