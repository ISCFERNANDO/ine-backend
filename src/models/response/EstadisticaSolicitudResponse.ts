interface Estadistica {
    fecha: string;
    total: number;
}

export class EstadisticaSolicitud {
    mesId: number;
    nombreMes: string;
    anio: number;
    datos: Estadistica[] = [];
}