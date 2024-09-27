/**Core */
import { RouterLink } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**Libraries */
import { ToastrService } from 'ngx-toastr';

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
    RouterLink,
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
  private toastrService = inject(ToastrService);
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
      let input: string = this.form.value.input;
      this.getMaxValueService(input.trim());
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
        this.toastrService.success('Successfully resolved', 'Success');
      },
      error: (error) => {
        this.output = error.error;
        this.loading = false;
        if (error.status === 400) {
          this.toastrService.error('Invalid input format', 'Error');
        } else {
          this.toastrService.error('Internal server error', 'Error');
        }
      }
    });
  }
}
