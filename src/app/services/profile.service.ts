import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private dummyDataUrl: string = 'assets/data/data.json';
  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  setData(data: any): void {
    this.dataSubject.next(data);
  }
  fetchData(): Observable<any> {
    return this.http.get(this.dummyDataUrl)
      .pipe(
        tap(data => this.setData(data))
      )
  }
}