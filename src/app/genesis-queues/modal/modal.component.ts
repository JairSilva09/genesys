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

  constructor(private genesisService: GenesysService) { }
  

  QUEUE: any[] = [];
  QUEUES_LIST: any[] = [];
  DATA_ALL_QUEUES: any[] = [];
  dataSource_queue: any[] = [];
  COLUMN_QUEUE_SELECT:string[] = [];

  LIST_LANGUAGE: any[] = ["Language",[]]
  LIST_QUEUE_ID: any[] = ["Queue ID",[]]
  LIST_QUEUE_NAME: any[] = ["Queue Name",[]]
  LIST_CALL_TYPE: any[] = ["Call Type",[]]
  LIST_PROVIDER: any[] = ["Provider",[]]

  num_pages: string = "";
  current_page: string = "1"

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

}
