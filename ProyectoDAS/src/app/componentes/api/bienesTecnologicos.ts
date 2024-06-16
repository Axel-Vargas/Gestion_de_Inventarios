import { Componentes } from "./componentes";

interface Estado {
    label: string;
    value: string;
}
export interface bienes_Tecnologicos {
    id_bien_tec?: number;
    nombre_bien?: string;
    atributos?: any;
    marca?: string;
    modelo?: string;
    num_serie?: string;
    fecha_adquisicion?: Date;
    //repotenciado?: Repotenciado;
    estado?: string;
    encargado?:string;
    codigoUTA?: string;
    image?: string;
    localizacion?: string;
    nombre_area?: string;
    nombre_encargado_completo?: string;
    id_area_per?: number;
    id_encargado_per?:string;
    id_proveedor_per?: number;
    componentes: Componentes[];
    material?: string;
    color?: string;
}