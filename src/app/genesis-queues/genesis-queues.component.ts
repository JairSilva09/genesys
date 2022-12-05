import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { GenesysService } from '../services/genesys.service';
import { SetItems } from '../services/genesys.service';  


@Component({
  selector: 'app-genesis-queues',
  templateUrl: './genesis-queues.component.html',
  styleUrls: ['./genesis-queues.component.scss']
})
export class GenesisQueuesComponent implements OnInit{

  @ViewChild('queues') queues!: MatListModule;
  @ViewChild('checkboxName') checkboxName!: MatListModule;
  @ViewChild('searchBar') searchBar!: ElementRef;

  settingItems: any;
  setSelectedItems: any;

  constructor(private genesisService: GenesysService) { }

  SKILL_SELECT: any[] =[]

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


  ngOnInit(): void {

    this.getAll();
    this.getDirectory();
   

    //this.setSelectedItems = localStorage.getItem('queueData')

    // if(this.setSelectedItems != null){
    //   this.SELECTED_OBJECTS = JSON.parse(this.setSelectedItems)
    //   if(this.SELECTED_OBJECTS.level != ""){
    //     this.chosenLevel = this.SELECTED_OBJECTS.level;
    //     this.setNameLevel(this.SELECTED_OBJECTS.level)
    //     this.levelSelect = true;
    //   }

    //   if(this.SELECTED_OBJECTS.nameQueue != ""){
    //     this.chosenQueue = this.SELECTED_OBJECTS.nameQueue;
    //   }
      
    //   this.getTextSetting(this.SELECTED_OBJECTS);

    // }  
   
    // this.genesisService.getItems$().subscribe(setSelectedItems => {    
    //   localStorage.setItem('queueData',JSON.stringify(setSelectedItems))
    //   this.setSelectedItems = localStorage.getItem('queueData')
    //   this.SELECTED_OBJECTS = JSON.parse(this.setSelectedItems)
    //   this.getTextSetting(this.SELECTED_OBJECTS);
      
    // })
   
  }

  ngAfterViewInit(){
    
    fromEvent(this.searchBar.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap((text: any) => {
          let term = this.searchBar.nativeElement.value;
          this.genesisService.search$(term)
          //this.getDirectory()
          
          // this.genesisService.search$(term).subscribe((data: any)=>{
          //   this.dataSource = data
          //   console.log(this.dataSource)
          // })
          
        })
      )
      .subscribe();
  }
  
  // filterList(): void {
  //   this.searchTerm$.subscribe(term => {
  //     this.dataSource
  //       .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
  //   });
  // }

  // SELECTED_OBJECTS: SetItems = {
  //   level: "",
  //   name :  [],
  //   nameQueue: "",
  //   queue : []
  // 

  chosenLevel: string = "select menu";
  chosenQueue: string = "select menu";  

  nameItem: any;
  levelSelect:boolean = false;
  queueSelectList: boolean = false;

  data: any= [];
  dataSource: any[] = [];
  observableSubs: any;

  getDirectory(): void{
    this.genesisService.getDirectory$().subscribe(
      (data: any) => {
        this.dataSource = data;        
      }    
    ) 
  }

  getAll(): void{

    this.genesisService.getAllDirectory$().subscribe(
      (data: any)=>{
        this.dataSource = data 
      }    
  
    )
  }

  getTextSetting(obj: any){
    let text = "";
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            text += obj[key]+" ";
        }
      }
      text += "\n"
      this.settingItems = text;
  }

  setNameLevel(level: string): void{
    if(level == "Agent"){
      this.NAME = this.AGENT;
    }

    if(level == "Manager"){
      this.NAME = this.MANAGER;
    }

    if(level == "Predefined Groups"){      
      this.NAME = this.PREDEFINEDGROUP;
    }

    if(level == "Department"){      
      this.NAME = this.DEPARTMENT;
    }
  }

  // selectLevel(event: string){

  //   this.setNameLevel(event)
  //   this.levelSelect = true;
  //   this.SELECTED_OBJECTS.level = event
  //   this.genesisService.addItem(this.SELECTED_OBJECTS); 
    
  // }

  // selectQueue(event: any){    
  //   this.queueSelectList = true;
  //   this.SELECTED_OBJECTS.nameQueue = event;
  //   this.genesisService.addItem(this.SELECTED_OBJECTS)
  // }

  // nameItemSelected(event: any){  

  //   if (this.SELECTED_OBJECTS.name.indexOf(event.target.value) === -1) {
  //     this.SELECTED_OBJECTS.name.push(event.target.value);
  //   }
  //   else {
  //     this.SELECTED_OBJECTS.name.splice(this.SELECTED_OBJECTS.name.indexOf(event.target.value), 1);
  //   }
  
  //   this.genesisService.addItem(this.SELECTED_OBJECTS)
  // }

  // remove_name_selected(item: any){
  //   this.SELECTED_OBJECTS.name.splice(this.SELECTED_OBJECTS.name.indexOf(item), 1);
  //   this.genesisService.addItem(this.SELECTED_OBJECTS)
  // }

  // chequedBoxName(item: any){
  //   if(this.SELECTED_OBJECTS.name.indexOf(item) === -1){
  //     return false      
  //   }else{
  //     return true
  //   }   
  // }

  // selectedQueue(event: any,item: any){    

  //   if (this.SELECTED_OBJECTS.queue.indexOf(item) === -1) {
  //     this.SELECTED_OBJECTS.queue.push(item);
  //   }
  //   else {
  //     this.SELECTED_OBJECTS.queue.splice(this.SELECTED_OBJECTS.queue.indexOf(item), 1);
  //   } 
    
  //   this.genesisService.addItem(this.SELECTED_OBJECTS)

  // }  

  // removeQueue(item: any){
  //   this.SELECTED_OBJECTS.queue.splice(this.SELECTED_OBJECTS.queue.indexOf(item), 1);
  //   this.genesisService.addItem(this.SELECTED_OBJECTS)
  // }

  // chequedBoxQueue(item: any){
  //   if(this.SELECTED_OBJECTS.queue.indexOf(item) === -1){
  //     return false      
  //   }else{
  //     return true
  //   }
  // }

  close_queue_list(){
    this.queueSelectList = false;
  }

  skillSelect(event: any){

    if (this.SKILL_SELECT.indexOf(event.target.value) === -1) {
      this.SKILL_SELECT.push(event.target.value);
    }
    else {
        this.SKILL_SELECT.splice(this.SKILL_SELECT.indexOf(event.target.value), 1);
    }

    if(this.SKILL_SELECT.length > 0){
      this.genesisService.searchBySkill$(this.SKILL_SELECT)
    }else{
      this.getAll();      
    }
  }
}
