export const enum HTTPStatusCodes {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  TEMPORARY_REDIRECT = 307,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  REQUEST_ENTITY_TOO_LARGE = 413,
  REQUEST_URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}


export const enum HTTPStatus {
  CONTINUE = "CONTINUE",
  SWITCHING_PROTOCOLS = "SWITCHING_PROTOCOLS",
  OK = "OK",
  CREATED = "CREATED",
  ACCEPTED = "ACCEPTED",
  NON_AUTHORITATIVE_INFORMATION = "NON_AUTHORITATIVE_INFORMATION",
  NO_CONTENT = "NO_CONTENT",
  RESET_CONTENT = "RESET_CONTENT",
  PARTIAL_CONTENT = "PARTIAL_CONTENT",
  MULTIPLE_CHOICES = "MULTIPLE_CHOICES",
  MOVED_PERMANENTLY = "MOVED_PERMANENTLY",
  FOUND = "FOUND",
  SEE_OTHER = "SEE_OTHER",
  NOT_MODIFIED = "NOT_MODIFIED",
  USE_PROXY = "USE_PROXY",
  TEMPORARY_REDIRECT = "TEMPORARY_REDIRECT",
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "Usuario y/o contraseña incorrectos",
  PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED",
  NOT_ACCEPTABLE = "NOT_ACCEPTABLE",
  PROXY_AUTHENTICATION_REQUIRED = "PROXY_AUTHENTICATION_REQUIRED",
  REQUEST_TIMEOUT = "REQUEST_TIMEOUT",
  CONFLICT = "CONFLICT",
  GONE = "GONE",
  LENGTH_REQUIRED = "LENGTH_REQUIRED",
  PRECONDITION_FAILED = "PRECONDITION_FAILED",
  REQUEST_ENTITY_TOO_LARGE = "REQUEST_ENTITY_TOO_LARGE",
  REQUEST_URI_TOO_LONG = "REQUEST_URI_TOO_LONG",
  UNSUPPORTED_MEDIA_TYPE = "UNSUPPORTED_MEDIA_TYPE",
  REQUESTED_RANGE_NOT_SATISFIABLE = "REQUESTED_RANGE_NOT_SATISFIABLE",
  EXPECTATION_FAILED = "EXPECTATION_FAILED",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  INTERNAL_SERVER_ERROR = "Error interno del servidor",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  BAD_GATEWAY = "BAD_GATEWAY",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",
  HTTP_VERSION_NOT_SUPPORTED = "HTTP_VERSION_NOT_SUPPORTED",
}
