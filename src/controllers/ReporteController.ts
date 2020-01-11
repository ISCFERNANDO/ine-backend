import { Controller, Authenticated } from "@tsed/common";

/**
 * Núm. 	Vehículo	Placas	Vocalía solicitante	Conductor	Fecha inicial	Fecha final	Kilometraje inicial	Kilometraje final	Gasolina	Observacoines
 */

@Controller("/reports")
@Authenticated()
export class ReporteController {
  constructor() {}
}
