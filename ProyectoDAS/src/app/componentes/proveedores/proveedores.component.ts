import { Component } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  tooltipVisible: boolean = false;

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }
}
