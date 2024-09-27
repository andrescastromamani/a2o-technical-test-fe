/**Core */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/**Models */
import { ApiResponse } from '@core/models/api-response.model';

/**Envs */
import { environment } from '@envs/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StringValueService {

  /**Variables */
  private readonly URL = `${environment.api}`;

  /**Constructor */
  constructor(
    private http: HttpClient,
  ) { }

  /**Services */
  public getMaxValue(input: string): Observable<ApiResponse> {
    let params = new HttpParams();
    params = params.append('input', input);
    return this.http.get<ApiResponse>(`${this.URL}/problem-2`, { params });
  }
}
