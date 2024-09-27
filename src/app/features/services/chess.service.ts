/**Core */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**Models */
import { ApiResponse } from '@core/models/api-response.model';
import { ChessRequest } from '@core/models/chess-request.model';

/**Envs */
import { environment } from '@envs/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChessService {

  /**Variables */
  private readonly URL = `${environment.api}`;

  /**Constructor */
  constructor(
    private http: HttpClient,
  ) { }

  /**Services */
  public getSquaresQueenAttack(chessRequest: ChessRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.URL}/problem-1`, chessRequest);
  }
}
