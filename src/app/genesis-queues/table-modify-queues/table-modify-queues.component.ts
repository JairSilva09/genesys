import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-modify-queues',
  templateUrl: './table-modify-queues.component.html',
  styleUrls: ['./table-modify-queues.component.scss']
})
export class TableModifyQueuesComponent implements OnInit{

  @Input() selected_agents: any[] = []; 

  ngOnInit(): void {
    console.log(this.selected_agents)
  }

}
