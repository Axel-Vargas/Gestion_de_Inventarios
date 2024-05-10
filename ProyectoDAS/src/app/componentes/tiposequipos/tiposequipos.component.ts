import { Component } from '@angular/core';

@Component({
  selector: 'app-tiposequipos',
  templateUrl: './tiposequipos.component.html',
  styleUrl: './tiposequipos.component.css'
})
export class TiposequiposComponent {
  tooltipVisible: boolean = false;

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }
}
