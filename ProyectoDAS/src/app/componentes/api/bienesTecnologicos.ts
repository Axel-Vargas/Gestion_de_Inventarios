import { Componentes } from "./componentes";

interface Estado {
    label: string;
    value: string;
}
export interface bienes_Tecnologicos {
    id_bien_tec?: number;
    nombre?: string;
    atributos?: string;
    marca?: string;
    modelo?: string;
    num_serie?: string;
    fecha_adquisicion?: Date;
    //repotenciado?: Repotenciado;
    estado?: Estado;
    codigoUTA?: string;
    image?: string;
    localizacion?: string;
    ip_tecnologico?: string;
    codigo_adicional?: string;
    id_tipo_per?: number;
    id_area_per?: number;
    id_proveedor_per?: number;
    componentes: Componentes[];
}