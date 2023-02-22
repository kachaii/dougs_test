import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCardComponent } from './category-card.component';

describe('ItemComponent', () => {
    let component: CategoryCardComponent;
    let fixture: ComponentFixture<CategoryCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryCardComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
