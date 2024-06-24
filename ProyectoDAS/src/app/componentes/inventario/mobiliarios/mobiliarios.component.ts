import { Component } from '@angular/core';
import { MobiliariosService } from '../../../services/mobiliarios.service';
import { AreaMobiliarioService } from '../../../services/area.mobiliario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EncargadosService } from '../../../services/encargados.service';
import { DependenciaService } from '../../../services/dependencia.service';



@Component({
  selector: 'app-mobiliarios',
  templateUrl: './mobiliarios.component.html',
  styleUrl: './mobiliarios.component.css'
})
export class MobiliariosComponent {

  mobiliarios: any = [];
  muebles: any[] | undefined;
  encargados: any[] = [];
  areas: any[] = [];
  dependencia: any[] = [];
  selectedCity: any;
  selectEncargado: any;
  selectArea: any;
  selectEstado: any;

  tooltipVisible: boolean = false;
  visible: boolean = false;
  nombreBuscado: string = '';
  esEdicion: boolean = false;

  id: string = '';
  nombre = '';
  marca = '';
  modelo = '';
  num_serie = '';
  material = '';
  color = '';
  fecha_adquisicion = '';
  localizacion = '';
  codigoUTA = '';
  selectEncargados: any = null;
  selectAreas: any = null;
  selectDependencia: any = null

  soloLetrasRegex = /^[a-zA-Z]*$/;
  representatives: any[] = [];
  representativesA: any[] = [];
  estados: any[] = [];
  selectedRepresentatives: any[] = [];
  selectedRepresentativesA: any[] = [];

  constructor(private confirmationService: ConfirmationService,private dependenciaService: DependenciaService, private mobiliariosService: MobiliariosService, private encargadosService: EncargadosService, private areasService: AreaMobiliarioService, private messageService: MessageService) {}

  id_bien = '';
  id_encargado_per = '';
  id_area_per = '';

  matchModeOptions = [
    { label: 'Empieza con', value: 'startsWith' },
    { label: 'Termina con', value: 'endsWith' },
    { label: 'Contiene', value: 'contains' },
    { label: 'Es igual a', value: 'equals' },
    { label: 'No es igual a', value: 'notEquals' },
  ];


  ngOnInit() {
    this.listarMobiliario();
    this.listarAreas();
    this.listarAreasComboBox();
    this.listarEncargados();
    this.listarEncargadosComboBox();
    this.listarDependencia()

    this.estados = [
      { name: 'FUNCIONAL', code: 1 },
      { name: 'NO FUNCIONAL', code: 2 },
    ];
  }

  listarEncargados(): void {
    this.encargadosService.obtenerEncargados().subscribe(
      (response: any) => {
        if (response) {
          this.encargados = response;
        } else {
          this.encargados = [];
        }
      },
      (error) => {
        console.error('Error al obtener encargados:', error);
      }
    );
  }

  listarEncargadosComboBox(): void {
    this.encargadosService.obtenerEncargados().subscribe(
      (response: any) => {
        if (response && response.encargados) {
          this.representatives = Array.from(new Set(response.encargados.map((encargado: any) => encargado.nombre)))
            .map(name => {
              return {
                name: name,
                label: name
              };
            });
        } else {
          this.representatives = [];
        }
      },
      (error) => {
        console.error('Error al obtener encargados:', error);
      }
    );
  }


  listarAreas(): void {
    this.areasService.obtenerAreas().subscribe(
      (response: any) => {

        if (response) {
          this.areas = response;
        } else {
          this.areas = [];
        }
      },
      (error) => {
        console.error('Error al obtener areas:', error);
      }
    );
  }
  
  listarDependencia(): void {
    this.dependenciaService.getDependencias().subscribe(
      (response: any) => {
        console.log(response);
        if (response) {
          this.dependencia = response;
        } else {
          this.dependencia = [];
        }
      },
      (error) => {
        console.error('Error al obtener areas:', error);
      }
    );
  }

  listarAreasComboBox(): void {
    this.areasService.obtenerAreas().subscribe(
      (response: any) => {
        if (response) {
          this.representativesA = Array.from(new Set(response.map((area: any) => area.nombre)))
            .map(name => {
              return {
                name: name,
                label: name
              };
            });
        } else {
          this.representativesA = [];
        }
      },
      (error) => {
        console.error('Error al obtener areas:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  listarMobiliario(): void {
    this.mobiliariosService.obtenerMobiliarios().subscribe(
      (response: any) => {
        if (response && response.mobiliarios) {
          this.mobiliarios = response.mobiliarios.map((mobiliario: any) => ({
            ...mobiliario,
            fecha_adquisicion: this.formatDate(mobiliario.fecha_adquisicion)
          }));
        } else {
          this.mobiliarios = [];
        }
      },
      (error) => {
        console.error('Error al obtener mobiliarios:', error);
      }
    );
  }

  registrarMobiliario() {
    console.log(this.selectEstado);
    if (this.nombre == '' || this.marca == '' || this.modelo == '' ||
      this.num_serie == '' || this.material == '' || this.color == '' || this.fecha_adquisicion == '' || !this.selectEstado || this.localizacion == '' ||
      this.codigoUTA == '' || this.selectEncargado == '' || this.selectArea == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      const fechaAdquisicionDate = new Date(this.fecha_adquisicion);

      if (isNaN(fechaAdquisicionDate.getTime())) {
        this.mostrarMensaje("Datos numéricos o de fecha inválidos", false);
        return;
      }

      this.mobiliariosService.insertarMobiliaria( this.nombre, this.marca, this.modelo,
        this.num_serie, this.material, this.color, fechaAdquisicionDate, this.selectEstado.name, this.localizacion,
        this.codigoUTA, this.selectEncargado.id_encargado, this.selectArea.id_area, this.selectDependencia.id_dep).subscribe(
          (response) => {
            this.mostrarMensaje("Bien registrado con éxito", true);
            this.limpiarFormulario();
            this.visible = false;
            this.listarMobiliario();
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

  eliminarMobiliario(id: string) {
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

  editarMobiliario() {
    if (this.nombre == '' || this.marca == '' || this.modelo == '' ||
      this.num_serie == '' || this.material == '' || this.color == '' || this.fecha_adquisicion == '' || !this.estados || this.localizacion == '' ||
      this.codigoUTA == '' || this.selectEncargado == '' || this.selectArea == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      const fechaAdquisicionDate = new Date(this.fecha_adquisicion);

      if (isNaN(fechaAdquisicionDate.getTime())) {
        this.mostrarMensaje("Datos numéricos o de fecha inválidos", false);
        return;
      }

      this.mobiliariosService.actualizarMobiliarios(this.id,  this.nombre, this.marca, this.modelo, this.num_serie, this.material,
        this.color, fechaAdquisicionDate, this.selectEstado.name, this.localizacion, this.codigoUTA, this.selectEncargado.id_encargado, this.selectArea.id_area, this.selectDependencia.id_dep).subscribe(
          (response) => {
            this.mostrarMensaje("Bien actualizo con éxito", true);
            this.visible = false;
            this.listarMobiliario();
          },
          (error) => {
            this.mostrarMensaje("Error al actualizar el mobiliario", false);
          }
        );
    };
  }

  handleInput(event: any) {
    const inputValue = event.target.value;
    
  }

  showDialogAgregar() {
    this.esEdicion = false;
    this.visible = true;
    this.limpiarFormulario();
  }

  showDialogEditar(mobiliario: any) {
    this.esEdicion = true;
    this.nombre = mobiliario.nombre;
    this.marca = mobiliario.marca;
    this.modelo = mobiliario.modelo;
    this.num_serie = mobiliario.num_serie;
    this.material = mobiliario.material;
    this.color = mobiliario.color;
    this.fecha_adquisicion = this.formatDate(mobiliario.fecha_adquisicion);
    this.selectEstado = this.estados.find(estado => estado.name === mobiliario.estado);
    this.localizacion = mobiliario.localizacion;
    this.codigoUTA = mobiliario.codigoUTA;
    this.selectEncargado = this.encargados.find(encargado => encargado.id_encargado === mobiliario.id_encargado_per);
    this.selectArea = this.areas.find(area => area.id_area === mobiliario.id_area_per);
    this.selectDependencia = this.dependencia.find(dependencia => dependencia.id_dep === mobiliario.id_dependencia_per);
    this.id = mobiliario.id_bien;
    this.visible = true;
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

  limpiarFormulario() {
    this.id_bien = '';
    this.nombre = '';
    this.marca = '';
    this.modelo = '';
    this.num_serie = '';
    this.material = '';
    this.color = '';
    this.fecha_adquisicion = '';
    this.localizacion = '';
    this.codigoUTA = '';
    this.selectEncargado = null;
    this.selectArea = null;
  }


}



