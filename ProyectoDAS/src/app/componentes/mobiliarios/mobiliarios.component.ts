import { Component } from '@angular/core';

@Component({
  selector: 'app-mobiliarios',
  templateUrl: './mobiliarios.component.html',
  styleUrl: './mobiliarios.component.css'
})
export class MobiliariosComponent {
  muebles: any[] | undefined;
  selectedCity: any;
  tooltipVisible: boolean = false;

  ngOnInit() {
    this.muebles = [
      { name: 'Archivador', code: 'CO' },
      { name: 'Sillas', code: 'CO' },
      { name: 'Mesas de Computadora', code: 'CA' },
      { name: 'Pizarrones', code: 'AI' },
      { name: 'Bancas', code: 'IM' },
      { name: 'Lockers', code: 'IM' },
    ]
  };

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }
}
