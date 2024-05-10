import { Component } from '@angular/core';
import { LayoutService } from '../../panel/service/app.layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public layoutService: LayoutService) { }
}
