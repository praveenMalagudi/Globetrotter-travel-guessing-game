class ApiResponse {
  statusCode;
  data; // You can specify a more specific type if known
  message;
  success;

  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
