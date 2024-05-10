import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public layoutService: LayoutService, public el: ElementRef) { }
}
