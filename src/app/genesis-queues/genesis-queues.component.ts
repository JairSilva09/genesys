import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { GenesysService } from '../services/genesys.service';

@Component({
  selector: 'app-genesis-queues',
  templateUrl: './genesis-queues.component.html',
  styleUrls: ['./genesis-queues.component.scss']
})
export class GenesisQueuesComponent implements OnInit{

  @ViewChild('queues') queues!: MatListModule;
  @ViewChild('checkboxName') checkboxName!: MatListModule;
  @ViewChild('searchBar') searchBar!: ElementRef;
  @ViewChild('selectAllItems') selectAllItems!: ElementRef;

  settingItems: any;
  setSelectedItems: any;

  num_pages: string = "";
  current_page: string = "1";
  ITEMS_PER_PAGE: number[] = [10,20,30,40,50,60,70,80,90,100]
  num_item_page: number = 10;

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

  QUEUE: any[] = [];

  loadModalQueue:boolean = false;
  loadModalGroups: boolean = false; 

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
  dataSource: any[] = [];
  dataSource_queue: any[] = [];
  observableSubs: any;

  getDirectory(): void{
    this.genesisService.getDirectory$().subscribe(
      (data: any) => {
            
        this.DATA_ALL = data        
        this.DATA_ALL.unshift(
          {
            "total_records": this.DATA_ALL.length,
            "num_pages" : Math.ceil(data.length/this.num_item_page).toString(),
            "current_page": "1"           
          }
        )

        this.current_page = this.DATA_ALL[0].current_page;
        this.num_pages = this.DATA_ALL[0].num_pages;
        this.dataSource = data.slice(1,this.num_item_page+1)        
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
            "num_pages" : Math.ceil(data.length/this.num_item_page).toString(),
            "current_page": "1"            
          }
        )
        this.current_page = this.DATA_ALL[0].current_page;
        this.num_pages = this.DATA_ALL[0].num_pages;
        
        this.DATA_ALL.slice(1,this.num_item_page+1).forEach((element: any)=>{
          element.is_checked = false;
        })
        this.dataSource = this.DATA_ALL.slice(1,this.num_item_page+1)     
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
    let count = 0; 
    this.dataSource = event.slice(1);
    this.current_page = event[0].current_page;
    this.dataSource.forEach((item: any)=>{

      if(item.is_checked == true){
        count++;
      }

      if(count == this.num_item_page){
        this.selectAllItems.nativeElement.checked = true
      }else{
        this.selectAllItems.nativeElement.checked = false
      }
      
    })
    console.log(count)
   
  }
  
  alertCheckbox(event: any) {    
    this.checkValueAll(event.target.checked);
  }

  checkValueAll(checked: boolean){
    this.dataSource.forEach((element: any) => {
      element.is_checked = checked
    }) 
  }

  itemSelect(event: any,item:any){
    
    let count= 0;    
    
    if(event.target.checked == false){
      this.selectAllItems.nativeElement.checked = false
      item.is_checked = false
      
    }else{
      item.is_checked = true
      this.dataSource.forEach((item: any)=>{

        if(item.is_checked == true){
          count++;
        }       
      })

      if(count == this.num_item_page){
        this.selectAllItems.nativeElement.checked = true
      }
    }
  }

  number_of_pages(num: number){
    this.num_item_page = num;
    this.genesisService.getAllDirectory();         
  }
}
