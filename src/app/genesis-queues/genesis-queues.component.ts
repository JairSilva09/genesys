import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { GenesysService } from '../genesys.service';
import { SetItems } from '../genesys.service';  


@Component({
  selector: 'app-genesis-queues',
  templateUrl: './genesis-queues.component.html',
  styleUrls: ['./genesis-queues.component.scss']
})
export class GenesisQueuesComponent implements OnInit{

  @ViewChild('queues') queues!: MatListModule;
  @ViewChild('checkboxName') checkboxName!: MatListModule;

  constructor(private genesisService: GenesysService) { }

  setItems: any;

  ngOnInit(): void {
    
    this.genesisService.getItems$().subscribe(setSelectedItems => {
      //this.setItems = setSelectedItems;
      let text = "";


        
        for (const key in setSelectedItems) {
          if (Object.prototype.hasOwnProperty.call(setSelectedItems, key)) {
            text += setSelectedItems[key]+" ";
          }
        }

        text += "\n"

    

      this.setItems = text; 
      console.log(this.setItems)
    })
    
  }

  SELECTED_OBJECTS: SetItems = {
    level: "",
    name :  [],
    nameQueue: "",
    queue : []
  }

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
    this.SELECTED_OBJECTS.level = event
    this.genesisService.addItem(this.SELECTED_OBJECTS)    
  }

  selectQueue(event: any){    
    this.queueSelectList = true;
    this.SELECTED_OBJECTS.nameQueue = event;
    this.genesisService.addItem(this.SELECTED_OBJECTS)
  }

  nameItemSelected(event: any){  

    if (this.SET_NAME_SELECTED.indexOf(event.target.value) === -1) {
      this.SET_NAME_SELECTED.push(event.target.value);
      this.SELECTED_OBJECTS.name.push(event.target.value);
    }
    else {
      this.SET_NAME_SELECTED.splice(this.SET_NAME_SELECTED.indexOf(event.target.value), 1);
      this.SELECTED_OBJECTS.name.splice(this.SELECTED_OBJECTS.name.indexOf(event.target.value), 1);
    }
  
    this.genesisService.addItem(this.SELECTED_OBJECTS)
  }

  remove_name_selected(item: any){
    this.SET_NAME_SELECTED.splice(this.SET_NAME_SELECTED.indexOf(item), 1);
    this.SELECTED_OBJECTS.name.splice(this.SELECTED_OBJECTS.name.indexOf(item), 1);
    this.genesisService.addItem(this.SELECTED_OBJECTS)
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
      this.SELECTED_OBJECTS.queue.push(item);
    }
    else {
      this.SET_QUEUE_SELECTED.splice(this.SET_QUEUE_SELECTED.indexOf(item), 1);
      this.SELECTED_OBJECTS.queue.splice(this.SELECTED_OBJECTS.queue.indexOf(item), 1);
    } 
    
    this.genesisService.addItem(this.SELECTED_OBJECTS)

  }  

  removeQueue(item: any){
    this.SET_QUEUE_SELECTED.splice(this.SET_QUEUE_SELECTED.indexOf(item), 1);
    this.SELECTED_OBJECTS.queue.splice(this.SELECTED_OBJECTS.queue.indexOf(item), 1);
    this.genesisService.addItem(this.SELECTED_OBJECTS)
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
