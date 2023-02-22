import {
    Component, EventEmitter, Input, Output,
} from '@angular/core';
import { FilterSortType } from '../../models/filterSortType';

@Component({
    selector: 'app-category-filter',
    templateUrl: './category-filter.component.html',
    styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
    @Input() isSelected = false;
    @Input() type: FilterSortType = FilterSortType.CATEGORY;
    @Output() typeChanged = new EventEmitter<FilterSortType>();

    get label(): string {
        return this.type === FilterSortType.CATEGORY ? 'Groupe de catégorie' : 'Ordre alphabétique';
    }

    emitTypeChange(): void {
        this.typeChanged.emit(this.type);
    }
}
