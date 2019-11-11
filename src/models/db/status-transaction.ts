import { JsonProperty } from "@tsed/common";

export class StatusTransaction {
  @JsonProperty()
  public code: number;
  @JsonProperty()
  public message: string;

  constructor(obj: { code: number; message: string }) {
    this.code = obj.code;
    this.message = obj.message;
  }
}
