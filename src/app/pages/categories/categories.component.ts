import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ALL_CATEGORIES } from 'src/assets/constantes';
import { CategoryService } from './services/categories.service';
import { FilterSortType } from './models/filterSortType';
import { GroupCategory } from './models/group-category';
import { Category } from './models/category';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})

export class CategoriesComponent implements OnInit, OnDestroy {
    private searchCategorySubscription = new Subscription();
    private categoriesStateSubscription = new Subscription();

    categories: Category[] = [];
    categoryGroups: GroupCategory[] = [];

    searchByCategory = new FormControl('');
    selectedCategory: Category | undefined;
    filterSortType: FilterSortType;

    filters = [
        { type: FilterSortType.CATEGORY, label: 'Catégories', isSelected: true },
        { type: FilterSortType.ALPHABETICAL_ORDER, label: 'Ordre alphabétique', isSelected: false },
    ];
    selectedOption = ALL_CATEGORIES.name;

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoriesStateSubscription = this.categoryService.categoriesFiltered$
            .subscribe((categories: Category[]) => {
                this.categories = [...categories];
                this.initCategoryGroups();
            });

        this.searchCategorySubscription = this.searchByCategory.valueChanges.subscribe((value: string) => {
            this.categoryService.emitSearchCategoryFilter(value);
        });
    }

    filterCategoryByType(filter: FilterSortType): void {
        this.filterSortType = filter;
        this.filters.forEach((item) => {
            item.isSelected = item.type === filter;
        });
        this.categoryService.emitFilterBySortType(filter);
    }

    setGroupCategoryFilter(groupCategoryId: number, groupCategoryName: string) {
        this.selectedOption = groupCategoryName;
        console.log(this.selectedOption);
        console.log(groupCategoryId);
        this.categoryService.emitGroupCategoryFilter(groupCategoryId);
    }

    initCategoryGroups(): void {
        this.categoryGroups = this.categories
            .filter((category) => category.group)
            .map((category) => category.group)
            .reduce((uniqueGroups, group) => {
                if (!uniqueGroups.some((existingGroup) => existingGroup.id === group.id)) {
                    uniqueGroups.push(group);
                }
                return uniqueGroups;
            }, [ALL_CATEGORIES]);
    }

    endOfDemonstration() {
        alert(`Vous avez sélectionné la catégorie suivante : ${this.selectedCategory?.wording}`);
    }

    ngOnDestroy() {
        this.searchCategorySubscription.unsubscribe();
        this.categoriesStateSubscription.unsubscribe();
    }
}
