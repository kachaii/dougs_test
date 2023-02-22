import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, Output, HostListener,
} from '@angular/core';
import { GroupCategory } from '../../models/group-category';
import { Category } from '../../models/category';
import { FilterSortType } from '../../models/filterSortType';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
    @Output() categorySelected = new EventEmitter<Category | undefined>();

    @Input() categorySort: FilterSortType;

    @Input() categories: Category[] = [];

    @Input() categoryGroups: GroupCategory[] = [];

    selectedCategory: Category;

    onCategorySelected(category: Category): void {
        this.selectedCategory = category;
        this.categorySelected.emit(category);
    }
    getCategoriesForGroup(group: GroupCategory): Category[] {
        return this.categories.filter((category) => category.group && category.group.id === group.id);
    }

    get isAlphabeticalSort(): boolean {
        return this.categorySort === FilterSortType.ALPHABETICAL_ORDER;
    }

    trackByGroup(group: GroupCategory): number {
        return group.id;
    }

    trackByCategory(category: Category): number {
        return category.id;
    }
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        const clickedElement = event.target as HTMLElement;
        const isInsideCategoryList = clickedElement.closest('.category-list') !== null;
        if (!isInsideCategoryList) {
            const activeElements = Array.from(document.querySelectorAll('.active'));
            activeElements.forEach((element) => {
                element.classList.remove('active');
            });
            this.categorySelected.emit(undefined);
        }
    }
}
