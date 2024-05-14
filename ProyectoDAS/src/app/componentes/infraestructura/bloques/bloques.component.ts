import { Component } from '@angular/core';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrl: './bloques.component.css'
})
export class BloquesComponent {
  facultades: any[] | undefined;
  selectedCity: any;
  tooltipVisible: boolean = false;

  ngOnInit() {
    this.facultades = [
      { name: 'FISEI', code: 'CO' },
      { name: 'Jurisprudencia', code: 'CA' },
      { name: 'Idiomas', code: 'AI' },
      { name: 'Administración', code: 'IM' }
    ]
  };

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }
}
