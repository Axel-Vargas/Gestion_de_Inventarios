import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
    model: any[] = [];
    userRole: number | null = null;

    constructor(public layoutService: LayoutService, public authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.userRole = this.authService.getUserRole();
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
                                label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/panel/personal/usuarios'], visible: this.userRole === 1
                            },
                            {
                                label: 'Encargados', icon: 'pi pi-user-plus', routerLink: ['/panel/personal/encargados'], visible: this.userRole === 1
                            }
                        ],
                        visible: this.userRole === 1
                    },
                    {
                        label: 'Inventario', icon: 'pi pi-box',
                        items: [
                            {
                                label: 'Bienes Tecnológicos', icon: 'pi pi-desktop', routerLink: ['/panel/inventarios/tecnologicos']
                            },
                            {
                                label: 'Bienes Mobiliarios', icon: 'pi pi-building-columns', routerLink: ['/panel/inventarios/mobiliarios'], get iconHtml() {
                                    return this.icon;
                                }
                            },
                            {
                                label: 'Tipos Tecnológicos', icon: 'pi pi-desktop', routerLink: ['/panel/inventarios/typeTechnological']
                            },
                            {
                                label: 'Componentes Libres', icon: 'pi pi-align-center', routerLink: ['/panel/inventarios/componentes']
                            }
                        ],
                        visible: this.userRole === 1 || this.userRole === 2
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
                        ],
                        visible: this.userRole === 1
                    },
                    { label: 'Softwares', icon: 'pi pi-microsoft', routerLink: ['/panel/programas'], visible: this.userRole === 1 || this.userRole === 2},
                    { label: 'Proveedores', icon: 'pi pi-truck', routerLink: ['/panel/proveedores'], visible: this.userRole === 1 || this.userRole === 2 },
                    { label: 'Reportes', icon: 'pi pi-file', routerLink: ['/panel/reportes'], visible: this.userRole === 1 || this.userRole === 2 || this.userRole === 3},
                ]
            },
            {
                label: 'Cerrar sesión',
                items: [
                    {
                        label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout()
                    }
                ]
            }
        ];
    }

    logout() {
        this.authService.removeUser();
        this.router.navigate(['']);
    }
}
