import { Service } from "@tsed/di";
import { DatabaseService } from "./database";

@Service()
export class ReportesService {
  constructor(private dbService: DatabaseService) {}
}
