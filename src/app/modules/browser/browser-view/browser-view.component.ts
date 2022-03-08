import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-browser-view',
  templateUrl: './browser-view.component.html',
  styleUrls: ['./browser-view.component.scss']
})
export class BrowserViewComponent implements OnInit {

  form: FormGroup;
  url = '';
  customError: string;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      url: [null, [Validators.required]]
    });

    this.form.valueChanges.subscribe(() => {
      this.customError = null;
    });
  }

  visitUrl() {
    if(this.form.getRawValue().url && this.form.getRawValue().url.length < 1) {
      return;
    }

    let newUrl = this.form.getRawValue().url;
    if (!newUrl.startsWith("http://") || !newUrl.startsWith("https://")) {
      newUrl = `https://${newUrl}`; 
    }
    this.url = newUrl;
    
  }
}
