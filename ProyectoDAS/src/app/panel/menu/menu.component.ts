import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
    model: any[] = [];
    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/panel/'] }
                ]
            },
            {
                label: 'Opciones',
                items: [
                    {
                        label: 'Personal', icon: 'pi pi-id-card',
                        items: [
                            {
                                label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/panel/personal/usuarios']
                            },
                            {
                                label: 'Encargados', icon: 'pi pi-user-plus', routerLink: ['/panel/personal/encargados']
                            }
                        ]
                    },
                    {
                        label: 'Inventario', icon: 'pi pi-box',
                        items: [
                            {
                                label: 'Tipos de Equipos', icon: 'pi pi-th-large', routerLink: ['/panel/inventarios/tiposequipos']
                            },
                            {
                                label: 'Bienes Tecnológicos', icon: 'pi pi-desktop', routerLink: ['/panel/inventarios/tecnologicos']
                            },
                            {
                                label: 'Bienes Mobiliarios', icon: 'pi pi-building-columns', routerLink: ['/panel/inventarios/mobiliarios'], get iconHtml() {
                                    return this.icon;
                                }
                            },
                            {
                                label: 'Componentes', icon: 'pi pi-microchip', routerLink: ['/panel/inventarios/componentes']
                            }
                        ]
                    },
                    {
                        label: 'Infraestructura', icon: 'pi pi-hammer',
                        items: [
                            {
                                label: 'Facultades', icon: 'pi pi-graduation-cap', routerLink: ['/panel/infraestructura/facultades'], get iconHtml() {
                                    return this.icon;
                                }
                            },
                            {
                                label: 'Bloques', icon: 'pi pi-building', routerLink: ['/panel/infraestructura/bloques']
                            },
                            {
                                label: 'Áreas', icon: 'pi pi-map-marker', routerLink: ['/panel/infraestructura/areas']
                            }
                        ]
                    },
                    { label: 'Programas', icon: 'pi pi-microsoft', routerLink: ['/panel/programas'] },
                    { label: 'Proveedores', icon: 'pi pi-truck', routerLink: ['/panel/proveedores'] },
                    { label: 'Historial', icon: 'pi pi-history', routerLink: ['/panel/historial'] },
                    {
                        label: 'Reportes', icon: 'pi pi-file',
                        items: [
                            {
                                label: 'Reporte General',
                                icon: 'pi pi-file-pdf',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Reporte por Laboratorios',
                                icon: 'pi pi-file-pdf',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                ]
            }
        ];
    }
}
