import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  LIST_FALSE: any[] = [
    {
      skill : "Clink Agency Ext Res",
      queue: "2",
      wait: "00:03:19"
    },
    {
      skill : "Dish Residencial",
      queue: "1",
      wait: "00:00:01"
    },
    {
      skill : "Cox",
      queue: "1",
      wait: "00:00:05"
    },
    {
      skill : "VopIP",
      queue: "1",
      wait: "00:00:44"
    },
    {
      skill : "Verizon Zip LookUp",
      queue: "1",
      wait: "00:01:53"
    }
  ]

}
