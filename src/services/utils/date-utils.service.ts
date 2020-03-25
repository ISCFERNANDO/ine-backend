import { Service } from "@tsed/di";
import addDays from "date-fns/addDays";
import compareAsc from "date-fns/compareAsc";
import format from "date-fns/format";

@Service()
export class DateUtilsService {
  addDay(currentDate: Date, ammount: number) {
    return addDays(currentDate, ammount);
  }

  /**
   * Compare dates
   * @param dateLeft
   * @param dateRight
   * @returns 1 if the first date is after the second, -1 if the first date is before the second or 0 is dates are equal
   */
  compareDate(dateLeft: Date, dateRight: Date) {
    console.log(dateLeft);
    console.log(dateRight);

    return compareAsc(dateLeft, dateRight);
  }

  formatYYYYMMDD(date: Date) {
    return format(date, "yyyy-MM-dd");
  }
}
