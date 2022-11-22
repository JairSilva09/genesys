import { Component } from '@angular/core';

@Component({
  selector: 'app-genesis-queues',
  templateUrl: './genesis-queues.component.html',
  styleUrls: ['./genesis-queues.component.scss']
})
export class GenesisQueuesComponent {

  OPTIONS_QUEUE = ["Call Types", "Language", "Provider", "Queue Name"]

  LEVEL: any[] =[
    "Agent","Manager","Department","Predefined Groups"
  ]

  name: any[] =[];
  manager: any[] =[
    "Manager 1","Manager 2","Manager 3","Manager 4","Manager 5","Manager 6"
  ];

  department: any[] =[
    "AT&T","CenturyLink","Cable","Dish","Frontier","HughesNet"
  ];

  predefinedGroup: any[] =[
    "ATT P1 Cooper Overflow","ATT P1 Fiber Overflow","Hughes Backup","Example Y","Example Z"
  ];

  AGENT: any[] =[
    "Agent 1","Agent 2","Agent 3","Agent 4","Agent 5","Agent 6"
  ]

  queue: any[] = [
    "Call Types", "Language", "Provider", "Queue Name"
  ]

  chosenLevel: string = "select menu";

  selectLevel(event: any){
    if(event == "Agent"){
      this.name = this.AGENT;
    }

    if(event == "Manager"){
      this.name = this.manager;
    }

    if(event == "Predefined Groups"){      
      this.name = this.predefinedGroup;
    }

    if(event == "Department"){      
      this.name = this.department;
    }
  }

  
  

}
