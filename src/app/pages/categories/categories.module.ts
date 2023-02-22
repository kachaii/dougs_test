import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SelectedCategoryDirective } from './directives/selected-category/selected-category.directive';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';

@NgModule({
    declarations: [
        CategoriesComponent,
        CategoryFilterComponent,
        CategoryCardComponent,
        CategoryListComponent,
        SelectedCategoryDirective,
        SearchBarComponent,
        DropdownComponent,
    ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        BsDropdownModule,
        ReactiveFormsModule,
    ],
})
export class CategoriesModule {
}
