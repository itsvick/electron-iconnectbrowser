import { Component, OnInit, Input, Optional, Self, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, NgControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-input-styled-dropdown',
  templateUrl: './input-styled-dropdown.component.html',
  styleUrls: ['./input-styled-dropdown.component.scss']
})
export class InputStyledDropdownComponent extends AbstractBaseComponent implements OnInit {
  @Input() required: boolean;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() items = new BehaviorSubject<any[]>(null);
  @Input() displayPrefixKey?: string;
  @Input() displayMainKey: string;
  @Input() displaySuffixKey?: string;
  @Input() type: 'search' | 'select';
  @Input() valueType: 'model' | 'value' = 'model';
  @Input() initialValue: boolean = false;
  @Input() isValid: boolean = true;
  @Input() disabled: boolean = false;
  @Input() reset = new BehaviorSubject<any>(null);
  @Input() autocompleteWidth: number = 436;

  @Output() searchPhraseChanged = new EventEmitter<string>();
  @Output() valueSelected = new EventEmitter<any>();

  searchControl = new FormControl();
  lastSelectedItem: any;
  open: boolean;
  dirty: boolean;
  dontSearchOnNextValue = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get hasItems() {
    return this.items.getValue() && this.items.getValue().length > 0;
  }

  get shouldDisplayItems() {
    return this.hasItems && this.showContent;
  }

  get control() {
    return this.ngControl.control;
  }

  ngOnInit() {
    if (this.reset) {
      this.reset.subscribe((clear) => {
        if (clear) {
          this.clearSearch();
        }
      });
    }
    this.load();
  }

  load() {
    if (!this.placeholder) {
      this.placeholder = `Select a ${this.title ? this.title : '...'}`;
    }

    if (this.control && this.control.value && this.items) {
      const ar = this.items.getValue();

      if (this.valueType === 'model') {
        this.searchControl.setValue(this.control.value[this.displayMainKey]);
        if (ar && ar.length > 0) {
          this.lastSelectedItem = ar.find((a) => a[this.displayMainKey] === this.control.value[this.displayMainKey]);
          if (!this.lastSelectedItem) {
            this.lastSelectedItem = this.control.value;
          }
        }
      } else {
        this.searchControl.setValue(this.control.value);
        if (ar && ar.length > 0) {
          this.lastSelectedItem = ar.find((a) => a[this.displayMainKey] === this.control.value);
        }
      }

      if (!this.lastSelectedItem) {
        this.lastSelectedItem = this.control.value;
      }
    }

    this.searchControl.valueChanges.subscribe(() => {
      this.open = true;
      this.isLoading = true;
    });

    this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((text: string) => {
      if (!this.dontSearchOnNextValue) {
        this.control.setValue(null);
        this.searchPhraseChanged.emit(text === '' ? null : text);
      } else {
        this.dontSearchOnNextValue = false;
      }
    });

    this.items.subscribe((newValue) => {
      if (!newValue) {
        this.hasData = false;
      } else {
        this.hasData = true;
        this.showContent = true;
      }
    });
  }

  testOnBlur(event) {
    // this check if blur event is on a selectable item (unfortunatly this can be other selects aswell)
    if (event && event.relatedTarget && event.relatedTarget.innerText) {
      const row = this.items.getValue().find((r) => r.name === event.relatedTarget.innerText);
      // this checks if the item selected is in the list (if not, just unfocus and close the dropdown)
      if (row) {
        this.onSelected(row);
      } else {
        if (event.relatedTarget.innerText === 'Clear selection') {
          this.clearSearch();
        }
        this.open = false;
      }
    } else {
      this.open = false;
    }
  }

  onSelected(row: any) {
    this.lastSelectedItem = row;
    if (this.type === 'select') {
      this.searchControl.setValue(row[this.displayMainKey]);
    }
    if (this.valueType === 'model') {
      this.control.setValue(row);
    } else {
      this.control.setValue(row[this.displayMainKey]);
    }

    this.dontSearchOnNextValue = true;
    this.valueSelected.emit(row);
    this.open = false;
  }

  openSelection() {
    if (!this.disabled) {
      this.open = !this.open;
      this.control.markAsTouched();
    }
  }

  clearSearch() {
    this.searchControl.setValue(null, { emitEvent: false });
    this.control.setValue(null);
    this.open = false;
    this.lastSelectedItem = null;
    this.searchPhraseChanged.emit(null);
  }

  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
  setDisabledState?(): void {}
}
