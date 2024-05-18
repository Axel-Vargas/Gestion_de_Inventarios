import { Component } from '@angular/core';
import { MobiliariosService } from '../../../services/mobiliarios.service';
import { AreaMobiliarioService } from '../../../services/area.mobiliario.service';
import { MessageService } from 'primeng/api';
import { EncargadosService } from '../../../services/encargados.service';


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
  selectedCity: any;
  selectEncargado: any;
  selectArea: any;

  tooltipVisible: boolean = false;
  visible: boolean = false;
  nombreBuscado: string = '';

  id_bien_mob = '';
  bld_bca = '';
  nombre = '';
  marca = '';
  modelo = '';
  num_serie = '';
  material = '';
  color = '';
  fecha_adquisicion = '';
  estado = '';
  localizacion = '';
  codigoUTA = '';
  valor_contable = '';
  id_encargado_per = '';
  id_area_per = '';


  constructor(private mobiliariosService: MobiliariosService, private encargadosService: EncargadosService, private areasService: AreaMobiliarioService
    , private messageService: MessageService) {
    this.listarMobiliario()
  }
  ngOnInit() {
    this.listarMobiliario();
    this.listarEncargadosPorNombre();
    this.listarAreas()

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
        console.error('Error al obtener usuarios:', error);
      }
    );
  }



  listarMobiliario(): void {
    this.mobiliariosService.obtenerMobiliarios().subscribe(
      (response: any) => {
        if (response && response.mobiliarios) {
          this.mobiliarios = response.mobiliarios;
        } else {
          this.mobiliarios = [];
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
  async mostrarMensaje(mensaje: string, exito: boolean) {
    this.messageService.add(
      {
        severity: exito ? 'success' : 'error',
        summary: exito ? 'Éxito' : 'Error', detail: mensaje
      });
  }

  registrarMobiliario() {
    if (!this.selectEncargado || !this.selectArea || this.id_bien_mob == '' || this.bld_bca == '' || this.nombre == '' || this.marca == '' || this.modelo == '' || this.num_serie == '' || this.fecha_adquisicion == '' || this.estado == '' || this.localizacion == '' || this.codigoUTA == '' || this.valor_contable == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.mobiliariosService.insertarMobiliaria(this.id_bien_mob, this.bld_bca, this.nombre, this.marca, this.modelo, this.num_serie, this.material, this.color, this.fecha_adquisicion, this.estado, this.localizacion, this.codigoUTA, this.valor_contable, this.selectEncargado.id_encargado, this.selectArea.id_area).subscribe(
        (response) => {
          this.mostrarMensaje("Bien registrado con Exito", true);
          this.visible = false;
          this.listarMobiliario();
          this.limpiarFormulario();
          this.listarMobiliario();
        },
        (error) => {
          // this.mostrarMensaje("Correo ya existente", false);
        }
      )
    };
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
    this.id_bien_mob = '';
    this.bld_bca = '';
    this.nombre = '';
    this.marca = '';
    this.modelo = '';
    this.num_serie = '';
    this.material = '';
    this.color = '';
    this.fecha_adquisicion = '';
    this.estado = '';
    this.localizacion = '';
    this.codigoUTA = '';
    this.valor_contable = '';
    this.selectEncargado = null;
    this.selectArea = null;
  }



}
