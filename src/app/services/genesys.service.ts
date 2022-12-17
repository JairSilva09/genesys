import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { DATA,DATA_QUEUE } from './mock-data';

export interface SetItems { 
  name: string,
  active: boolean,
  email: string,
  queues: string,
  skill:  string,
  license: string
}

@Injectable({
  providedIn: 'root'
})
export class GenesysService {

  public SELECTED_OBJECTS: any = {
    "predefineGruopName": "No group",
   "data": {}
  };
  private selectedObjects$: Subject<any> = new Subject()

  constructor() {}

   //-------------observable-----------//  
   private shortlist$: Subject<any[]> = new Subject()
   //-------modal--------//
   private shortlistqueues$: Subject<any[]> = new Subject()
 
  addItem(item: any){    
    this.SELECTED_OBJECTS = item
    this.selectedObjects$.next(this.SELECTED_OBJECTS);
  }

  getPredefinedGroup$(): Observable<any>{    
    return this.selectedObjects$.asObservable();  
  }

  getPredefinedGroup(): Observable<any>{ 
    const predefinedGroup = of(this.SELECTED_OBJECTS)   
    return predefinedGroup;  
  }
    
  search$(term: string){
    
    let list:any[] = [];
    let paginatedList:any[] = DATA.slice(1); 
      
    paginatedList.forEach((item: any) => {

      if(item.name.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.email.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.queues.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.license.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.skill.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.department.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.agent.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.manager.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.predefinedgroup.toLowerCase().indexOf(term.toLowerCase()) >= 0){
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
    this.shortlist$.next(list)
    
  }

  searchByLevelName$(terms: string[],column: string){
   
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

  //------------  modal ------------//

  getAllDataModal$(): Observable<any[]>{     
    const data_queue =  of(DATA_QUEUE)
    return data_queue;
  }

  getDataModal$(): Observable<any[]>{    
    return this.shortlistqueues$.asObservable(); 
  }

  getAllDataModal(): void{ 

    let list:any[] = [];
    list = list = DATA_QUEUE.slice(1);    
    
    this.shortlistqueues$.next(list) 
  }

  searchQueues$(term: string){
    
    let list:any[] = [];
    let paginatedList:any[] = DATA_QUEUE.slice(1); 
      
    paginatedList.forEach((item: any) => {

      if(item.queuename.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.queueid.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.calltype.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.language.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.provider.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.description.toLowerCase().indexOf(term.toLowerCase()) >= 0){
          list.push(item)
      }
       
    })

    this.shortlistqueues$.next(list)
    
  }

  searchByColumnQueue$(terms: string[],column: string){
      
    let list:any[] = [];   
    let paginatedList:any[] = DATA_QUEUE.slice(1);

    terms.forEach((a: any) => {

      paginatedList.forEach((item: any) => { 
        if(item[column.toLowerCase()] != undefined && item[column.toLowerCase()] != 0){        
          if(item[column.toLowerCase()].toLowerCase().indexOf(a.toLowerCase()) >= 0){
            list.push(item)
          }
        }
      })
    })

    this.shortlistqueues$.next(list)    
  }

  //------------ predefined groups data ------------//
  
  //-------------end observable-----------//
}
