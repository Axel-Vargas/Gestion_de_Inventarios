import { Component } from '@angular/core';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrl: './encargados.component.css'
})
export class EncargadosComponent {
  tooltipVisible: boolean = false;
  visible: boolean = false;

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }

  showDialog() {
    this.visible = true;
}
}
