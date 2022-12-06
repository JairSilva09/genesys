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
    let paginatedList:any[] = DATA.slice(1); 
      
    paginatedList.forEach((item: any) => {

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
    let paginatedList:any[] = DATA.slice(1);
    terms.forEach((a: any) => {
      paginatedList.forEach((item: any) => {

        if(item.skill.toLowerCase().indexOf(a.toLowerCase()) >= 0){
          list.push(item)
        }
       
      })
    })
    
    console.log(list)
    this.shortlist$.next(list)
    
  }

  searchByLevelName$(terms: string[],column: string,page: string){
      
    let list:any[] = [];   
    let paginatedList:any[] = DATA.slice(1);

    terms.forEach((a: any) => {

      paginatedList.forEach((item: any) => {   

        if(item[column.toLowerCase()].toLowerCase().indexOf(a.toLowerCase()) >= 0){
          list.push(item)
        }

      })

    })

    this.shortlist$.next(list)    
  }

  getAllDirectory$(page: string): Observable<any[]>{     
    const directory =  of(DATA)
    return directory;
  }

  getAllDirectory(): void{ 

    let list:any[] = [];
    list = list = DATA.slice(1);    
    
    this.shortlist$.next(list) 
  }

  getDirectory$(): Observable<any[]>{    
    return this.shortlist$.asObservable();  
  }
 
  // getItems$(): Observable<any>{
  //    return this.selectedObjects$.asObservable();    
  // }
 
    //-------------end observable-----------//
}
