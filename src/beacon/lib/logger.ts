export interface ILogger {
  name: string;
  isEnabled: boolean;
}

export default class Logger {
  public name: string;
  public isEnabled: boolean;
  public color: string;

  constructor({ name, isEnabled }: ILogger) {
    this.name = name;
    this.isEnabled = isEnabled;
    this.color = this.getColor(name);
  }

  public getColor(text: string) {
    let hash = 0;
    if (text.length === 0) {
      return '';
    }
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 255;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color.toString();
  }

  public info(...args: Array<any>) {
    const style = `color: ${this.color}; font-weight: bold;`;
    if (this.isEnabled) {
      // tslint:disable-next-line: no-console
      console.info(`%c${this.name}\n`, style, ...args);
    }
  }

  public debug(...args: Array<any>) {
    if (this.isEnabled)
      // tslint:disable-next-line: no-console
      console.log(
        `%c${this.name}\n`,
        `color: ${this.color}; font-weight: bold;`,
        ...args
      );
  }

  public error(...args: Array<any>) {
    if (this.isEnabled)
      // tslint:disable-next-line: no-console
      console.error(
        `%c${this.name}\n`,
        'color: white; background: #ce1a43; font-weight: bold;',
        ...args
      );
  }

  public warn(...args: Array<any>) {
    if (this.isEnabled)
      // tslint:disable-next-line: no-console
      console.warn(
        `%c${this.name}\n`,
        'color: white; background: #bf7506; font-weight: bold;',
        ...args
      );
  }
}
