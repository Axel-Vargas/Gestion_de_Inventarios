interface Repotenciado {
    label: string;
    value: string;
}
export interface bienes_Tecnologicos {
    nombre?: string;
    atributos?: string;
    marca?: string;
    modelo?: string;
    num_serie?: string;
    fecha_adquisicion?: number;
    repotenciado?: Repotenciado;
    estado?: string;
    codigoUTA?: string;
    image?: string;
    localizacion?: number;

}