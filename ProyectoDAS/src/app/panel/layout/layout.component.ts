import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TopbarComponent } from '../topbar/topbar.component';
import { LayoutService } from '../service/app.layout.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ScannerService } from '../../services/scanner.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})

export class LayoutComponent   {
  displayQRScanner: boolean = false;
  permissionError: boolean = false;
  permissionRequested: boolean = false;

  overlayMenuOpenSubscription: Subscription;
  menuOutsideClickListener: any;

  profileMenuOutsideClickListener: any;
  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;
  @ViewChild(TopbarComponent) appTopbar!: TopbarComponent;

  constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router, private scannerService: ScannerService) {
      this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
          if (!this.menuOutsideClickListener) {
              this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                  const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target) 
                      || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
                  
                  if (isOutsideClicked) {
                      this.hideMenu();
                  }
              });
          }

          if (!this.profileMenuOutsideClickListener) {
              this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                  const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
                      || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

                  if (isOutsideClicked) {
                      this.hideProfileMenu();
                  }
              });
          }

          if (this.layoutService.state.staticMenuMobileActive) {
              this.blockBodyScroll();
          }
      });

      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(() => {
              this.hideMenu();
              this.hideProfileMenu();
          });
  }

  showQRScanner2(): void {
    this.displayQRScanner = true;
    this.permissionError = false; // Reinicia el estado de permiso denegado
    this.permissionRequested = true; // Se establece que se ha solicitado el permiso
  }

  getDialogStyle() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia("(max-width: 768px)").matches) {
        return { 'width': '90%' };
      } else {
        return { 'width': '40%' };
      }
    } else {
      return { 'width': '50%' };
    }
  }

  onCodeResult(result: string): void {
    this.displayQRScanner = false;
    console.log('QR Code Result:', result);
    const regex = /id_bien_tec:\s*(\d+)/; 
    const match = result.match(regex);
    if (match && match.length > 1) {
      const id = match[1];
      this.scannerService.setScannedCode(id); 
      this.router.navigateByUrl('/panel/inventarios/tecnologicos');
    } else {
      //console.error('No se pudo extraer el ID del resultado del escaneo:', result);
    }
  }

  camerasFoundHandler(devices: MediaDeviceInfo[]): void {
    console.log(devices);
  }

  onModalHide(): void {
    this.displayQRScanner = false;
  }

  onPermissionError(err: any): void {
    console.error('Error al solicitar permisos de cámara:', err);
    if (!this.permissionRequested) {
      this.permissionRequested = true; 
      this.showQRScanner2(); 
    } else {
      this.permissionError = true; 
      this.displayQRScanner = false;
    }
  }

  retryPermission(): void {
    this.permissionError = false;
    this.showQRScanner2();
  }

  hideMenu() {
      this.layoutService.state.overlayMenuActive = false;
      this.layoutService.state.staticMenuMobileActive = false;
      this.layoutService.state.menuHoverActive = false;
      if (this.menuOutsideClickListener) {
          this.menuOutsideClickListener();
          this.menuOutsideClickListener = null;
      }
      this.unblockBodyScroll();
  }

  hideProfileMenu() {
      this.layoutService.state.profileSidebarVisible = false;
      if (this.profileMenuOutsideClickListener) {
          this.profileMenuOutsideClickListener();
          this.profileMenuOutsideClickListener = null;
      }
  }

  blockBodyScroll(): void {
      if (document.body.classList) {
          document.body.classList.add('blocked-scroll');
      }
      else {
          document.body.className += ' blocked-scroll';
      }
  }

  unblockBodyScroll(): void {
      if (document.body.classList) {
          document.body.classList.remove('blocked-scroll');
      }
      else {
          document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
              'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
  }

  get containerClass() {
      return {
          'layout-theme-light': this.layoutService.config().colorScheme === 'light',
          'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
          'layout-overlay': this.layoutService.config().menuMode === 'overlay',
          'layout-static': this.layoutService.config().menuMode === 'static',
          'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
          'layout-overlay-active': this.layoutService.state.overlayMenuActive,
          'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
          'p-input-filled': this.layoutService.config().inputStyle === 'filled',
          'p-ripple-disabled': !this.layoutService.config().ripple
      }
  }

  ngOnDestroy() {
      if (this.overlayMenuOpenSubscription) {
          this.overlayMenuOpenSubscription.unsubscribe();
      }

      if (this.menuOutsideClickListener) {
          this.menuOutsideClickListener();
      }
  }
}
