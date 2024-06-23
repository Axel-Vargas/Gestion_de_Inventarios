import { Component } from '@angular/core';
import { BienestecnologicosService } from '../../services/bienestecnologicos.service';
import { MobiliariosService } from '../../services/mobiliarios.service';
import { bienes_Tecnologicos } from '../api/bienesTecnologicos';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { catchError, forkJoin, of } from 'rxjs';
import QRCode from 'qrcode';
import * as XLSX from 'xlsx';

import { AreaMobiliarioService } from '../../services/area.mobiliario.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  id: string = '';
  reportes: any[] = [];
  areas: any[] = [];
  visible: boolean = false;
  qrVisible: boolean = false;
  selectedArea: any;
  selectedAreaQR: any;
  reportesDITIC: any[] = [];
  reportesUPE: any[] = [];
  reportesREDES: any[] = [];
  selectReporte: any;
  tecnologicosCompleto!: bienes_Tecnologicos[];
  tecnologicosCompletoUPE!: bienes_Tecnologicos[];
  mobiliariosCompleto: any = [];
  tecnologicosPorArea!: bienes_Tecnologicos[];

  displayPDFDialog: boolean = false;
  selectedDepartamento = { name: 'DITIC', code: 'DITIC' };

  departamentos = [
    { name: 'DITIC', code: 'DITIC' },
    { name: 'UPE', code: 'UPE' },
    { name: 'Administrador de Redes', code: 'REDES' },
  ];

  computadorasDeEscritorio: bienes_Tecnologicos[] = [];

  constructor(private bienesTecnologicosService: BienestecnologicosService, private bienesMobiliariosService: MobiliariosService, private areasService: AreaMobiliarioService) { }

  ngOnInit() {
    this.reportes = [
      { name: 'DITIC', code: 1 },
      { name: 'UPE', code: 2 },
      { name: 'Administrador de Redes', code: 3 },
    ];

    this.reportesDITIC = [
      { tipo: 'Reporte Completo', descripcion: 'Se mostrará un reporte de todos los computadores existentes', code: 1 },
      { tipo: 'Reporte QR', descripcion: 'Se mostrarán todos los computadores existentes con su respectivo QR', code: 2 },
      { tipo: 'Reporte por Áreas', descripcion: 'Se mostrará un reporte de los computadores por el área seleccionada', code: 3 },

    ];

    this.reportesUPE = [
      { tipo: 'Reporte Completo', descripcion: 'Se mostrará un reporte de todos los bienes de la facultad', code: 1 },
      { tipo: 'Reporte de Bienes Tecnológicos', descripcion: 'Se mostrará un reporte de todos los bienes tecnológicos', code: 2 },
      { tipo: 'Reporte de Bienes Mobiliarios', descripcion: 'Se mostrará un reporte de todos los bienes mobiliarios', code: 3 }
    ];

    this.reportesREDES = [
      { tipo: 'Reporte Completo por Fecha', descripcion: 'Se mostrará un reporte de todos los bienes de la facultad por la fecha de adquisición', code: 1 },
      { tipo: 'Reporte Completo por Áreas', descripcion: 'Se mostrará un reporte de todos los bienes de la facultad por el área', code: 2 },
      { tipo: 'Reporte Completo por Estado', descripcion: 'Se mostrará un reporte de todos los bienes de la facultad por el estado', code: 3 },
      { tipo: 'Reporte Completo por Encargado', descripcion: 'Se mostrará un reporte de todos los bienes de la facultad por el encargado', code: 4 }
    ];

    this.onDepartamentoChange({ value: this.selectedDepartamento });
  }

  onDepartamentoChange(event: any) {
    if (event.value.code === 'DITIC') {
      this.reportes = this.reportesDITIC;
    } else if (event.value.code === 'UPE') {
      this.reportes = this.reportesUPE;
    } else if (event.value.code === 'REDES') {
      this.reportes = this.reportesREDES;
    }

    this.loadComputadorasDeEscritorio();
    this.loadMobiliarios();
    this.loadTecnologicos();
    this.listarAreas();
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

  loadComputadorasDeEscritorio(): void {
    forkJoin({
      bienesTecnologicos: this.bienesTecnologicosService.getComputadorasDeEscritorio(),
    })
      .pipe(
        catchError((error) => {
          console.error('Error al cargar datos', error);
          return [];
        })
      )
      .subscribe(({ bienesTecnologicos }) => {
        bienesTecnologicos.forEach((t) => {
          if (t.atributos && typeof t.atributos === 'string') {
            try {
              t.atributos = JSON.parse(t.atributos);
            } catch (error) {
              console.error('Error parsing JSON for product:', t);
            }
          }
        });
        this.tecnologicosCompleto = bienesTecnologicos.map((t) => ({
          ...t,
          nombre_area: t.nombre_area,
        }));
      });
  }

  loadTecnologicos(): void {
    forkJoin({
      bienesTecnologicos: this.bienesTecnologicosService.getBienesTecnologicos(),
    })
      .pipe(
        catchError((error) => {
          console.error('Error al cargar datos', error);
          return [];
        })
      )
      .subscribe(({ bienesTecnologicos }) => {
        bienesTecnologicos.forEach((t) => {
          if (t.atributos && typeof t.atributos === 'string') {
            try {
              t.atributos = JSON.parse(t.atributos);
            } catch (error) {
              console.error('Error parsing JSON for product:', t);
            }
          }
        });
        this.tecnologicosCompletoUPE = bienesTecnologicos.map((t) => ({
          ...t,
          nombre_area: t.nombre_area,
        }));
      });
  }

  async loadComputadorasPorArea(idArea: number): Promise<void> {
    try {
      const result = await forkJoin({
        bienesTecnologicos: this.bienesTecnologicosService.getComputadorasPorAreas(idArea)
      }).pipe(
        catchError((error) => {
          console.error('Error fetching data:', error);
          return of(undefined); // Retorna un observable de undefined en caso de error
        })
      ).toPromise();

      if (result === undefined) {
        console.error('No se obtuvieron bienes tecnológicos para el área con ID:', idArea);
        return; // Salir de la función si no se obtuvieron datos válidos
      }

      const bienesTecnologicos = result.bienesTecnologicos;

      bienesTecnologicos.forEach((t) => {
        if (t.atributos && typeof t.atributos === 'string') {
          try {
            t.atributos = JSON.parse(t.atributos);
          } catch (error) {
            console.error('Error parsing JSON for product:', t);
          }
        }
      });

      this.tecnologicosPorArea = bienesTecnologicos;
    } catch (error) {
      console.error('Error al cargar datos:', error);
      throw error; // Propagar el error para manejarlo en un nivel superior si es necesario
    }
  }

  loadMobiliarios(): void {
    this.bienesMobiliariosService.obtenerMobiliarios().subscribe(
      (response: any) => {
        if (response && response.mobiliarios) {
          this.mobiliariosCompleto = response.mobiliarios;
        } else {
          this.mobiliariosCompleto = [];
        }
      },
      (error) => {
        console.error('Error al obtener mobiliarios:', error);
      }
    );
  }

  generateQRCode(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(url)
        .then(dataURL => resolve(dataURL))
        .catch(err => reject(err));
    });
  }

  //REPORTES DE DITIC
  mostrarDialogoPDFDITIC(tipoReporte: number, tipoReporteStr: string) {
    if (tipoReporte === 3) {
      this.showDialog(this.selectedArea);
    } else if (tipoReporte === 2) {
      this.showDialogQR(this.selectedAreaQR);
    } else {
      this.descargarPDFCompletoDITIC();
    }
  }

  mostrarDialogoEXCELDITIC(tipoReporte: number, tipoReporteStr: string) {
    if (tipoReporte === 3) {
      this.showDialog(this.selectedArea);
    } else if (tipoReporte === 1) {
      this.descargarExcelCompletoDITIC();
    }
  }

  async descargarPDFCompletoDITIC() {
    const pdf = new jsPDF('landscape');
    pdf.text('Reporte de Computadoras de Escritorio', 10, 10);

    const groupedByArea = this.groupByAreaDITIC(this.tecnologicosCompleto);

    let startY = 20;

    Object.keys(groupedByArea).forEach((area, index) => {
      if (index > 0) {
        pdf.addPage();
        startY = 20;
      }

      const data = groupedByArea[area].map((comp) => [
        comp.nombre || '',
        comp.marca || '',
        comp.modelo || '',
        comp.num_serie || '',
        comp.atributos.Procesador || '',
        comp.atributos.Memoria || '',
        comp.atributos.Disco || '',
        comp.atributos.IP || '',
        comp.nombre_area || '',
        comp.localizacion || '',
        comp.estado || '',
        comp.nombre_encargado || '',
        comp.codigoUTA || '',
        comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
      ]);

      const headers = [
        [{ content: `${area.toUpperCase()}`, colSpan: 14 }],
        ['Bien', 'Marca', 'Modelo', 'N. Serie', 'Procesador', 'Memoria', 'Disco Duro', 'IP', 'Localización', 'Ubicación', 'Estado', 'Custodio Actual', 'Código UTA', 'Fecha Adquisición'],
      ];

      autoTable(pdf, {
        startY: 20,
        head: headers,
        body: data,
        theme: 'striped',
        styles: {
          fontSize: 8,
          valign: 'middle',
          halign: 'center'
        },
        margin: { bottom: 25 }
      });

    });

    pdf.save('Inventario_PC_FISEI.pdf');
  }

  groupByAreaDITIC(tecnologicosCompleto: any[]) {
    const grouped: { [key: string]: any[] } = {};
    tecnologicosCompleto.forEach((comp) => {
      const area = comp.nombre_area || 'Sin especificar';
      if (!grouped[area]) {
        grouped[area] = [];
      }
      grouped[area].push(comp);
    });
    return grouped;
  }

  async descargarQRDitic() {
    try {
      await this.loadComputadorasPorArea(this.selectedAreaQR.id_area);
  
      const pdf = new jsPDF('portrait');
  
      const data = this.tecnologicosPorArea.map((comp) => [
        '',
        'Num. serie: ' + (comp.num_serie || '') + '\nIP: ' + (comp.atributos?.IP || ''),
        'Máscara: ' + (comp.atributos?.Mascara || '') + '\nGateway: ' + (comp.atributos?.Gateway || ''),
        'Ubicación: ' + (comp.localizacion || '') + '\nCódigo UTA: ' + (comp.codigoUTA || '')
      ]);
  
      const qrImagesPromises = this.tecnologicosPorArea.map(async (comp) => {
        try {
          const response = await fetch(comp.image || '');
          const blob = await response.blob();
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error('Error al cargar la imagen QR:', error);
          return '';
        }
      });
  
      const qrImages = await Promise.all(qrImagesPromises);
  
      if (qrImages.length !== this.tecnologicosPorArea.length) {
        console.error('El número de imágenes QR no coincide con el número de computadoras.');
        return;
      }
  
      autoTable(pdf, {
        startY: 5,
        body: data.map((row, index) => {
          if (qrImages[index]) {
            row[0] = ' '; // Puedes usar un espacio en blanco para evitar errores
          }
          return row;
        }),
        theme: 'striped',
        columnStyles: {
          0: { cellWidth: 20, minCellHeight: 20 }, // Ajustar el ancho de la columna QR
          1: { cellWidth: 30 }, // Ajustar el ancho de la columna N. Serie
          2: { cellWidth: 30 }, // Ajustar el ancho de la columna IP
          3: { cellWidth: 30 }  // Ajustar el ancho de la columna Máscara de Red
        },
        margin: { left: 5, bottom: 25 }, // Ajustar los márgenes
        didDrawCell: (data) => {
          if (data.section === 'body' && data.column.index === 0 && qrImages[data.row.index]) {
            pdf.addImage(qrImages[data.row.index], 'PNG', data.cell.x + 1, data.cell.y + 1, 18, 18);
          }
        },
        styles: {
          fontSize: 8,
          valign: 'middle'
        }
      });
  
      pdf.save('QR_PC_FISEI.pdf');
  
    } catch (error) {
      console.error('Error al generar el reporte QR:', error);
    }
  }
  showDialog(area: any) {
    this.visible = true;
    this.selectedArea = area;
    this.selectedAreaQR = null;

  }

  showDialogQR(area: any) {
    this.qrVisible = true;
    this.selectedAreaQR = area;
    this.selectedArea = null;
  }

  async descargarPDFPorAreaDITIC() {
    this.loadComputadorasPorArea(this.selectedArea.id_area);
    const pdf = new jsPDF('landscape');

    const areaName = this.selectedArea.nombre;
    pdf.text(`Reporte de Computadoras por: ${areaName}`, 10, 10);

    const headers = ['Bien', 'Marca', 'Modelo', 'N. Serie', 'Procesador', 'Memoria', 'Disco Duro', 'IP', 'Localización', 'Ubicación', 'Estado', 'Custodio Actual', 'Código UTA', 'Fecha Adquisición'];

    this.bienesTecnologicosService.getComputadorasPorAreas(this.selectedArea.id_area).subscribe(() => {
      const data = this.tecnologicosPorArea.map((comp, index) => [
        comp.nombre || '',
        comp.marca || '',
        comp.modelo || '',
        comp.num_serie || '',
        comp.atributos.Procesador || '',
        comp.atributos.Memoria || '',
        comp.atributos.Disco || '',
        comp.atributos.IP || '',
        comp.nombre_area || '',
        comp.localizacion || '',
        comp.estado || '',
        comp.nombre_encargado || '',
        comp.codigoUTA || '',
        comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
      ]);

      autoTable(pdf, ({
        startY: 20,
        head: [headers],
        body: data,
        styles: {
          fontSize: 8,
          valign: 'middle'
        }
      }));

      pdf.save('INVENTARIO_PC_POR_AREA.pdf');
    });
  };


  async descargarExcelCompletoDITIC() {
    const headers = ['Bien', 'Marca', 'Modelo', 'N. Serie', 'Procesador', 'Memoria', 'Disco Duro', 'IP', 'Localización', 'Ubicación', 'Estado', 'Custodio Actual', 'Código UTA', 'Fecha Adquisición'];
    const data = this.tecnologicosCompleto.map((comp, index) => [
      comp.nombre || '',
      comp.marca || '',
      comp.modelo || '',
      comp.num_serie || '',
      comp.atributos.Procesador || '',
      comp.atributos.Memoria || '',
      comp.atributos.Disco || '',
      comp.atributos.IP || '',
      comp.nombre_area || '',
      comp.localizacion || '',
      comp.estado || '',
      comp.nombre_encargado || '',
      comp.codigoUTA || '',
      comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte Completo');

    XLSX.writeFile(workbook, 'INVENTARIO_PC_FISEI.xlsx');
  }

  async descargarExcelPorAreaDITIC() {
    this.loadComputadorasPorArea(this.selectedArea.id_area);

    this.bienesTecnologicosService.getComputadorasPorAreas(this.selectedArea.id_area).subscribe((computadoras) => {
      const headers = ['Bien', 'Marca', 'Modelo', 'N. Serie', 'Procesador', 'Memoria', 'Disco Duro', 'IP', 'Localización', 'Ubicación', 'Estado', 'Custodio Actual', 'Código UTA', 'Fecha Adquisición'];

      const data = this.tecnologicosPorArea.map((comp, index) => [
        comp.nombre || '',
        comp.marca || '',
        comp.modelo || '',
        comp.num_serie || '',
        comp.atributos.Procesador || '',
        comp.atributos.Memoria || '',
        comp.atributos.Disco || '',
        comp.atributos.IP || '',
        comp.nombre_area || '',
        comp.localizacion || '',
        comp.estado || '',
        comp.nombre_encargado || '',
        comp.codigoUTA || '',
        comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
      ]);

      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte por Área');

      XLSX.writeFile(workbook, 'INVENTARIO_PC__POR_AREA.xlsx');
    });
  }

  //REPORTES UPE
  mostrarDialogoPDFUPE(tipoReporte: number, tipoReporteStr: string) {
    if (tipoReporte === 1) {
      this.descargarPDFCompletoUPE();
    } else if (tipoReporte === 2) {
      this.descargarPDFTecnologicosUPE();
    } else {
      this.descargarPDFMobiliariosUPE();
    }
  }

  mostrarDialogoEXCELUPE(tipoReporte: number, tipoReporteStr: string) {
    if (tipoReporte === 1) {
      this.descargarExcelCompletoUPE();
    } else if (tipoReporte === 2) {
      this.descargarExcelTecnologicosUPE();
    } else {
      this.descargarExcelMobiliariosUPE();
    }
  }

  async descargarPDFCompletoUPE() {
    this.bienesTecnologicosService.getBienesTecnologicos().subscribe((tecnologicos) => {
      this.tecnologicosCompleto = tecnologicos;
      this.bienesMobiliariosService.obtenerMobiliarios().subscribe((response: any) => {

        const pdf = new jsPDF('landscape');
        pdf.text('Reporte Completo de Bienes Tecnológicos y Mobiliarios', 10, 10);

        const groupedByArea = this.groupByAreaUPE(this.tecnologicosCompleto, response.mobiliarios, this.areas);
        let startY = 20;

        Object.keys(groupedByArea).forEach((area, index) => {

          const dataTecnologicos = groupedByArea[area].tecnologicos.map((comp: any) => [
            comp.nombre || '',
            comp.marca || '',
            comp.modelo || '',
            comp.num_serie || '',
            comp.material || '',
            comp.color || '',
            comp.nombre_area || '',
            comp.localizacion || '',
            comp.estado || '',
            comp.codigoUTA || '',
            comp.nombre_encargado || '',
            comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
          ]);

          const dataMobiliarios = response.mobiliarios.filter((mobiliario: any) => mobiliario.nombre_area === area).map((mobiliario: any) => [
            mobiliario.nombre || '',
            mobiliario.marca || '',
            mobiliario.modelo || '',
            mobiliario.num_serie || '',
            mobiliario.material || '',
            mobiliario.color || '',
            mobiliario.nombre_area || '',
            mobiliario.localizacion || '',
            mobiliario.estado || '',
            mobiliario.codigoUTA || '',
            mobiliario.nombre_encargado + ' ' + mobiliario.apellido_encargado || '',
            mobiliario.fecha_adquisicion ? new Date(mobiliario.fecha_adquisicion).toLocaleDateString() : ''
          ]);

          if (dataTecnologicos.length === 0 && dataMobiliarios.length === 0) {
            return;
          }

          if (index > 0) {
            pdf.addPage();
            startY = 20;
          }

          const headers = [
            [{ content: `${area.toUpperCase()}`, colSpan: 14 }],
            ['Bien', 'Marca', 'Modelo', 'N. Serie', 'Material', 'Color', 'Localización', 'Ubicación', 'Estado', 'Código UTA', 'Custodio Actual', 'Fecha Adquisición'],
          ];
          const combinedData = [...dataTecnologicos, ...dataMobiliarios];

          autoTable(pdf, {
            startY: 20,
            head: headers,
            body: combinedData,
            theme: 'striped',
            styles: {
              fontSize: 8,
              valign: 'middle',
              halign: 'center'
            },
            margin: { bottom: 25 },
          });
        });
        pdf.save('INVENTARIO_BIENES_UPE.pdf');
      });
    });
  }

  groupByAreaUPE(tecnologicos: any[], mobiliarios: any[], areas: any[]) {
    const grouped: { [key: string]: { tecnologicos: any[], mobiliarios: any[] } } = {};

    // Inicializar grupos vacíos para todas las áreas
    areas.forEach(area => {
      grouped[area.nombre] = { tecnologicos: [], mobiliarios: [] };
    });

    // Agrupar bienes tecnológicos
    tecnologicos.forEach((comp) => {
      const area = comp.nombre_area || 'Sin especificar';
      if (grouped[area]) {
        grouped[area].tecnologicos.push(comp);
      } else {
        grouped['Sin especificar'].tecnologicos.push(comp);
      }
    });

    // Agrupar bienes mobiliarios
    mobiliarios.forEach((comp) => {
      const area = comp.nombre_area || 'Sin especificar';
      if (grouped[area]) {
        grouped[area].mobiliarios.push(comp);
      } else {
        grouped['Sin especificar'].mobiliarios.push(comp);
      }
    });

    return grouped;
  }

  async descargarExcelCompletoUPE() {
    this.bienesTecnologicosService.getBienesTecnologicos().subscribe((tecnologicos) => {
      this.tecnologicosCompleto = tecnologicos;
      this.bienesMobiliariosService.obtenerMobiliarios().subscribe((response: any) => {
        const headers = ['Bien', 'Marca', 'Modelo', 'N. Serie', 'Material', 'Color', 'Localización', 'Ubicación', 'Estado', 'Código UTA', 'Custodio Actual', 'Fecha Adquisición'];

        const dataTecnologicos = this.tecnologicosCompleto.map((comp: any) => [
          comp.nombre || '',
          comp.marca || '',
          comp.modelo || '',
          comp.num_serie || '',
          comp.material || '',
          comp.color || '',
          comp.nombre_area || '',
          comp.localizacion || '',
          comp.estado || '',
          comp.codigoUTA || '',
          comp.nombre_encargado || '',
          comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
        ]);

        const dataMobiliarios = response.mobiliarios.map((mobiliario: any) => [
          mobiliario.nombre || '',
          mobiliario.marca || '',
          mobiliario.modelo || '',
          mobiliario.num_serie || '',
          mobiliario.material || '',
          mobiliario.color || '',
          mobiliario.nombre_area || '',
          mobiliario.localizacion || '',
          mobiliario.estado || '',
          mobiliario.codigoUTA || '',
          mobiliario.nombre_encargado + ' ' + mobiliario.apellido_encargado || '',
          mobiliario.fecha_adquisicion ? new Date(mobiliario.fecha_adquisicion).toLocaleDateString() : ''
        ]);

        const combinedData = [headers, ...dataTecnologicos, ...dataMobiliarios];

        const ws = XLSX.utils.aoa_to_sheet(combinedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Inventario');

        XLSX.writeFile(wb, 'INVENTARIO_BIENES_UPE.xlsx');
      });
    });
  }

  async descargarPDFTecnologicosUPE() {
    const pdf = new jsPDF('landscape');
    pdf.text('Reporte Completo de bienes Tecnológicos', 10, 10);

    const groupedByArea = this.groupByAreaTecUPE(this.tecnologicosCompletoUPE, this.areas);

    let startY = 20;

    Object.keys(groupedByArea).forEach((area, index) => {
      const data = groupedByArea[area].tecnologicos.map((comp: any) => [
        comp.nombre || '',
        comp.marca || '',
        comp.modelo || '',
        comp.num_serie || '',
        comp.atributos.IP || '',
        comp.atributos.Memoria || '',
        comp.atributos.Resolucion || '',
        comp.localizacion || '',
        comp.estado || '',
        comp.nombre_encargado || '',
        comp.codigoUTA || '',
        comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : '',
        comp.atributos.Cambio_lampara || '',
      ]);

      if (data.length === 0) {
        return;
      }

      if (index > 0) {
        pdf.addPage();
        startY = 20;
      }

      const headers = [
        [{ content: `${area.toUpperCase()}`, colSpan: 14 }],
        ['Bien', 'Marca', 'Modelo', 'N. Serie', 'IP', 'Memoria', 'Resolución', 'Ubicación', 'Estado', 'Custodio Actual', 'Código UTA', 'Fecha Adquisición', 'Fec. Cambio de Lente'],
      ];

      autoTable(pdf, {
        startY: 20,
        head: headers,
        body: data,
        theme: 'striped',
        styles: {
          fontSize: 8,
          valign: 'middle',
          halign: 'center'
        },
        margin: { bottom: 25 }
      });

    });

    pdf.save('INVENTARIO_BIENES_TECNOLOGICOS_UPE.pdf');
  }

  groupByAreaTecUPE(tecnologicos: any[], areas: any[]) {
    const grouped: { [key: string]: { tecnologicos: any[] } } = {};

    areas.forEach(area => {
      grouped[area.nombre] = { tecnologicos: [] };
    });

    tecnologicos.forEach((comp) => {
      const area = comp.nombre_area || 'Sin especificar';
      if (grouped[area]) {
        grouped[area].tecnologicos.push(comp);
      } else {
        if (!grouped['Sin especificar']) {
          grouped['Sin especificar'] = { tecnologicos: [] };
        }
        grouped['Sin especificar'].tecnologicos.push(comp);
      }
    });

    return grouped;
  }

  async descargarExcelTecnologicosUPE() {
    const headers = ['Bien', 'Marca', 'Modelo', 'N. Serie', 'IP', 'Memoria', 'Resolución', 'Localización', 'Ubicación', 'Estado', 'Custodio Actual', 'Código UTA', 'Fecha Adquisición', 'Fec. Cambio de Lente'];

    const data = this.tecnologicosCompletoUPE.map((comp: any) => [
      comp.nombre || '',
      comp.marca || '',
      comp.modelo || '',
      comp.num_serie || '',
      comp.atributos.IP || '',
      comp.atributos.Memoria || '',
      comp.atributos.Resolucion || '',
      comp.nombre_area,
      comp.localizacion || '',
      comp.estado || '',
      comp.nombre_encargado || '',
      comp.codigoUTA || '',
      comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : '',
      comp.atributos.Cambio_lampara || '',
    ]);

    if (data.length === 0) {
      return;
    }

    const worksheetData = [headers, ...data];
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario Tecnológicos');

    XLSX.writeFile(wb, 'INVENTARIO_BIENES_TECNOLOGICOS_UPE.xlsx');
  }

  async descargarPDFMobiliariosUPE() {
    this.bienesMobiliariosService.obtenerMobiliarios().subscribe((response: any) => {
      const pdf = new jsPDF('landscape');
      pdf.text('Reporte Completo de Bienes Mobiliarios', 10, 10);

      const groupedByArea = this.groupByAreaMobUPE(response.mobiliarios, this.areas);
      let startY = 20;

      Object.keys(groupedByArea).forEach((area, index) => {
        const dataMobiliarios = response.mobiliarios.filter((mobiliario: any) => mobiliario.nombre_area === area).map((mobiliario: any) => [
          mobiliario.nombre || '',
          mobiliario.marca || '',
          mobiliario.modelo || '',
          mobiliario.num_serie || '',
          mobiliario.material || '',
          mobiliario.color || '',
          mobiliario.localizacion || '',
          mobiliario.estado || '',
          mobiliario.codigoUTA || '',
          mobiliario.nombre_encargado + ' ' + mobiliario.apellido_encargado || '',
          mobiliario.fecha_adquisicion ? new Date(mobiliario.fecha_adquisicion).toLocaleDateString() : ''
        ]);

        if (dataMobiliarios.length === 0) {
          return;
        }

        if (index > 1) {
          pdf.addPage();
          startY = 20;
        }

        const headers = [
          [{ content: `${area.toUpperCase()}`, colSpan: 12 }],
          ['Bien', 'Marca', 'Modelo', 'N. Serie', 'Material', 'Color', 'Ubicación', 'Estado', 'Código UTA', 'Custodio Actual', 'Fecha Adquisición'],
        ];

        autoTable(pdf, {
          startY: 20,
          head: headers,
          body: dataMobiliarios,
          theme: 'striped',
          styles: {
            fontSize: 10,
            valign: 'middle',
            halign: 'center'
          },
          margin: { bottom: 25 },
        });
      });

      pdf.save('INVENTARIO_BIENES_MOBILIARIOS_UPE.pdf');
    });
  }

  groupByAreaMobUPE(mobiliarios: any[], areas: any[]) {
    const grouped: { [key: string]: { mobiliarios: any[] } } = {};

    areas.forEach(area => {
      grouped[area.nombre] = { mobiliarios: [] };
    });

    mobiliarios.forEach((mobiliario) => {
      const area = mobiliario.nombre_area || 'Sin especificar';
      if (grouped[area]) {
        grouped[area].mobiliarios.push(mobiliario);
      } else {
        if (!grouped['Sin especificar']) {
          grouped['Sin especificar'] = { mobiliarios: [] };
        }
        grouped['Sin especificar'].mobiliarios.push(mobiliario);
      }
    });

    return grouped;
  }

  async descargarExcelMobiliariosUPE() {
    try {
      const response: any = await new Promise((resolve, reject) => {
        this.bienesMobiliariosService.obtenerMobiliarios().subscribe(
          (data: any) => resolve(data),
          (error: any) => reject(error)
        );
      });

      const wb = XLSX.utils.book_new();

      const dataMobiliarios = response.mobiliarios.map((mobiliario: any) => ({
        'Bien': mobiliario.nombre || '',
        'Marca': mobiliario.marca || '',
        'Modelo': mobiliario.modelo || '',
        'N. Serie': mobiliario.num_serie || '',
        'Material': mobiliario.material || '',
        'Color': mobiliario.color || '',
        'Localización': mobiliario.nombre_area || '',
        'Ubicación': mobiliario.localizacion || '',
        'Estado': mobiliario.estado || '',
        'Código UTA': mobiliario.codigoUTA || '',
        'Custodio Actual': mobiliario.nombre_encargado + ' ' + mobiliario.apellido_encargado || '',
        'Fecha Adquisición': mobiliario.fecha_adquisicion ? new Date(mobiliario.fecha_adquisicion).toLocaleDateString() : ''
      }));

      const ws = XLSX.utils.json_to_sheet(dataMobiliarios);

      XLSX.utils.book_append_sheet(wb, ws, 'Mobiliarios');

      XLSX.writeFile(wb, 'INVENTARIO_BIENES_MOBILIARIOS_UPE.xlsx');
    } catch (error) {
      console.error('Error al obtener datos de mobiliarios:', error);
    }
  }
}