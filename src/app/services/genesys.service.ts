import { ThisReceiver } from '@angular/compiler';
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
   private shortlist$: Subject<any[]> = new Subject()
 
 
  addItem(item: SetItems){
    
      this.SELECTED_OBJECTS = item
      this.selectedObjects$.next(this.SELECTED_OBJECTS);

  }

  search$(term: string){
    let list:any[] = [];   
      
    DATA.forEach((item: any) => {

      if(item.name.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.email.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.queues.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.license.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.skill.toLowerCase().indexOf(term.toLowerCase()) >= 0){
          list.push(item)
      }
       
    })

    this.shortlist$.next(list)
    
  }

  searchBySkill$(terms: string[]){
    let list:any[] = [];
    terms.forEach((a: any) => {
      DATA.forEach((item: any) => {

        if(item.skill.toLowerCase().indexOf(a.toLowerCase()) >= 0){
          list.push(item)
        }
       
      })
    })

    this.shortlist$.next(list)
    
  }

  getAllDirectory$(): Observable<any[]>{
    const directory =  of(DATA)
    return directory;
  }

  getDirectory$(): Observable<any[]>{    
    return this.shortlist$.asObservable();  
  }
 
  getItems$(): Observable<any>{
     return this.selectedObjects$.asObservable();    
  }
 
    //-------------end observable-----------//
}
