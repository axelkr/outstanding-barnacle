/* eslint-disable no-magic-numbers */
export class UUIDGenerator {
  public static createUUID(): string {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, function (c) { // eslint-disable-line
      var r = Math.random() * 16 | 0, v = r;// eslint-disable-line
      return v.toString(16);
    });
  }
}
