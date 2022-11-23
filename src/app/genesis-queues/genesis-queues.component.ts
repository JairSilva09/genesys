import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-genesis-queues',
  templateUrl: './genesis-queues.component.html',
  styleUrls: ['./genesis-queues.component.scss']
})
export class GenesisQueuesComponent {

  @ViewChild('queues') queues!: MatListModule;

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

  selectedQueue(event: any,item: any){
    console.log(this.queues)

    if (this.SET_QUEUE_SELECTED.indexOf(item) === -1) {
      this.SET_QUEUE_SELECTED.push(item);
    }
    else {
      this.SET_QUEUE_SELECTED.splice(this.SET_QUEUE_SELECTED.indexOf(item), 1);
    }
    
    console.log(this.SET_QUEUE_SELECTED)

  }

  removeQueue(item: any){
    this.SET_QUEUE_SELECTED.splice(this.SET_QUEUE_SELECTED.indexOf(item), 1);
  }

  close_queue_list(){
    this.queueSelectList = false;
  }
}
