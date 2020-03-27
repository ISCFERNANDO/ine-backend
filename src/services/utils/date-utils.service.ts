import { Service } from '@tsed/di';
const addDays = require('date-fns/addDays');
const format = require('date-fns/format');
const parse = require('date-fns/parseISO');
const getMonth = require('date-fns/getMonth');
const year = require('date-fns/getYear');
@Service()
export class DateUtilsService {
  addDay(currentDate: Date, ammount: number) {
    return addDays(currentDate, ammount);
  }

  compareDate(dateLeft: Date, dateRight: Date) {
    if (dateLeft.getTime() > dateRight.getTime()) {
      return 1;
    } else if (dateLeft.getTime() < dateRight.getTime()) {
      return -1;
    }
    return 0;
  }

  formatYYYYMMDD(date: Date) {
    const dateFormated = format(date, 'yyyy-MM-dd');
    return dateFormated
  }

  parseISO(date: string) {
    return parse(date)
  }

  obtenerMes(date: Date): number {
    return getMonth(date) + 1;
  }

  getMonthName(monthNumber: number) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Novimbre', 'Diciembre'];
    return monthNames[monthNumber - 1];
  }

  getYear(date: Date): number {
    return year(date);
  }
}
