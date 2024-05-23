export class BaseDto<T> {
  eventType: string;
  token?: string;

  constructor(init?: Partial<T>) {
    this.eventType = this.constructor.name;
    Object.assign(this, init);
  }
}
