import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '../../models/category';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
    @Input() sortAlphabetically = false;
    @Input() category: Category | undefined;

    specialCategory = 'Construction ou acquisition de bâtiment';

    constructor() { }

    public get hasCategoryGroup(): boolean {
        return !!this.category?.group;
    }

    public get categoryGroupColor(): string {
        return this.category?.group?.color ?? '';
    }

    public get categoryGroupName(): string {
        return this.category?.group?.name ?? '';
    }
}
