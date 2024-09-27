/**Core */
import { Component, inject } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**Models */
import { ApiResponse } from '@core/models/api-response.model';

/**Services */
import { StringValueService } from '@features/services/string-value.service';

@Component({
  selector: 'app-string-value',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './string-value.component.html',
  styleUrl: './string-value.component.scss'
})

export default class StringValueComponent {

  /**Variables */
  form!: FormGroup;
  output!: ApiResponse;
  loading: boolean = false;

  /**Injects */
  private formBuilder = inject(FormBuilder);
  private stringValueService = inject(StringValueService);

  /**Lifecycle */
  ngOnInit(): void {
    this.buildForm();
  }

  /**Build form */
  private buildForm() {
    this.form = this.formBuilder.group({
      input: ['', [Validators.required]],
    });
  }

  /**Actions */
  public solve() {
    if (this.form.valid) {
      this.getMaxValueService(this.form.value.input);
    }
    this.form.markAllAsTouched();
  }

  /**API REST Services */
  private getMaxValueService(input: string) {
    this.loading = true;
    this.stringValueService.getMaxValue(input).subscribe({
      next: (response: ApiResponse) => {
        this.loading = false;
        this.output = response;
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }
}
