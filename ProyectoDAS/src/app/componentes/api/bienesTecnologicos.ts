import { Componentes } from "./componentes";

interface Estado {
    label: string;
    value: string;
}
export interface bienes_Tecnologicos {
    id_bien?: number;
    nombre?: string;
    atributos?: any;
    marca?: string;
    modelo?: string;
    num_serie?: string;
    fecha_adquisicion?: Date;
    //repotenciado?: Repotenciado;
    estado?: string;
    codigoUTA?: string;
    mascara?: string;
    gateway?: string;
    image?: string;
    localizacion?: string;
    id_encargado_per?:number;
    nombre_area?: string;
    nombre_encargado?: string;
    id_area_per?: number;
    //id_encargado_per?:string;
    id_proveedor_per?: number;
    componentes: Componentes[];
    material?: string;
    color?: string;
}