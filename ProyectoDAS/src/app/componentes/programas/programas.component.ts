import { Component } from '@angular/core';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrl: './programas.component.css'
})
export class ProgramasComponent {
  tooltipVisible: boolean = false;

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }
}
