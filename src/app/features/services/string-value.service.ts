import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '@core/models/api-response.model';
import { environment } from '@envs/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StringValueService {

  /**Variables */
  private readonly URL = `${environment.api}`;

  /**Constructor */
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  /**Services */
  public getMaxValue(input: string): Observable<ApiResponse> {
    let params = new HttpParams();
    params = params.append('input', input);
    return this.http.get<ApiResponse>(`${this.URL}/problem-2`, { params });
  }

}
