import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

export interface SetItems {
  level: string;
  name: string[];
  nameQueue: string;
  queue: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GenesysService {

  constructor() {
    this.SELECTED_OBJECTS = {
      level: "",
      name: [],
      nameQueue: "",
      queue: []
    }
  }

   //-------------observable-----------//
   private SELECTED_OBJECTS: SetItems;
   private selectedObjects$: Subject<SetItems> = new Subject()
 
   addItem(item: SetItems){
    
      this.SELECTED_OBJECTS = item
      this.selectedObjects$.next(this.SELECTED_OBJECTS);
      //this.selectedObjects$.
   }
 
   getItems$(): Observable<any>{
     return this.selectedObjects$.asObservable();    
   }
 
    //-------------end observable-----------//
}
