export class TabModel {
  private _name: string;
  private _contents: any;
  private _current: boolean;

  constructor(_name: string, _contents: any, _current: boolean) {
    this._name = _name;
    this._contents = _contents;
    this._current = _current;
  }

  public set name(_name: string) {
    this._name = _name;
  }

  public get name(): string {
    return this._name;
  }

  public set contents(_contents: any) {
    this._contents = _contents;
  }

  public get contents(): any {
    return this._contents;
  }

  public set current(_current: boolean) {
    this._current = _current;
  }

  public get current(): boolean {
    return this._current;
  }
}
