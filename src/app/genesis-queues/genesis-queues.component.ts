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

  num_pages: string = "";
  current_page: string = "1"

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

  COLUMN_QUEUE_SELECT:string[] = [];

  QUEUE: any[] = [
    
  ]

  QUEUES_LIST: any[] = []
  LIST_LANGUAGE: any[] = ["Language",[]]
  LIST_QUEUE_ID: any[] = ["Queue ID",[]]
  LIST_QUEUE_NAME: any[] = ["Queue Name",[]]
  LIST_CALL_TYPE: any[] = ["Call Type",[]]
  LIST_PROVIDER: any[] = ["Provider",[]]

  ngOnInit(): void {

    this.getAll();
    this.getDirectory();   
   
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
          
        })
      )
      .subscribe();
  }
  
  chosenLevel: string = "select menu";
  chosenQueue: string = "select menu";  

  nameItem: any;
  levelSelect:boolean = false;
  queueSelectList: boolean = false;

  data: any= [];
  DATA_ALL: any[] = [];
  DATA_ALL_QUEUES: any[] = [];
  dataSource: any[] = [];
  dataSource_queue: any[] = [];
  observableSubs: any;

  getDirectory(): void{
    this.genesisService.getDirectory$().subscribe(
      (data: any) => {
        // this.dataSource = data.slice(1)
        // this.current_page = data[0].current_page 
        // this.num_pages = data[0].num_pages
        this.DATA_ALL = data        
        this.DATA_ALL.unshift(
          {
            "total_records": this.DATA_ALL.length,
            "num_pages" : Math.ceil(data.length/10).toString(),
            "current_page": "1"
          }
        )

        this.current_page = this.DATA_ALL[0].current_page;
        this.num_pages = this.DATA_ALL[0].num_pages;
        this.dataSource = data.slice(1,11)
      }    
    ) 
  }

  getAll(): void{

    this.genesisService.getAllDirectory$(this.current_page).subscribe(
      (data: any)=>{
        this.DATA_ALL = data

        this.DATA_ALL.unshift(
          {
            "total_records": this.DATA_ALL.length,
            "num_pages" : Math.ceil(data.length/10).toString(),
            "current_page": "1"
          }
        )
        this.current_page = this.DATA_ALL[0].current_page;
        this.num_pages = this.DATA_ALL[0].num_pages;
        this.dataSource = this.DATA_ALL.slice(1,11)
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
      this.genesisService.getAllDirectory();      
    }
  }

  newPage(event: any){ 
    console.log(event)
    this.dataSource = event.slice(1);
    this.current_page = event[0].current_page;
   
  }

  //================ MODAL ================//

  openModal(){
    this.getAllDataQueues(); 
    this.getDataQueues();   
  }

  getAllDataQueues(){
    this.genesisService.getAllDataModal$().subscribe(
      (data: any)=>{
        this.DATA_ALL_QUEUES = data
  
        this.DATA_ALL_QUEUES.unshift(
          {
            "total_records": this.DATA_ALL_QUEUES.length,
            "num_pages" : Math.ceil(data.length/10).toString(),
            "current_page": "1"
          }
        )
          //this.current_page = this.DATA_ALL_QUEUES[0].current_page;
          //sthis.num_pages = this.DATA_ALL_QUEUES[0].num_pages;
        this.dataSource_queue = this.DATA_ALL_QUEUES.slice(1)

        this.dataSource_queue.forEach((a:any)=>{
          if(this.LIST_LANGUAGE[1].indexOf(a.language) === -1){
            this.LIST_LANGUAGE[1].push(a.language)            
          }

          if(this.LIST_QUEUE_ID[1].indexOf(a.queueid) === -1){
            this.LIST_QUEUE_ID[1].push(a.queueid)            
          }

          if(this.LIST_QUEUE_NAME[1].indexOf(a.queuename) === -1){
            this.LIST_QUEUE_NAME[1].push(a.queuename)            
          }
          if(this.LIST_CALL_TYPE[1].indexOf(a.calltype) === -1){
            this.LIST_CALL_TYPE[1].push(a.calltype)            
          }
          if(this.LIST_PROVIDER[1].indexOf(a.provider) === -1){
            this.LIST_PROVIDER[1].push(a.provider)            
          }
          
        })

        this.QUEUE = [
          this.LIST_LANGUAGE,
          this.LIST_QUEUE_ID,
          this.LIST_QUEUE_NAME,
          this.LIST_CALL_TYPE,
          this.LIST_PROVIDER
        ]
          
        console.log(this.QUEUE)
        console.log(this.DATA_ALL_QUEUES)
  
      }    
    )
  }

  getDataQueues(){
    this.genesisService.getDataModal$().subscribe(
      (data: any) => {    
        this.DATA_ALL_QUEUES = data        
        this.DATA_ALL_QUEUES.unshift(
          {
            "total_records": this.DATA_ALL_QUEUES.length,
            "num_pages" : Math.ceil(data.length/10).toString(),
            "current_page": "1"
          }
        )

        this.current_page = this.DATA_ALL_QUEUES[0].current_page;
        this.num_pages = this.DATA_ALL_QUEUES[0].num_pages;
        this.dataSource_queue = data.slice(1)
      }
    )
  }

  setQueues(item: any): void{

    if (this.QUEUES_LIST.indexOf(item) === -1) {
      this.QUEUES_LIST.push(item);
    }
    else {
      this.QUEUES_LIST.splice(this.QUEUES_LIST.indexOf(item), 1);
    } 

    console.log(this.QUEUES_LIST) 
  }

  columnSelected(event: any, column: string){
    if(column.split(' ').length > 1){
      column =  column.replace(/\s+/g, '')
    }

    if (this.COLUMN_QUEUE_SELECT.indexOf(event.target.value) === -1) {
      this.COLUMN_QUEUE_SELECT.push(event.target.value);
    }
    else {
      this.COLUMN_QUEUE_SELECT.splice(this.COLUMN_QUEUE_SELECT.indexOf(event.target.value), 1);
    }

    if(this.COLUMN_QUEUE_SELECT.length > 0){
      this.genesisService.searchByColumnQueue$(this.COLUMN_QUEUE_SELECT,column)
    }else{
      this.genesisService.getAllDataModal()     
    }
  }

  setColumnQueue(item: any){
    this.setQueues(item)
  }
  
}
