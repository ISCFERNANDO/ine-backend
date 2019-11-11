interface IResponse<T> {
  httpEstatus: number;
  message?: string;
  error?: string;
}

interface IResponseJson<T> extends IResponse<string> {
  data: T;
}

export function ResponseOkJson<T>(
  code: number,
  value: T,
  message?: string
): IResponseJson<T> {
  return { httpEstatus: code, message, data: value };
}

export function ResponseErrorJson<T>(
  code: number,
  value: T,
  error?: string
): IResponseJson<T> {
  return { httpEstatus: code, error, data: value };
}
