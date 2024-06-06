import { Component } from '@angular/core';
import { BienestecnologicosService } from '../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../api/bienesTecnologicos';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { catchError, forkJoin } from 'rxjs';
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
  selectedArea: any;
  reportesDITIC: any[] = [];
  reportesUPE: any[] = [];
  selectReporte: any;
  tecnologicosCompleto!: bienes_Tecnologicos[];
  tecnologicosPorArea!: bienes_Tecnologicos[];
  displayPDFDialog: boolean = false;
  selectedDepartamento = { name: 'DITIC', code: 'DITIC' };

  departamentos = [
    { name: 'DITIC', code: 'DITIC' },
    { name: 'UPE', code: 'UPE' }
  ];

  computadorasDeEscritorio: bienes_Tecnologicos[] = [];

  constructor(private bienesTecnologicosService: BienestecnologicosService, private areasService: AreaMobiliarioService) { }

  ngOnInit() {
    this.reportes = [
      { name: 'DITIC', code: 1 },
      { name: 'UPE', code: 2 },
    ];

    this.reportesDITIC = [
      { tipo: 'Reporte Completo', descripcion: 'Se mostrará un reporte de todos los computadores existentes', code: 1 },
      { tipo: 'Reporte por Áreas', descripcion: 'Se mostrará un reporte de los computadores por el área seleccionada', code: 2 }
    ];

    this.reportesUPE = [
      { tipo: 'Reporte Completo', descripcion: 'Se mostrará un reporte de todos los bienes de la facultad' },
      { tipo: 'Reporte de Bienes Tecnológicos', descripcion: 'Se mostrará un reporte de los bienes tecnológicos' },
      { tipo: 'Reporte de Mobiliarios', descripcion: 'Se mostrará un reporte de los bienes mobiliarios' }
    ];

    this.onDepartamentoChange({ value: this.selectedDepartamento });
    this.loadComputadorasDeEscritorio();
    this.listarAreas();
  }

  onDepartamentoChange(event: any) {
    if (event.value.code === 'DITIC') {
      this.reportes = this.reportesDITIC;
    } else if (event.value.code === 'UPE') {
      this.reportes = this.reportesUPE;
    }
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
        this.tecnologicosCompleto = bienesTecnologicos;
      });
  }

  loadComputadorasPorArea(idArea: number): void {
    forkJoin({
      bienesTecnologicos: this.bienesTecnologicosService.getComputadorasPorAreas(idArea),
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
        this.tecnologicosPorArea = bienesTecnologicos;
      });
  }


  generateQRCode(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(url)
        .then(dataURL => resolve(dataURL))
        .catch(err => reject(err));
    });
  }

  mostrarDialogoPDF(tipoReporte: number, tipoReporteStr: string) {
    if (tipoReporte === 2) {
      this.showDialog(this.selectedArea);
    } else {
      this.descargarPDFCompleto();
    }
  }

  mostrarDialogoEXCEL(tipoReporte: number, tipoReporteStr: string) {
    if (tipoReporte === 2) {
      this.showDialog(this.selectedArea);
    } else {
      this.descargarExcelCompleto();
    }
  }

  async descargarPDFCompleto() {
    const pdf = new jsPDF('landscape');
    pdf.text('Reporte de Computadoras de Escritorio', 10, 10);

    const headers = ['No.', 'QR', 'Marca', 'Modelo', 'N. Serie', 'Procesador','RAM','ROM','IP','Localización', 'Estado', 'Código UTA', 'Fecha Adquisición'];
    const data = this.tecnologicosCompleto.map((comp, index) => {
      
      return [
        index + 1,
        '',
        comp.marca || '',
        comp.modelo || '',
        comp.num_serie || '',
        comp.atributos.Procesador || '',
        comp.atributos.Memoria || '',
        comp.atributos.Disco || '',
        comp.atributos.IP || '',
        comp.localizacion || '',
        comp.estado || '',
        comp.codigoUTA || '',
        comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
      ];
    });

    const qrImages = await Promise.all(this.tecnologicosCompleto.map(async (comp) => {
      try {
        const response = await fetch(comp.image || '');
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Error al cargar la imagen QR:', error);
        return '';
      }
    }));

    if (qrImages.length !== this.tecnologicosCompleto.length) {
      console.error('El número de imágenes QR no coincide con el número de computadoras.');
      return;
    }

    // Agregar las imágenes QR al PDF
    data.forEach((row, index) => {
      row[1] = qrImages[index]; // Añadir la imagen QR en la columna QR
    });

    autoTable(pdf, ({
      startY: 20,
      head: [headers],
      body: data.map(row => row.map((cell, index) => {
        if (index === 1 && cell) {
          return { content: '', styles: { cellWidth: 30, cellHeight: 30 } };
        }
        return cell;
      })),
      theme: 'striped',
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 40, minCellHeight: 30 }
      },
      margin: { bottom: 25 },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 1 && qrImages[data.row.index]) {
          pdf.addImage(qrImages[data.row.index], 'PNG', data.cell.x + 1, data.cell.y + 1, 28, 28);
        }
      },
      styles: {
        fontSize: 10,
        valign: 'middle'
      }
    }));

    pdf.save('Inventario_PC_FISEI.pdf');
}

  showDialog(area: any) {
    this.visible = true;
    this.selectedArea = area;
  }

  async descargarPDFPorArea() {
    this.loadComputadorasPorArea(this.selectedArea.id_area);
    const pdf = new jsPDF('landscape');
    pdf.text('Reporte de Computadoras por Área', 10, 10);

    const headers = ['No.', 'QR', 'Marca', 'Modelo', 'N. Serie', 'Procesador','RAM','ROM','IP','Localización', 'Estado', 'Código UTA', 'Fecha Adquisición'];

    this.bienesTecnologicosService.getComputadorasPorAreas(this.selectedArea.id_area).subscribe((computadoras) => {
      const data = this.tecnologicosPorArea.map((comp, index) => [
        index + 1,
        '',
        comp.marca || '',
        comp.modelo || '',
        comp.num_serie || '',
        comp.atributos.Procesador || '',
        comp.atributos.Memoria || '',
        comp.atributos.Disco || '',
        comp.atributos.IP || '',
        comp.localizacion || '',
        comp.estado || '',
        comp.codigoUTA || '',
        comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
      ]);

      // Obtener las imágenes QR desde la URL y convertirlas a base64
      Promise.all(computadoras.map(async (comp) => {
        try {
          const response = await fetch(comp.image || '');
          const blob = await response.blob();
          const reader = new FileReader();
          return new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error('Error al cargar la imagen QR:', error);
          return '';
        }
      })).then((qrImages) => {
        if (qrImages.length !== computadoras.length) {
          console.error('El número de imágenes QR no coincide con el número de computadoras.');
          return;
        }

        // Agregar las imágenes QR al PDF
        data.forEach((row, index) => {
          row[1] = qrImages[index]; // Añadir la imagen QR en la columna QR
        });

        autoTable(pdf, ({
          startY: 20,
          head: [headers],
          body: data.map(row => row.map((cell, index) => {
            if (index === 1 && cell) {
              return { content: '', styles: { cellWidth: 30, cellHeight: 30 } };
            }
            return cell;
          })),
          theme: 'striped',
          columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 40, minCellHeight: 30 }
          },
          didDrawCell: (data) => {
            if (data.section === 'body' && data.column.index === 1 && qrImages[data.row.index]) {
              pdf.addImage(qrImages[data.row.index], 'PNG', data.cell.x + 1, data.cell.y + 1, 28, 28);
            }
          },
          styles: {
            fontSize: 10,
            valign: 'middle'
          }
        }));

        pdf.save('Reporte_por_area.pdf');
      });
    });
  }

  async descargarExcelCompleto() {
    const headers = ['No.', 'Nombre', 'Marca', 'Modelo', 'N. Serie', 'Procesador','Memoria','Disco Duro','IP','Localización', 'Estado', 'Código UTA', 'Fecha de Adquisición'];
    const data = this.tecnologicosCompleto.map((comp, index) => [
      index + 1,
      comp.nombre_bien || '',
      comp.marca || '',
      comp.modelo || '',
      comp.num_serie || '',
      comp.atributos.Procesador || '',
      comp.atributos.Memoria || '',
      comp.atributos.Disco || '',
      comp.atributos.IP || '',
      comp.localizacion || '',
      comp.estado || '',
      comp.codigoUTA || '',
      comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte Completo');

    XLSX.writeFile(workbook, 'Inventario_PC_FISEI.xlsx');
  }

  async descargarExcelPorArea() {
    this.loadComputadorasPorArea(this.selectedArea.id_area);

    this.bienesTecnologicosService.getComputadorasPorAreas(this.selectedArea.id_area).subscribe((computadoras) => {
      const headers = ['No.', 'Nombre', 'Marca', 'Modelo', 'N. Serie', 'Procesador','Memoria','Disco Duro','IP','Localización', 'Estado', 'Código UTA', 'Fecha de Adquisición'];

      const data = this.tecnologicosPorArea.map((comp, index) => [
        index + 1,
        comp.nombre_bien || '',
        comp.marca || '',
        comp.modelo || '',
        comp.num_serie || '',
        comp.atributos.Procesador || '',
        comp.atributos.Memoria || '',
        comp.atributos.Disco || '',
        comp.atributos.IP || '',
        comp.localizacion || '',
        comp.estado || '',
        comp.codigoUTA || '',
        comp.fecha_adquisicion ? new Date(comp.fecha_adquisicion).toLocaleDateString() : ''
      ]);

      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte por Área');

      XLSX.writeFile(workbook, 'Inventario_PC_FISEI_POR_AREA.xlsx');
    });
  }
}