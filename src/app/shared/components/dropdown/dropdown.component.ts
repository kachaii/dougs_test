import {
    Component, Input, Output, EventEmitter, HostListener,
} from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})

export class DropdownComponent {
    @Input() items: string[];
    @Input() label: string;
    @Input() selectedItem: string;
    @Output() itemSelected = new EventEmitter<string>();
    @HostListener('document:click', ['$event'])

    onDocumentClick(event: MouseEvent) {
        const dropdown = document.getElementById('dropdown');
        if (dropdown && !dropdown.contains(event.target as Node)) {
            this.closeDropdown();
        }
    }

    isOpen = false;

    toggleOpen() {
        this.isOpen = !this.isOpen;
    }
    closeDropdown() {
        this.isOpen = false;
    }

    selectItem(item: string) {
        this.itemSelected.emit(item);
        this.selectedItem = item;
        this.isOpen = false;
    }
}
