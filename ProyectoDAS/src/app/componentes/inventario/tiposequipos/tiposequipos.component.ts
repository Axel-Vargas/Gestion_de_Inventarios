import { Component } from '@angular/core';


@Component({
  selector: 'app-tiposequipos',
  templateUrl: './tiposequipos.component.html',
  styleUrl: './tiposequipos.component.css'
})
export class TiposequiposComponent {
  tooltipVisible: boolean = false;
  visible: boolean = false;
  availableDevices: MediaDeviceInfo[] = []; // Inicialización como array vacío
  currentDevice: MediaDeviceInfo | null = null; 

  camerasFoundHandler(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    if (devices && devices.length > 0) {
      this.currentDevice = devices[0]; // Asegúrate de que hay dispositivos antes de asignar
    } else {
      this.currentDevice = null; // Maneja el caso donde no hay cámaras disponibles
    }
  }

  scanSuccessHandler(result: string): void {
    console.log('Result:', result); // maneja el resultado del escaneo aquí
  }

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
