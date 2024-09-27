/**Core */
import { RouterLink } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**Libraries */
import { ToastrService } from 'ngx-toastr';

/**Models */
import { ApiResponse } from '@core/models/api-response.model';
import { ChessRequest } from '@core/models/chess-request.model';

/**Services */
import { ChessService } from '@features/services/chess.service';

@Component({
  selector: 'app-chess',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './chess.component.html',
  styleUrl: './chess.component.scss'
})
export default class ChessComponent {

  /**Variables */
  form!: FormGroup;
  output!: ApiResponse;
  loading: boolean = false;

  /**Injects */
  private formBuilder = inject(FormBuilder);
  private chessService = inject(ChessService);
  private toastrService = inject(ToastrService);

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
      let chessRequest: ChessRequest = this.parseData(input.trim());
      this.getSquaresQueenAttackService(chessRequest);
    }
    this.form.markAllAsTouched();
  }

  /**Utils */
  private parseData(input: string): ChessRequest {
    const lines = input.split('\n').map(line => line.trim());
    const [n, k] = lines[0].split(' ').map(Number);
    const [rq, cq] = lines[1].split(' ').map(Number);
    const obstacles = lines.slice(2).map(line => line.split(' ').map(Number));
    let chessRequest: ChessRequest = {
      n: n,
      k: k,
      rq: rq,
      cq: cq,
      obstacles: obstacles ? obstacles : []
    }
    return chessRequest;
  }

  /**API REST Services */
  private getSquaresQueenAttackService(chessRequest: ChessRequest) {
    this.loading = true;
    this.chessService.getSquaresQueenAttack(chessRequest).subscribe({
      next: (response: ApiResponse) => {
        this.loading = false;
        this.output = response;
        this.toastrService.success('Se revolvio con exito', 'Exito');
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
