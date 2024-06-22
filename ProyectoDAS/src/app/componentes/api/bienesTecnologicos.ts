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
    image?: string;
    localizacion?: string;
    id_encargado_per?:number;
    id_area_per?: number;
    id_proveedor_per?: number;
    id_dependencia_per?: number;
    prestado?: string;
    componentes: Componentes[];
}