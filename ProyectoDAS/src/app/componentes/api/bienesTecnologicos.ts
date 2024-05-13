interface Repotenciacion {
    label: string;
    value: string;
}
export interface bienes_Tecnologicos {
    nombre?: string;
    atributos?: string;
    marca?: string;
    modelo?: string;
    numeroserie?: number;
    fecha_adquisicion?: number;
    repotenciacion?: Repotenciacion;
    estado?: string;
    ubicacion?: string;
    codigouta?: string;
    image?: string;
    localizacion?: number;

}