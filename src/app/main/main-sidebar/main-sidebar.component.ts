import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {
  cheminImage:any = "../../../assets/images/logo.png";
  constructor() { }
  panelOpenState = false;
  customCollapsedHeight: string = '39px';
  ngOnInit(): void {
  }

} 
0