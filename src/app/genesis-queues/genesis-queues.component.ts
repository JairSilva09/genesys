import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-genesis-queues',
  templateUrl: './genesis-queues.component.html',
  styleUrls: ['./genesis-queues.component.scss']
})
export class GenesisQueuesComponent {

  @ViewChild('queues') queues!: MatListModule;
  @ViewChild('checkboxName') checkboxName!: MatListModule;

  LEVEL: any[] =[
    "Agent","Manager","Department","Predefined Groups"
  ]

  NAME: any[] =[];
  MANAGER: any[] =[
    "Manager 1","Manager 2","Manager 3","Manager 4","Manager 5","Manager 6"
  ];

  DEPARTMENT: any[] =[
    "AT&T","CenturyLink","Cable","Dish","Frontier","HughesNet"
  ];

  PREDEFINEDGROUP: any[] =[
    "ATT P1 Cooper Overflow","ATT P1 Fiber Overflow","Hughes Backup","Example Y","Example Z"
  ];

  AGENT: any[] =[
    "Agent 1","Agent 2","Agent 3","Agent 4","Agent 5","Agent 6"
  ]

  QUEUE: any[] = [
    "Call Types", "Language", "Provider", "Queue Name"
  ]

  QUEUES_LIST: any[] = [
    "Queue 1", "Queue 2", "Queue 3", "Queue 4","Queue 5","Queue 6"
  ]

  chosenLevel: string = "select menu";
  chosenQueue: string = "select menu";  

  SET_NAME_SELECTED: any[] = [];
  SET_QUEUE_SELECTED: any[] = [];

  nameItem: any;
  levelSelect:boolean = false;
  queueSelectList: boolean = false;

  //-------------observable-----------//
  private SELECTED_OBJECTS: any[] = [];
  private selectedObjects$: Subject<any[]> = new Subject<any[]>

  addItem(item: any){
    this.SELECTED_OBJECTS.push(item);
    this.selectedObjects$.next(this.SELECTED_OBJECTS);
  }

  getItems$(): Observable<any[]>{
    return this.selectedObjects$.asObservable();    
  }

   //-------------end observable-----------//



  selectLevel(event: any){
    if(event == "Agent"){
      this.NAME = this.AGENT;
    }

    if(event == "Manager"){
      this.NAME = this.MANAGER;
    }

    if(event == "Predefined Groups"){      
      this.NAME = this.PREDEFINEDGROUP;
    }

    if(event == "Department"){      
      this.NAME = this.DEPARTMENT;
    }

    this.levelSelect = true;

    this.addItem(this.NAME)
  }

  selectQueue(event: any){    
    this.queueSelectList = true;
  }

  nameItemSelected(event: any){  

    if (this.SET_NAME_SELECTED.indexOf(event.target.value) === -1) {
      this.SET_NAME_SELECTED.push(event.target.value);
    }
    else {
      this.SET_NAME_SELECTED.splice(this.SET_NAME_SELECTED.indexOf(event.target.value), 1);
    } 
 
  }

  remove_name_selected(item: any){
    this.SET_NAME_SELECTED.splice(this.SET_NAME_SELECTED.indexOf(item), 1);
  }

  chequedBoxName(item: any){
    if(this.SET_NAME_SELECTED.indexOf(item) === -1){
      return false      
    }else{
      return true
    }   
  }

  selectedQueue(event: any,item: any){    

    if (this.SET_QUEUE_SELECTED.indexOf(item) === -1) {
      this.SET_QUEUE_SELECTED.push(item);
    }
    else {
      this.SET_QUEUE_SELECTED.splice(this.SET_QUEUE_SELECTED.indexOf(item), 1);
    }

  }  

  removeQueue(item: any){
    this.SET_QUEUE_SELECTED.splice(this.SET_QUEUE_SELECTED.indexOf(item), 1);
  }

  chequedBoxQueue(item: any){
    if(this.SET_QUEUE_SELECTED.indexOf(item) === -1){
      return false      
    }else{
      return true
    }
  }

  close_queue_list(){
    this.queueSelectList = false;
  }
}
