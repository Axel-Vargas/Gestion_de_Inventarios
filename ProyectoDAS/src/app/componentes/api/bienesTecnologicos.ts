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
    estado?: Estado;
    encargado?:string;
    codigoUTA?: string;
    image?: string;
    localizacion?: string;
    id_area_per?: number;
    id_proveedor_per?: number;
    componentes: Componentes[];
}