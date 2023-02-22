import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    BehaviorSubject, combineLatest, Observable, Subject,
} from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Category } from '../models/category';
import { VisibleCategory } from '../models/visible-category';
import { environment } from '../../../../environments/environment';
import { FilterSortType } from '../models/filterSortType';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private readonly allCategoriesUrl = `${environment.apiUrl}all-categories`;
    private readonly visibleCategoriesUrl = `${environment.apiUrl}visible-categories`;

    private filterBySortType$ = new BehaviorSubject<FilterSortType>(FilterSortType.CATEGORY);
    private searchCategory$ = new BehaviorSubject<string>('');
    private groupCategoryFilter$ = new BehaviorSubject<number | undefined>(undefined);
    private allCategories$ = new BehaviorSubject<Category[]>([]);
    private visibleCategoriesSubject$ = new BehaviorSubject<VisibleCategory[]>([]);
    private destroy$ = new Subject<void>();

    categoriesFiltered$: Observable<Category[]> = combineLatest([
        this.allCategories$,
        this.visibleCategoriesSubject$,
        this.filterBySortType$,
        this.groupCategoryFilter$,
        this.searchCategory$,
    ]).pipe(
        takeUntil(this.destroy$),
        map(([allCategories, visibleCategories, filterSortType, groupCategoryFilter, searchCategory]) => {
            let filteredCategories = allCategories
                .filter((category) => visibleCategories.some((visibleCategory) => visibleCategory.id === category.id))
                .filter((category) => groupCategoryFilter === undefined || category.group?.id === groupCategoryFilter)
                .filter((category) => !searchCategory || category.wording.toLowerCase().includes(searchCategory.toLowerCase()));

            filteredCategories = CategoryService.sortCategories(filteredCategories, filterSortType);

            return filteredCategories;
        }),
    );

    constructor(private http: HttpClient) {
        this.fetchAllAndVisibleCategories();
    }

    emitSearchCategoryFilter(searchString: string): void {
        this.searchCategory$.next(searchString);
    }

    emitFilterBySortType(filterSortType: FilterSortType): void {
        this.filterBySortType$.next(filterSortType);
    }

    emitGroupCategoryFilter(groupCategoryId: number | undefined): void {
        this.groupCategoryFilter$.next(groupCategoryId);
    }

    private fetchAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.allCategoriesUrl);
    }

    private fetchVisibleCategories(): Observable<VisibleCategory[]> {
        return this.http.get<VisibleCategory[]>(this.visibleCategoriesUrl);
    }

    private fetchAllAndVisibleCategories(): void {
        const allCategories$ = this.fetchAllCategories();
        const visibleCategories$ = this.fetchVisibleCategories();

        combineLatest([allCategories$, visibleCategories$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([allCategories, visibleCategories]) => {
                this.allCategories$.next(allCategories);
                this.visibleCategoriesSubject$.next(visibleCategories);
            });
    }

    private static sortCategories(categories: Category[], filter: FilterSortType): Category[] {
        if (filter === FilterSortType.ALPHABETICAL_ORDER) {
            return categories.sort((a, b) => a.wording.localeCompare(b.wording));
        }
        return categories.sort((a, b) => a.group?.name?.localeCompare(b.group?.name) ?? -1);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
