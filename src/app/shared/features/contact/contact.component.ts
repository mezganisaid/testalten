import { NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, InputTextModule, ButtonModule, InputTextareaModule, MessageModule, MessageModule],
  templateUrl: './contact.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactComponent {
  contactForm: FormGroup;
  submissionSuccess: boolean = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submissionSuccess = true;
      this.contactForm.reset();
    }
  }
}
