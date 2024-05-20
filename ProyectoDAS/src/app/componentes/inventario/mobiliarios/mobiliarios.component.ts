import { Component } from '@angular/core';
import { MobiliariosService } from '../../../services/mobiliarios.service';
import { EncargadoMobiliarioService } from '../../../services/encargado.mobiliario.service';
import { AreaMobiliarioService } from '../../../services/area.mobiliario.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-mobiliarios',
  templateUrl: './mobiliarios.component.html',
  styleUrl: './mobiliarios.component.css'
})
export class MobiliariosComponent {

 mobiliarios: any = [];
 muebles: any[] | undefined;
 encargados:any[]=[];
 areas:any[]=[];
  selectedCity: any;
  selectEncargado: any;
  selectArea: any;

  tooltipVisible: boolean = false;
  visible: boolean = false;
  nombreBuscado:string='';



  id: string = '';
  bld_bca ='';
  nombre='';
  marca='';
  modelo='';
  num_serie='';
  material='';
  color='';
  fecha_adquisicion='';
  estado='';
  localizacion='';
  codigoUTA='';
  valor_contable='';



        constructor(private confirmationService: ConfirmationService ,private mobiliariosService:MobiliariosService,private encargadosService:EncargadoMobiliarioService,private areasService:AreaMobiliarioService
          ,private messageService: MessageService) { 
          this.listarMobiliario()
        }
  ngOnInit() {
    this.listarMobiliario();
    this.listarEncargadosPorNombre();
    this.listarAreas();
    
    this.muebles = [
      { name: 'Archivador', code: 'CO' },
      { name: 'Sillas', code: 'CO' },
      { name: 'Mesas de Computadora', code: 'CA' },
      { name: 'Pizarrones', code: 'AI' },
      { name: 'Bancas', code: 'IM' },
      { name: 'Lockers', code: 'IM' },
    ]


  }
  listarEncargadosPorNombre(): void {
    this.encargadosService.obtenerEncargados().subscribe(
      (response: any) => {
        if (response && response.encargados) {
          this.encargados = response.encargados;
        } else {
          this.encargados = [];
        }
      },
      (error) => {
        console.error('Error al obtener encargado:', error);
      }
    );
  }
  listarAreas(): void {
    this.areasService.obtenerAreas().subscribe(
      (response: any) => {
        if (response && response.areas) {
          this.areas = response.areas;
        } else {
          this.areas = [];
        }
      },
      (error) => {
        console.error('Error al obtener areas:', error);
      }
    );
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

  cargarMobiliario(nombre: string): void {
    this.mobiliariosService.obtenerUsuarioPorNombre(nombre).subscribe(
      (response: any) => {
        if (response && response.mobiliarios) {
          this.mobiliarios = response.mobiliarios;
        } else {
          this.mobiliarios = [];
        }
      },
      (error) => {
        console.error('Usuario no encontrado:', error);
      }
    );
  }
  buscarMobiliario() {
    this.cargarMobiliario(this.nombreBuscado);
  }
  

  registrarMobiliario() {
    // Asumiendo que id_bien_mob y valor_contable se manejan como cadenas que necesitan ser convertidas a números
    // y que fecha_adquisicion también es una cadena que debe ser convertida a un objeto Date
    if (this.bld_bca == '' || this.nombre == '' || this.marca == '' || this.modelo == '' || 
        this.num_serie == '' ||  this.material == '' || this.color == ''|| this.fecha_adquisicion == '' || this.estado == '' || this.localizacion == '' || 
        this.codigoUTA == '' || this.valor_contable == '' || this.selectEncargado ==''|| this.selectArea =='')  {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      const valorContableInt = parseFloat(this.valor_contable);
      const fechaAdquisicionDate = new Date(this.fecha_adquisicion);
  
      // Verifica que las conversiones sean válidas
      if (isNaN(valorContableInt) || isNaN(fechaAdquisicionDate.getTime())) 
           {
        this.mostrarMensaje("Datos numéricos o de fecha inválidos", false);
        return;
      }
  
      // Llamada al servicio con datos ya validados y convertidos
      console.log(this.selectEncargado.id_encargado)
      console.log(this.selectArea.id_area)
      this.mobiliariosService.insertarMobiliaria( this.bld_bca, this.nombre, this.marca, this.modelo,
        this.num_serie, this.material, this.color, fechaAdquisicionDate, this.estado, this.localizacion,
        this.codigoUTA, valorContableInt, this.selectEncargado.id_encargado,this.selectArea.id_area).subscribe(
        (response) => {
          this.mostrarMensaje("Bien registrado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarMobiliario();
          // Opcionales: listarMobiliario, limpiarFormulario, etc.
          // 
          // 
        },
        (error) => {
          this.mostrarMensaje("Error al registrar el mobiliario", false);
        }
      );
    }
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
limpiarFormulario() {

 this.bld_bca ='';
 this.nombre='';
 this.marca='';
 this.modelo='';
 this.num_serie='';
 this.material='';
 this.color='';
 this.fecha_adquisicion='';
 this.estado='';
 this.localizacion='';
 this.codigoUTA='';
 this.valor_contable='';
}
eliminarMobiliario(id:string) {
  this.mobiliariosService.eliminarMobiliario(id).subscribe(
    (response) => {
      this.mostrarMensaje("Bien eliminado con éxito", true);
      this.listarMobiliario();
    },
    (error) => {
      this.mostrarMensaje("Error al eliminar el Bien", false);
    }
  );
}
async mostrarMensaje(mensaje: string, exito: boolean) {
  this.messageService.add(
    {
      severity: exito ? 'success' : 'error',
      summary: exito ? 'Éxito' : 'Error', detail: mensaje
    });
}

confirm(id: string) {
  this.confirmationService.confirm({
    message: '¿Seguro que desea eliminar el Bien Mobiliario?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.eliminarMobiliario(id);
      this.listarMobiliario();
    },
    reject: () => {
      console.log("rechazado");
    }
  });
}



}
