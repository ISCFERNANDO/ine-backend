import { Service } from "@tsed/di";
import { Workbook, Borders, Alignment, Fill } from "exceljs";
import * as fs from "fs";
import { AreaService } from "../db/AreaService";
import { VehiculoService } from "../db/VehiculoService";

const mediaUrl = "media/reporte/excel/";
const mediaIcons = "media/icons/";
@Service()
export class ExcelService {
  constructor(
    private areaService: AreaService,
    private vehiculoService: VehiculoService
  ) {}

  async createExcel(data) {
    try {
      //obtener datos para el documento excel
      const area = await this.areaService.getById(data.areaId);
      const vehiculo = await this.vehiculoService.getVehiculoById(
        data.vehiculoId
      );

      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Datos de solicitud");
      worksheet.pageSetup.margins = {
        left: 0.7,
        right: 0.7,
        top: 0.75,
        bottom: 0.75,
        header: 0.3,
        footer: 0.3
      };

      const imageId = workbook.addImage({
        filename: `${mediaIcons}logo_ine.jpg`,
        extension: "jpeg"
      });

      const abolladura = workbook.addImage({
        filename: `${mediaIcons}abolladura.jpeg`,
        extension: "jpeg"
      });

      const estrellado = workbook.addImage({
        filename: `${mediaIcons}estrellado.jpeg`,
        extension: "jpeg"
      });

      const faltante = workbook.addImage({
        filename: `${mediaIcons}faltante.jpeg`,
        extension: "jpeg"
      });

      const golpe = workbook.addImage({
        filename: `${mediaIcons}golpe.jpeg`,
        extension: "jpeg"
      });

      const rallado = workbook.addImage({
        filename: `${mediaIcons}rayado.jpeg`,
        extension: "jpeg"
      });

      const carImage = workbook.addImage({
        filename: `${mediaIcons}car.png`,
        extension: "jpeg"
      });

      const gasolinaImage = workbook.addImage({
        filename: `${mediaIcons}gasolina.PNG`,
        extension: "png"
      });

      worksheet.addImage(imageId, "A1:D3");
      worksheet.mergeCells("A1:N1");
      worksheet.getCell("N1").value = "DIRECCIÓN EJECUTIVA DE ADMINISTRACIÓN";
      worksheet.getCell("N1").alignment = { horizontal: "right" };

      worksheet.mergeCells("A2:N2");
      worksheet.getCell("N2").value =
        "DIRECCIÓN DE RECURSOS MATERIALES Y SERVICIOS";
      worksheet.getCell("N2").alignment = { horizontal: "right" };

      worksheet.mergeCells("A3:N3");
      worksheet.getCell("N3").value = "JUNTA LOCAL EJECUTIVA DE OAXACA";
      worksheet.getCell("N3").alignment = { horizontal: "right" };

      worksheet.mergeCells("A4:N4");
      worksheet.getCell("N4").value = "06 DISTRITO ELECTORAL FEDERAL";
      worksheet.getCell("N4").alignment = { horizontal: "right" };

      worksheet.mergeCells("A5:N5");
      worksheet.getCell("N5").value = "JUNTA DISTRITAL EJECUTIVA";
      worksheet.getCell("N5").alignment = { horizontal: "right" };

      worksheet.mergeCells("A7:N7");
      worksheet.getCell("N7").value = "FO-DRMS-STAR-01";
      worksheet.getCell("N7").alignment = { horizontal: "center" };
      worksheet.getCell("N7").font = { bold: true, size: 16, underline: false }; //subrayado falso
      worksheet.getRow(7).height = 25;

      worksheet.mergeCells("A8:N8");
      worksheet.getCell("N8").value = "SOLICITUD DE PRÉSTAMO DE VEHÍCULOS";
      worksheet.getCell("N8").alignment = { horizontal: "center" };
      worksheet.getCell("N8").font = { bold: true, size: 16, underline: false }; //subrayado falso
      worksheet.getRow(8).height = 25;

      //table one
      //one column
      worksheet.mergeCells("A10:E10");
      worksheet.getCell("E10").value = "ÁREA SOLICITANTE";
      worksheet.getCell("E10").alignment = this.alignment();
      worksheet.getCell("E10").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };
      worksheet.getRow(10).height = 25;
      worksheet.getCell("E10").fill = this.fill();
      worksheet.getCell("E10").border = this.border();

      worksheet.mergeCells("A11:E11");
      worksheet.getCell("E11").value = area.name;
      worksheet.getCell("E11").alignment = this.alignment();
      worksheet.getCell("E11").font = {
        bold: false,
        size: 12,
        underline: false //subrallado
      };
      worksheet.getRow(11).height = 75;
      worksheet.getCell("E11").border = this.border();

      //two column
      worksheet.mergeCells("F10:H10");
      worksheet.getCell("H10").value = "TITULAR DEL ÁREA SOLICITANTE";
      worksheet.getCell("H10").alignment = this.alignment();
      worksheet.getCell("H10").font = {
        bold: true,
        size: 12,
        underline: false //subrayado
      };
      worksheet.getRow(10).height = 25;
      worksheet.getCell("H10").fill = this.fill();
      worksheet.getCell("H10").border = this.border();
      //TODO: aqui va el dato
      worksheet.mergeCells("F11:H11");
      worksheet.getCell("H11").value = "COLUMHNA 2";
      worksheet.getCell("H11").alignment = this.alignment();
      worksheet.getCell("H11").font = {
        bold: false,
        size: 12,
        underline: false //subrallado
      };
      worksheet.getRow(11).height = 75;
      worksheet.getCell("H11").border = this.border();

      //threee column
      worksheet.mergeCells("I10:N10");
      worksheet.getCell("N10").value = "JUSTIFICACIÓN";
      worksheet.getCell("N10").alignment = this.alignment();
      worksheet.getCell("N10").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };
      worksheet.getRow(10).height = 25;
      worksheet.getCell("N10").fill = this.fill();
      worksheet.getCell("N10").border = this.border();

      worksheet.mergeCells("I11:N11");
      worksheet.getCell("N11").value = data.reasonRequirement;
      worksheet.getCell("N11").alignment = this.alignment();
      worksheet.getCell("N11").font = {
        bold: false,
        size: 12,
        underline: false //subrallado
      };
      worksheet.getRow(11).height = 75;
      worksheet.getCell("N11").border = this.border();
      //fin table one

      /**
       * Inicio de tabla 2
       */
      //table one
      //one column
      worksheet.mergeCells("A13:E13");
      worksheet.getCell("E13").value = "VEHÍCULO PRESTADO";
      worksheet.getCell("E13").alignment = this.alignment();
      worksheet.getCell("E13").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };
      worksheet.getRow(13).height = 25;
      worksheet.getCell("E13").fill = this.fill();
      worksheet.getCell("E13").border = this.border();

      worksheet.getRow(14).height = 20;
      worksheet.getCell("A14").value = "PLACAS";
      worksheet.getCell("A14").border = this.border();
      worksheet.getCell("A14").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };

      worksheet.mergeCells("B14:E14");
      worksheet.getRow(14).height = 20;
      worksheet.getCell("E14").value = vehiculo.placa;
      worksheet.getCell("E14").border = this.border();

      worksheet.getRow(15).height = 20;
      worksheet.getCell("A15").value = "MARCA";
      worksheet.getCell("A15").border = this.border();
      worksheet.getCell("A15").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };

      worksheet.mergeCells("B15:E15");
      worksheet.getRow(15).height = 20;
      worksheet.getCell("E15").value = vehiculo.category;
      worksheet.getCell("E15").border = this.border();

      worksheet.getRow(16).height = 20;
      worksheet.getCell("A16").value = "MODELO";
      worksheet.getCell("A16").border = this.border();
      worksheet.getCell("A16").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };

      worksheet.mergeCells("B16:E16");
      worksheet.getRow(16).height = 20;
      worksheet.getCell("E16").value = vehiculo.model;
      worksheet.getCell("E16").border = this.border();

      worksheet.getRow(17).height = 20;
      worksheet.getCell("A17").value = "TIPO";
      worksheet.getCell("A17").border = this.border();
      worksheet.getCell("A17").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };

      worksheet.mergeCells("B17:E17");
      worksheet.getRow(17).height = 20;
      worksheet.getCell("E17").value = vehiculo.model;
      worksheet.getCell("E17").border = this.border();

      //firma de funcionario
      worksheet.mergeCells("F15:H17");
      worksheet.getCell("F17").value = "FIRMA DEL FUNCIONARIO SOLICITANTE";
      worksheet.getCell("F17").border = this.border();
      worksheet.getCell("F17").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };
      worksheet.getCell("F17").fill = this.fill();
      worksheet.getCell("F17").alignment = this.alignment();

      worksheet.mergeCells("F13:H14");
      worksheet.getCell("F14").border = this.border();

      //inventario del vehiculo
      worksheet.mergeCells("I13:N13");
      worksheet.getCell("N13").value = "INVENTARIO DEL VEHÍCULO";
      worksheet.getCell("N13").border = this.border();
      worksheet.getCell("N13").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };
      worksheet.getCell("N13").fill = this.fill();
      worksheet.getCell("N13").alignment = this.alignment();

      worksheet.mergeCells("J19:N19");
      worksheet.getCell("N19").value = "SIMBOLOGÍA";
      worksheet.getRow(19).height = 20;
      worksheet.getCell("N19").border = this.border();
      worksheet.getCell("N19").font = {
        bold: true,
        size: 12,
        underline: false //subrallado
      };
      worksheet.getCell("N19").fill = this.fill();
      worksheet.getCell("N19").alignment = this.alignment();

      //for image abolladura
      worksheet.mergeCells("J20:K20");
      worksheet.getRow(20).height = 30;
      worksheet.addImage(abolladura, "J20:K20");
      worksheet.getCell("K20").border = this.border();
      //for text abolladura
      worksheet.mergeCells("L20:N20");
      worksheet.getCell("N20").value = "ABOLLADURA";
      worksheet.getCell("N20").border = this.border();
      worksheet.getCell("N20").font = {
        size: 12
      };
      worksheet.getCell("N20").alignment = {
        vertical: "middle",
        horizontal: "center"
      };

      //for image rayado
      worksheet.mergeCells("J21:K21");
      worksheet.getRow(21).height = 30;
      worksheet.addImage(rallado, "J21:K21");
      worksheet.getCell("K21").border = this.border();
      //for text rayado
      worksheet.mergeCells("L21:N21");
      worksheet.getCell("N21").value = "RAYADO";
      worksheet.getCell("N21").border = this.border();
      worksheet.getCell("N21").font = {
        size: 12
      };
      worksheet.getCell("N21").alignment = this.alignment();

      //for image estrellado
      worksheet.mergeCells("J22:K22");
      worksheet.getRow(22).height = 30;
      worksheet.addImage(estrellado, "J22:K22");
      worksheet.getCell("K22").border = this.border();
      //for text estrellado
      worksheet.mergeCells("L22:N22");
      worksheet.getCell("N22").value = "ESTRELLADO";
      worksheet.getCell("N22").border = this.border();
      worksheet.getCell("N22").font = {
        size: 12
      };
      worksheet.getCell("N22").alignment = this.alignment();

      //for image golpe
      worksheet.mergeCells("J23:K23");
      worksheet.getRow(23).height = 30;
      worksheet.addImage(golpe, "J23:K23");
      worksheet.getCell("K23").border = this.border();
      //for text golpe
      worksheet.mergeCells("L23:N23");
      worksheet.getCell("N23").value = "GOLPE";
      worksheet.getCell("N23").border = this.border();
      worksheet.getCell("N23").font = {
        size: 12
      };
      worksheet.getCell("N23").alignment = this.alignment();

      //for image faltante
      worksheet.mergeCells("J24:K24");
      worksheet.getRow(24).height = 30;
      worksheet.addImage(faltante, "J24:K24");
      worksheet.getCell("K24").border = this.border();
      //for text faltante
      worksheet.mergeCells("L24:N24");
      worksheet.getCell("N24").value = "FALTANTE";
      worksheet.getCell("N24").border = this.border();
      worksheet.getCell("N24").font = {
        size: 12
      };
      worksheet.getCell("N24").alignment = {
        vertical: "middle",
        horizontal: "center"
      };

      //for car image
      worksheet.addImage(carImage, "A19:H24");
      worksheet.getCell("H24").border = this.border();

      //for periodo de prestamo
      worksheet.mergeCells("A26:E27");
      worksheet.getCell("E26").value = "PERIODO DE PRÉSTAMO";
      worksheet.getCell("E26").border = this.border();
      worksheet.getCell("E26").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("E26").alignment = this.alignment();
      worksheet.getCell("E26").fill = this.fill();
      //for value
      worksheet.mergeCells("A28:E28");
      worksheet.getCell("E28").value = data.fechaCreacion;
      worksheet.getCell("E28").alignment = this.alignment();
      worksheet.getCell("E28").border = this.border();
      //fin periodo de prestamo

      //for fecha y hora de salida
      worksheet.mergeCells("A29:E29");
      worksheet.getCell("E29").value = "FECHA Y HORA DE SALIDA";
      worksheet.getCell("E29").border = this.border();
      worksheet.getCell("E29").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("E29").alignment = this.alignment();
      worksheet.getCell("E29").fill = this.fill();
      //for value fecha y hora de salida
      worksheet.mergeCells("A30:E30");
      worksheet.getCell("E30").value = `${data.dateOrder} - ${data.orderTime}`;
      worksheet.getCell("E30").alignment = this.alignment();
      worksheet.getCell("E30").border = this.border();

      //for fecha y hora de llegada
      worksheet.mergeCells("A31:E31");
      worksheet.getCell("E31").value = "FECHA Y HORA DE LLEGADA";
      worksheet.getCell("E31").border = this.border();
      worksheet.getCell("E31").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("E31").alignment = this.alignment();
      worksheet.getCell("E31").fill = this.fill();
      //for value fecha y hora de llegada
      worksheet.mergeCells("A32:E32");
      worksheet.getCell(
        "E32"
      ).value = `${data.dateDeliver} - ${data.deliveryTime}`;
      worksheet.getCell("E32").alignment = this.alignment();
      worksheet.getCell("E32").border = this.border();

      //for nivel inicial de gasolina
      worksheet.mergeCells("F26:I26");
      worksheet.getCell("I26").value = "NIVEL INICIAL DE GASOLINA";
      worksheet.getCell("I26").border = this.border();
      worksheet.getCell("I26").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("I26").alignment = this.alignment();
      worksheet.getCell("I26").fill = this.fill();
      //fin nivel inicial de gasolina
      worksheet.addImage(gasolinaImage, "F27:I32");
      worksheet.mergeCells("F27:I32");
      worksheet.getCell("I32").border = this.border();

      //for nivel final de gasolina
      worksheet.mergeCells("J26:N26");
      worksheet.getCell("N26").value = "NIVEL FINAL DE GASOLINA";
      worksheet.getCell("N26").border = this.border();
      worksheet.getCell("N26").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("N26").alignment = this.alignment();
      worksheet.getCell("N26").fill = this.fill();
      //fin nivel final de gasolina
      worksheet.addImage(gasolinaImage, "J27:N32");
      worksheet.mergeCells("J27:N32");
      worksheet.getCell("N32").border = this.border();

      worksheet.mergeCells("A33:D33");
      worksheet.getCell("D33").value = "KILOMETRAJE";
      worksheet.getCell("D33").border = this.border();
      worksheet.getCell("D33").fill = this.fill();
      worksheet.getCell("D33").alignment = this.alignment();
      worksheet.getCell("D33").font = {
        bold: true,
        size: 12
      };
      worksheet.mergeCells("A34:B34");
      worksheet.getCell("B34").value = "INICIAL";
      worksheet.getCell("B34").border = this.border();
      worksheet.getCell("B34").alignment = this.alignment();
      worksheet.getCell("B34").font = {
        bold: true,
        size: 12
      };
      //FOR VALUE
      worksheet.mergeCells("A35:B35");
      worksheet.getCell("B35").value = data.initialGasoline;
      worksheet.getCell("B35").border = this.border();
      worksheet.getCell("B35").alignment = this.alignment();
      worksheet.getCell("B35").font = {
        bold: false,
        size: 12
      };

      worksheet.mergeCells("C34:D34");
      worksheet.getCell("D34").value = "FINAL";
      worksheet.getCell("D34").border = this.border();
      worksheet.getCell("D34").alignment = this.alignment();
      worksheet.getCell("D34").font = {
        bold: true,
        size: 12
      };

      //for value
      worksheet.mergeCells("C35:D35");
      worksheet.getCell("D35").value = 0;
      worksheet.getCell("D35").border = this.border();
      worksheet.getCell("D35").alignment = this.alignment();
      worksheet.getCell("D35").font = {
        bold: false,
        size: 12
      };

      worksheet.mergeCells("E33:H33");
      worksheet.getCell("H33").value = "DOTACIÓN DE GASOLINA";
      worksheet.getCell("H33").border = this.border();
      worksheet.getCell("H33").fill = this.fill();
      worksheet.getCell("H33").alignment = this.alignment();
      worksheet.getCell("H33").font = {
        bold: true,
        size: 12
      };
      worksheet.mergeCells("E34:H34");
      worksheet.getCell("H34").value = "LITROS:";
      worksheet.getCell("H34").border = this.border();
      worksheet.getCell("H34").alignment = this.alignment();
      worksheet.getCell("H34").font = {
        bold: true,
        size: 12
      };
      worksheet.mergeCells("E35:H35");
      worksheet.getCell("H35").value = data.requestedFuel;
      worksheet.getCell("H35").border = this.border();
      worksheet.getCell("H35").alignment = this.alignment();
      worksheet.getCell("H35").font = {
        bold: false,
        size: 12
      };

      worksheet.mergeCells("I33:N33");
      worksheet.getCell("N33").value = "DOTACIÓN DE LUBRICANTES Y ADITIVOS";
      worksheet.getCell("N33").border = this.border();
      worksheet.getCell("N33").fill = this.fill();
      worksheet.getCell("N33").alignment = this.alignment();
      worksheet.getCell("N33").font = {
        bold: true,
        size: 12
      };
      worksheet.mergeCells("I34:J34");
      worksheet.getCell("J34").value = "ACEITE P/MOTOR";
      worksheet.getCell("J34").border = this.border();
      worksheet.getCell("J34").alignment = this.alignment();
      worksheet.getCell("J34").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("I35").value = "SI";
      worksheet.getCell("I35").border = this.border();
      worksheet.getCell("I35").font = {
        bold: false,
        size: 12
      };
      worksheet.getCell("J35").value = "NO";
      worksheet.getCell("J35").border = this.border();
      worksheet.getCell("J35").font = {
        bold: false,
        size: 12
      };
      worksheet.mergeCells("I36:J36");
      worksheet.getCell("J36").value = "Cantidad:";
      worksheet.getCell("J36").border = this.border();
      worksheet.getCell("J36").font = {
        bold: false,
        size: 12
      };

      worksheet.mergeCells("K34:L34");
      worksheet.getCell("L34").value = "LÍQ. DE FRENOS";
      worksheet.getCell("L34").border = this.border();
      worksheet.getCell("L34").alignment = this.alignment();
      worksheet.getCell("L34").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("K35").value = "SI";
      worksheet.getCell("K35").border = this.border();
      worksheet.getCell("K35").font = {
        bold: false,
        size: 12
      };
      worksheet.getCell("L35").value = "NO";
      worksheet.getCell("L35").border = this.border();
      worksheet.getCell("L35").font = {
        bold: false,
        size: 12
      };
      worksheet.mergeCells("K36:L36");
      worksheet.getCell("L36").value = "Cantidad:";
      worksheet.getCell("L36").border = this.border();
      worksheet.getCell("L36").font = {
        bold: false,
        size: 12
      };

      worksheet.mergeCells("M34:N34");
      worksheet.getCell("N34").value = "ANTICONGELANTE";
      worksheet.getCell("N34").border = this.border();
      worksheet.getCell("N34").alignment = this.alignment();
      worksheet.getCell("N34").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("M35").value = "SI";
      worksheet.getCell("M35").border = this.border();
      worksheet.getCell("M35").font = {
        bold: false,
        size: 12
      };
      worksheet.getCell("N35").value = "NO";
      worksheet.getCell("N35").border = this.border();
      worksheet.getCell("N35").font = {
        bold: false,
        size: 12
      };
      worksheet.mergeCells("M36:N36");
      worksheet.getCell("N36").value = "Cantidad:";
      worksheet.getCell("N36").border = this.border();
      worksheet.getCell("N36").font = {
        bold: false,
        size: 12
      };

      worksheet.mergeCells("A37:N37");
      worksheet.getCell("N37").value = "OBSERVACIONES";
      worksheet.getCell("N37").border = this.border();
      worksheet.getCell("N37").alignment = this.alignment();
      worksheet.getCell("N37").fill = this.fill();
      worksheet.getCell("N37").font = {
        bold: true,
        size: 12
      };
      worksheet.mergeCells("A38:N39");
      worksheet.getCell("N39").border = this.border();
      worksheet.getCell("N39").alignment = this.alignment();
      worksheet.getCell("N39").font = {
        bold: false,
        size: 12
      };

      worksheet.mergeCells("A40:G40");
      worksheet.getCell("G40").value = "Entrega";
      worksheet.getCell("G40").border = this.border();
      worksheet.getCell("G40").alignment = this.alignment();
      worksheet.getCell("G40").fill = this.fill();
      worksheet.getCell("G40").font = {
        bold: true,
        size: 12
      };
      worksheet.mergeCells("A41:G41");
      worksheet.getCell("G41").value = "Lic. Jorge Pérez Cortés";
      worksheet.getRow(41).height = 40;
      worksheet.getCell("G41").alignment = {
        vertical: "bottom",
        horizontal: "center"
      };
      worksheet.getCell("G41").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("G41").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: {style: 'thin', color: {argb: 'FFFFFFFF'}}
      };

      worksheet.mergeCells("A42:G42");
      worksheet.getCell("G42").value = "Vocal Secretario";
      worksheet.getRow(42).height = 20;
      worksheet.getCell("G42").alignment = this.alignment();
      worksheet.getCell("G42").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("G42").border = {
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" }
      };

      worksheet.mergeCells("H40:N40");
      worksheet.getCell("N40").value = "Recibe";
      worksheet.getCell("N40").border = this.border();
      worksheet.getCell("N40").alignment = this.alignment();
      worksheet.getCell("N40").fill = this.fill();
      worksheet.getCell("N40").font = {
        bold: true,
        size: 12
      };
      worksheet.mergeCells("H41:N41");
      worksheet.getCell("N41").value = "C. Efraín Dávila Morales";
      worksheet.getRow(41).height = 40;
      worksheet.getCell("N41").alignment = {
        vertical: "bottom",
        horizontal: "center"
      };
      worksheet.getCell("N41").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("N41").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: {style: 'thin', color: {argb: 'FFFFFFFF'}}
      };

      worksheet.mergeCells("H42:N42");
      worksheet.getCell("N42").value = "Chofer de Vannet";
      worksheet.getRow(42).height = 20;
      worksheet.getCell("N42").alignment = this.alignment();
      worksheet.getCell("N42").font = {
        bold: true,
        size: 12
      };
      worksheet.getCell("N42").border = {
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" }
      };

      console.log("data", data);
      await this.createFile(`${mediaUrl}reporte.xlsx`, workbook);
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  border(): Partial<Borders> {
    return {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };
  }
  alignment(): Partial<Alignment> {
    return {
      vertical: "middle",
      horizontal: "center"
    };
  }

  fill(): Fill {
    return {
      type: "pattern",
      pattern: "darkTrellis",
      fgColor: { argb: "A8A1A0" },
      bgColor: { argb: "A8A1A0" }
    };
  }

  createFile(filename, workbook: Workbook) {
    return new Promise((resolve, reject) => {
      workbook.xlsx
        .writeFile(filename)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  readFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if (err) {
          console.log("Ocurrio un error al leer el archoivo", err);
          return reject(err);
        }
        resolve(data);
      });
    });
  }
}
