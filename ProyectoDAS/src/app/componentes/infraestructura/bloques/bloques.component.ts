import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Bloque } from '../../api/bloques';
import { Bloques2Service } from '../../../services/bloques2.service';
import { FacultadesService } from '../../../services/facultades.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrl: './bloques.component.css'
})
export class BloquesComponent {
  tooltipVisible: boolean = false;
  bloques: any = [];
  facultades: any[] = [];
  filterOptions: any = [];
  categories: { name: string; code: number }[] = [];
  selectedFacultad: any;

  id: string = '';
  nombre = '';
  id_facu_per: any;

  visible: boolean = false;
  esEdicion: boolean = false;
  soloLetrasRegex = /^[a-zA-Z]*$/;
  soloNumerosRegex = /^[0-9]*$/;
  selectedRepresentatives: any[] = [];
  representatives: any[] = [];

  rolUsuario: number | null = null;

  constructor(private authServices: AuthService, private confirmationService: ConfirmationService, private facultadesService: FacultadesService,private bloquesService: Bloques2Service, private messageService: MessageService) { }

  matchModeOptions = [
    { label: 'Empieza con', value: 'startsWith' },
    { label: 'Termina con', value: 'endsWith' },
    { label: 'Contiene', value: 'contains' },
    { label: 'Es igual a', value: 'equals' },
    { label: 'No es igual a', value: 'notEquals' },
  ];

  ngOnInit(): void {
    this.listarBloques();
    this.listarFacultades();
    this.listarFacultadesComboBox();
    this.obtenerRolUsuario();
  }

  obtenerRolUsuario(): void {
    this.rolUsuario = this.authServices.getUserRole();
  }

  listarBloques(): void {
    this.bloquesService.obtenerBloques().subscribe(
      (response: any) => {
        if (response) {
          this.bloques = response;
        } else {
          this.bloques = [];
        }
      },
      (error) => {
        console.error('Error al obtener bloques:', error);
      }
    );
  }

  listarFacultades(): void {
    this.facultadesService.obtenerFacultades().subscribe(
      (response: any) => {
        if (response && response.facultades) {
          this.facultades = response.facultades;
        } else {
          this.facultades = [];
        }
      },
      (error) => {
        console.error('Error al obtener las facultades:', error);
      }
    );
  }

  listarFacultadesComboBox(): void {
    this.facultadesService.obtenerFacultades().subscribe(
      (response: any) => {
        if (response && response.facultades) {
          this.representatives = Array.from(new Set(response.facultades.map((facultad: any) => facultad.nombre)))
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

  registrarBloque() {
    if (this.nombre == '' || !this.selectedFacultad) {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.bloquesService.insertarBloque(this.nombre, this.selectedFacultad.id_facultad).subscribe(
        (response) => {
          this.mostrarMensaje("Bloque registrado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarBloques();
        },
        (error) => {
          this.mostrarMensaje("Error en el servidor", false);
        }
      )
    };
  }

  eliminarBloque(id: string) {
    this.bloquesService.eliminarBloque(id).subscribe(
      (response) => {
        this.mostrarMensaje("Bloque eliminado con éxito", true);
        this.listarBloques();
      },
      (error) => {
        this.mostrarMensaje("Error al eliminar el Bloque", false);
      }
    );
  }

  editarBloque() {
    if (this.nombre == '' || !this.selectedFacultad) {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.bloquesService.actualizarBloque(this.id, this.nombre, this.selectedFacultad.id_facultad).subscribe(
        (response) => {
          this.mostrarMensaje("Bloque actualizado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarBloques();
        },
        (error) => {
          this.mostrarMensaje("Hubo un problema", false);
        }
      )
    };
  }

  confirm(id: string) {
    this.confirmationService.confirm({
      message: 'Támbien se eliminaran las áreas asignadas al bloque',
      header: '¿Está seguro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarBloque(id);
        this.listarBloques();
      },
      reject: () => {
        console.log("rechazado");
      }
    });
  }

  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

  showDialogAgregar() {
    this.esEdicion = false;
    this.visible = true;
    this.limpiarFormulario();
  }

  showDialogEditar(bloque: any) {
    this.esEdicion = true;
    this.nombre = bloque.nombre;
    this.selectedFacultad = this.facultades.find(facu => facu.id_facultad === bloque.id_facu_per);
    this.id = bloque.id_bloque;
    this.visible = true;
  }

  async mostrarMensaje(mensaje: string, exito: boolean) {
    this.messageService.add(
      {
        severity: exito ? 'success' : 'error',
        summary: exito ? 'Éxito' : 'Error', detail: mensaje
      });
  }

  handleInput(event: any) {
    const inputValue = event.target.value;
    if (!this.soloLetrasRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/[^a-zA-Z\s]/g, '');
    }
  }

  handleInputNumbers(event: any) {
    const inputValue = event.target.value;
    if (!this.soloNumerosRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '');
    }
  }

  limpiarFormulario() {
    this.nombre = '';
    this.selectedFacultad = null;
  }
}