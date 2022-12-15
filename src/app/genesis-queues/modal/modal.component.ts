import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { GenesysService } from 'src/app/services/genesys.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{

  @ViewChild('searchQueues') searchQueues!: ElementRef;
  @ViewChild('selectAllQueues') selectAllQueues!: ElementRef;

  constructor(private genesisService: GenesysService) { }
  

  QUEUE: any[] = [];
  QUEUES_LIST: any[] = [];
  DATA_ALL_QUEUES: any[] = [];
  dataSource_queue: any[] = [];
  COLUMN_QUEUE_SELECT:string[] = [];

  ITEMS_PER_PAGE: number[] = [10,20,30,40,50,60,70,80,90,100]
  num_item_page: number = 10;

  LIST_LANGUAGE: any[] = ["Language",[]]
  LIST_CALL_TYPE: any[] = ["Call Type",[]]
  LIST_PROVIDER: any[] = ["Provider",[]]

  num_pages: string = "";
  current_page: string = "1"

  panelOpenState = false;

  ngOnInit(): void {
    this.getAllDataQueues(); 
    this.getDataQueues();    
  }

  ngAfterViewInit(){
    
    fromEvent(this.searchQueues.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap((text: any) => {
          let term = this.searchQueues.nativeElement.value;
          this.genesisService.searchQueues$(term)
                  
        })
      )
      .subscribe();
  }


  getAllDataQueues(){
    this.genesisService.getAllDataModal$().subscribe(
      (data: any)=>{
        this.DATA_ALL_QUEUES = data
  
        this.DATA_ALL_QUEUES.unshift(
          {
            "total_records": this.DATA_ALL_QUEUES.length,
            "num_pages" : Math.ceil(data.length/this.num_item_page).toString(),
            "current_page": "1"
          }
        )
          //this.current_page = this.DATA_ALL_QUEUES[0].current_page;
          //sthis.num_pages = this.DATA_ALL_QUEUES[0].num_pages;
        

        this.DATA_ALL_QUEUES.slice(1,this.num_item_page+1).forEach((element: any)=>{
          element.is_checked = false;
        })

        this.dataSource_queue = this.DATA_ALL_QUEUES.slice(1,this.num_item_page+1)

        this.dataSource_queue.forEach((a:any)=>{
          if(this.LIST_LANGUAGE[1].indexOf(a.language) === -1){
            this.LIST_LANGUAGE[1].push(a.language)            
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
          this.LIST_CALL_TYPE,
          this.LIST_PROVIDER
        ]
          
        console.log(this.QUEUE)
        console.log(this.dataSource_queue)
  
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
            "num_pages" : Math.ceil(data.length/this.num_item_page).toString(),
            "current_page": "1"
          }
        )

        this.current_page = this.DATA_ALL_QUEUES[0].current_page;
        this.num_pages = this.DATA_ALL_QUEUES[0].num_pages;
        this.dataSource_queue = data.slice(1,this.num_item_page+1)
      }
    )
  }

  setColumnQueue(item: any){    
    this.setQueues(item)
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

  alertCheckbox(event: any) {    
   
     this.checkValueAll(event.target.checked);
   
  }

  checkValueAll(checked: boolean){
    
    this.dataSource_queue.forEach((element: any) => {
      element.is_checked = checked
    }) 

  }

  itemSelect(event: any,item:any){
    
    let count= 0;    
    
    if(event.target.checked == false){
      this.selectAllQueues.nativeElement.checked = false
      item.is_checked = false
      
    }else{
      item.is_checked = true
    }

    this.dataSource_queue.forEach((item: any)=>{

      if(item.is_checked == true){
        count++;
      }
      
    })

    if(count == 25){
      this.selectAllQueues.nativeElement.checked = true
    }

  }
  
  save_Selected_Queues(){
    let text = "Are you sure to save the selected queues?.";
    if (confirm(text) == true) {       
      console.log("Saved queues")
    } else {
      text = "Canceled!";
    }

    this.dataSource_queue.forEach((element: any) => {
      element.is_checked = false
    })
    this.selectAllQueues.nativeElement.checked = false;
  }

  number_of_pages(num: number){
    this.num_item_page = num;
    this.genesisService.getAllDataModal()         
  }
}
