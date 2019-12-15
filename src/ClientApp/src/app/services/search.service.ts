import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private search: BehaviorSubject<string>;
  public currentSearch: Observable<string>;
  constructor() {
    this.search = new BehaviorSubject<string>(null);
    this.currentSearch = this.search.asObservable();
   }
   public get searchValue(): string{
     return this.search.value;
   }

   public change(message){
    this.search.next(message);
   }

}
