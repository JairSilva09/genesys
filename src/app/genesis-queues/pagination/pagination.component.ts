import { Component,  Input, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() total_pages: number = 0;
  @Input() current_page: number= 0;
  @Input()  records: any;

  data: any[] = [];

  @Output() newPage = new EventEmitter();

  nextPage(){

    this.newPage.emit("next");
      
  }

  previusPage(){
    
    this.newPage.emit("previus");
    
  }
  
}
