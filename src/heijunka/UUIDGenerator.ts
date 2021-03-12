export class UUIDGenerator {
  public static createUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { // eslint-disable-line
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);// eslint-disable-line
      return v.toString(16);
    });
  }
}
