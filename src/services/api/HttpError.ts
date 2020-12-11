export interface IHttpError {
  status: number,
  statusText?: string,
  body?: any,
};

export default class HttpError extends Error{

  public readonly status: number;
  public readonly statusText?: string;
  public readonly body?: any;

  constructor({status, statusText, body}: IHttpError) {
    super(statusText)
    this.status = status
    this.statusText = statusText
    this.body = body
  }
}