import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AreaMobiliarioService } from '../../../services/area.mobiliario.service';
import { Bloques2Service } from '../../../services/bloques2.service';
import { AuthService } from '../../../services/auth.service';
import { FacultadesService } from '../../../services/facultades.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent {
  tooltipVisible: boolean = false;
  areas: any = [];
  bloques: any[] = [];
  facultades: any[] = [];
  filterOptions: any = [];
  selectedBloque: any;
  selectedFacultad: any;
  selectPiso: any;

  id: string = '';
  nombre = '';
  pisos: any[] = [];

  visible: boolean = false;
  esEdicion: boolean = false;
  soloLetrasRegex = /^[a-zA-Z]*$/;
  soloNumerosRegex = /^[0-9]*$/;
  selectedRepresentatives: any[] = [];
  representatives: any[] = [];

  rolUsuario: number | null = null;

  constructor(private facultadesService:FacultadesService, private authServices: AuthService, private confirmationService: ConfirmationService, private areasService: AreaMobiliarioService, private bloquesService: Bloques2Service, private messageService: MessageService) { }

  matchModeOptions = [
    { label: 'Empieza con', value: 'startsWith' },
    { label: 'Termina con', value: 'endsWith' },
    { label: 'Contiene', value: 'contains' },
    { label: 'Es igual a', value: 'equals' },
    { label: 'No es igual a', value: 'notEquals' },
  ];

  ngOnInit(): void {
    this.listarAreas();
    this.listarBloques();
    this.listarBloquesComboBox();
    this.obtenerRolUsuario();
    this.listarfacultad();
    this.pisos = [
      { name: 'Planta Baja', code: 1 },
      { name: 'Primer Piso', code: 2 },
      { name: 'Segundo Piso', code: 3 },
      { name: 'Tercer Piso', code: 4 },
      { name: 'Cuarto Piso', code: 5 },
      { name: 'Quinto Piso', code: 6 },
    ];
  }

  obtenerRolUsuario(): void {
    this.rolUsuario = this.authServices.getUserRole();
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
        console.error('Error al obtener las facultades:', error);
      }
    );
  }

  onFacultadChange(event: any): void {
    const selectedFacultad = event.value;
    if (selectedFacultad && selectedFacultad.nombre) {
      this.listarBloquesFacultad(selectedFacultad.nombre);
    }
  }
  
  listarBloquesFacultad(nombre: string, callback?: () => void): void {
    this.bloquesService.getBloquesFacultad(nombre).subscribe(
      (response: any) => {
        if (response) {
          this.bloques = response;
        } else {
          this.bloques = [];
        }
        if (callback) {
          callback();
        }
      },
      (error) => {
        console.error('Error al obtener los bloques:', error);
        if (callback) {
          callback();
        }
      }
    );
  }
  
  listarfacultad(): void {
    this.facultadesService.obtenerFacultades().subscribe(
      (response: any) => {
        if (response) {
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

  listarBloquesComboBox(): void {
    this.bloquesService.obtenerBloques().subscribe(
      (response: any) => {
        if (response) {
          this.representatives = Array.from(new Set(response.map((bloque: any) => bloque.nombre)))
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
        console.error('Error al obtener bloques:', error);
      }
    );
  }

  registrarArea() {
    if (this.nombre.trim() === '' || !this.selectedBloque) {
      this.mostrarMensaje("Complete todos los campos", false);
    } else if (!this.soloLetrasRegex.test(this.nombre)) {
      this.mostrarMensaje("El nombre solo debe contener letras", false);
    } else if (this.nombre.length > 30) {
      this.mostrarMensaje("El nombre no debe exceder los 30 caracteres", false);
    } else {
      this.areasService.insertarArea(this.nombre, this.selectPiso.name, this.selectedBloque.id_bloque).subscribe(
        (response) => {
          this.mostrarMensaje("Área registrada con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarAreas();
        },
        (error) => {
          this.mostrarMensaje("Error en el servidor", false);
        }
      );
    }
  }

  eliminarArea(id: string) {
    this.areasService.eliminarArea(id).subscribe(
      (response) => {
        this.mostrarMensaje("Área eliminada con éxito", true);
        this.listarAreas();
      },
      (error) => {
        this.mostrarMensaje("Error al eliminar el Área", false);
      }
    );
  }

  editarArea() {
    if (this.nombre.trim() === '' || !this.selectedBloque) {
      this.mostrarMensaje("Complete todos los campos", false);
    } else if (!this.soloLetrasRegex.test(this.nombre)) {
      this.mostrarMensaje("El nombre solo debe contener letras", false);
    } else if (this.nombre.length > 30) {
      this.mostrarMensaje("El nombre no debe exceder los 30 caracteres", false);
    } else {
      this.areasService.actualizarArea(this.id, this.nombre, this.selectPiso.name, this.selectedBloque.id_bloque).subscribe(
        (response) => {
          this.mostrarMensaje("Área actualizada con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarAreas();
        },
        (error) => {
          this.mostrarMensaje("Hubo un problema", false);
        }
      );
    }
  }

  confirm(id: string) {
    this.confirmationService.confirm({
      message: 'Se eliminara el área de los bienes que ya hayan sidos <br> asignados a un área específica',
      header: '¿Está seguro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarArea(id);
        this.listarAreas();
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

  showDialogEditar(area: any) {
    this.esEdicion = true;
    this.nombre = area.nombre;
    this.selectPiso = this.pisos.find(piso => piso.name === area.num_piso);
    this.selectedFacultad = this.facultades.find(facultad => facultad.nombre === area.nombre_facultad);
    this.id = area.id_area;
    this.visible = true;
  
    if (this.selectedFacultad && this.selectedFacultad.nombre) {
      this.listarBloquesFacultad(this.selectedFacultad.nombre, () => {
        this.selectedBloque = this.bloques.find(bloque => bloque.id_bloque === area.id_bloque_per);
      });
    }
  }
  

async mostrarMensaje(mensaje: string, exito: boolean) {
  this.messageService.add({
    severity: exito ? 'success' : 'error',
    summary: exito ? 'Éxito' : 'Error',
    detail: mensaje
  });
}


  handleInput(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^a-zA-Z\s]/g, ''); // Remove non-letter characters
    if (inputValue.length > 30) {
      inputValue = inputValue.substring(0, 30); // Limit to 30 characters
    }
    event.target.value = inputValue;
    this.nombre = inputValue;
  }
  

  limpiarFormulario() {
    this.nombre = '';
    this.selectPiso = null;
    this.selectedBloque = null;
    this.selectedFacultad = null;
  }

  
}