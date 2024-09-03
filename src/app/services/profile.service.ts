import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { cloneDeep } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  data: any;
  private dummyDataUrl: string = 'assets/data/data.json';
  private http = inject(HttpClient);

  fetchData(): Observable<any> {
    return this.http.get(this.dummyDataUrl)
      .pipe(
        tap(data => this.data = cloneDeep(data))
      )
  }
}