import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {
  @Input() icon;
  @Input() items: any[];
  @Input() key: string;
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() color: 'orange' | 'green' | 'blue' | 'primary' | 'accent' = 'primary';
  @Input() placeholder = 'Select an Item...';
  @Input() over = false;
  @Input() close = new BehaviorSubject(null);
  @Input() selectedIds: number[];
  @Input() outline = false;

  @Output() stateChanged = new EventEmitter<boolean>();
  @Output() selected = new EventEmitter<any[]>();

  selection: SelectionModel<any>;

  constructor() {
  }

  open = false;

  get displayText(): string {
    if (this.selection && !this.selection.isEmpty()) {
      return this.selection.isMultipleSelection() && this.selection.selected.length > 1 ?
        `${ this.selection.selected[0][this.key] }, etc.`
        : this.selection.selected[0][this.key];
    } else {
      return this.placeholder;
    }
  }

  get hasIcon(): boolean {
    return !!this.icon;
  }

  ngOnInit(): void {
    this.close.subscribe(() => {
      this.open = false;
    });

    if (this.type === 'single') {
      this.selection = new SelectionModel<any>(false);
    } else {
      this.selection = new SelectionModel<any>(true);
    }

    if (this.selectedIds && this.selectedIds.length > 0 && this.items && this.items.length > 0) {
      this.selection.select(this.items.map(i => this.selectedIds.find(s => i.id === s)));
    }
  }

  /** Whether the number of selected items matches the total number of items. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.items.length;
    return numSelected === numRows;
  }

  /** Selects all items if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.items.forEach(row => this.selection.select(row));
  }

  openSelection(): void {
    this.open = !this.open;
    this.stateChanged.emit(this.open);
  }

  onSelect(item): void {
    if (this.selection.isMultipleSelection()) {
      // If the id is set to null, select all items
      !item.id ? this.masterToggle() : this.selection.toggle(item);
    } else {
      this.selection.select(item);
      this.open = false;
    }

    this.selected.emit(this.selection.selected);
  }
}
