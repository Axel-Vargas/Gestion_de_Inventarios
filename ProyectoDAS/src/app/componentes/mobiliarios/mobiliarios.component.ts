import { Component } from '@angular/core';
import { MobiliariosService } from '../../services/mobiliarios.service';

@Component({
  selector: 'app-mobiliarios',
  templateUrl: './mobiliarios.component.html',
  styleUrl: './mobiliarios.component.css'
})
export class MobiliariosComponent {

 mobiliarios: any = [];
 muebles: any[] | undefined;
  selectedCity: any;
  tooltipVisible: boolean = false;
  visible: boolean = false;
        constructor(private mobiliariosService:MobiliariosService) { 
          this.listarMobiliario()
        }
  ngOnInit() {
    this.listarMobiliario();

  }
  listarMobiliario(): void {
    this.mobiliariosService.obtenerMobiliarios().subscribe(
      (response: any) => {
        if (response && response.mobiliarios) {
          this.mobiliarios = response.mobiliarios;
        } else {
          this.mobiliarios =[];
        }
       console.log(response)
      }, 
      (error) => {
        console.error('Error al obtener mobiliarios:', error);
      }
    )
  }

  showTooltip() {
      this.tooltipVisible = true;
  }

  hideTooltip() {
      this.tooltipVisible = false;
  }
  showDialog() {
    this.visible = true;
    this.listarMobiliario()
}



}
