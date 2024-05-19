import { Component } from '@angular/core';

@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrl: './facultades.component.css'
})
export class FacultadesComponent {
  tooltipVisible: boolean = false;

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }
}
