import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../panel/service/app.layout.service';

@Component({
  selector: 'app-tecnologicos',
  templateUrl: './tecnologicos.component.html',
  styleUrl: './tecnologicos.component.css'
})
export class TecnologicosComponent implements OnInit {
  equipos: any[] | undefined;
  selectedCity: any;
  tooltipVisible: boolean = false;

  ngOnInit() {
    this.equipos = [
      { name: 'Computadoras', code: 'CO' },
      { name: 'Camaras', code: 'CA' },
      { name: 'Aires', code: 'AI' },
      { name: 'Impresoras', code: 'IM' }
    ]
  };

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }
}

