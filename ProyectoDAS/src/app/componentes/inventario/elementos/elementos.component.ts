import { Component } from '@angular/core';

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrl: './elementos.component.css'
})
export class ElementosComponent {
  tooltipVisible: boolean = false;

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }
}
