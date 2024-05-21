
interface Repotenciado {
    label: string;
    value: string;
}
interface Estado {
    label: string;
    value: string;
}
export interface Componentes {
    id_componente?: number;
    nombre?: string;
    marca?: string;
    modelo?: string;
    num_serie?: string;
    estado?: Estado;
    repotenciado?: Repotenciado;
    codigoUTA?: string;
    id_bien_per?: number;
    id_proveedor_per?: number;
}
