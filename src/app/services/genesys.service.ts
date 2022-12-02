import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { DATA } from './mock-data';

export interface SetItems { 
  name: string,
  active: boolean,
  email: string,
  queues: string,
  skill:  string,
  license: string
}

// export interface SetItems {
//   level: string;
//   name: string[];
//   nameQueue: string;
//   queue: string[];
// }

@Injectable({
  providedIn: 'root'
})
export class GenesysService {

  constructor() {
    this.SELECTED_OBJECTS = {
      name: "",
      active: true,
      email: "",
      queues: "",
      skill:  "",
      license: ""
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

  getDirectory(): Observable<any[]>{
    const directory =  of(DATA)
    return directory;
  }
 
  getItems$(): Observable<any>{
     return this.selectedObjects$.asObservable();    
  }
 
    //-------------end observable-----------//
}
