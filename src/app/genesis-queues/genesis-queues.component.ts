import { Component } from '@angular/core';

@Component({
  selector: 'app-genesis-queues',
  templateUrl: './genesis-queues.component.html',
  styleUrls: ['./genesis-queues.component.scss']
})
export class GenesisQueuesComponent {

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

  chosenLevel: string = "select menu";

  SET_NAME_SELECTED: any[] = [];
  nameItem: any;
  levelSelect:boolean = false;

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

  nameItemSelected(event: any){

    if (this.SET_NAME_SELECTED.indexOf(event.target.value) === -1) {
      this.SET_NAME_SELECTED.push(event.target.value);
    }
    else {
      this.SET_NAME_SELECTED.splice(this.SET_NAME_SELECTED.indexOf(event.target.value), 1);
    } 
 
  }
}
