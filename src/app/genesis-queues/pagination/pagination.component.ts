import { Component,  Input, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() total_pages: string="";
  @Input() current_page: string="";
  @Input()  records: any;

  data: any[] = [];

  @Output() newPage = new EventEmitter();

  nextPage(){

    let nextPage = Number(this.current_page);  
    this.data = this.records.slice(1);
       
    nextPage = nextPage + 1;
    this.sliceData(nextPage);
      
  }

  previusPage(){
    let previusPage = Number(this.current_page);
  
    previusPage = previusPage - 1; 
    this.sliceData(previusPage);
    
  }

  sliceData(page: number){
    
    let list:any[] = [];
    let num_records:number = 10;
      
    list = this.data.slice(num_records*Number(page)-num_records,num_records*Number(page));
    list.unshift(
      {
        "total_records": list.length,
        "num_pages" : Math.ceil(this.data.length / 10),
        "current_page": page
      }
    )   
    this.newPage.emit(list);
  }

}
