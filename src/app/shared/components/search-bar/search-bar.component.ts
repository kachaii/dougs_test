import {
    Component, EventEmitter, Input, Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
    search = new FormControl();
    @Input() placeholder = 'Recherche';

    @Output() searchEvent = new EventEmitter<string>();

    constructor() {
        this.search.valueChanges.subscribe((value) => this.searchEvent.emit(value));
    }
}
