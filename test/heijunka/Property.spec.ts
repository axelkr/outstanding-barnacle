import { Property } from '../../src/heijunka/Property';

describe('Property', () => {
  it('constructor expects that value is defined', () => {
    // eslint-disable-next-line no-new
    expect(function () { new Property<string>(undefined, new Date()) }).toThrow();
  });

  it('constructor expects that Date is defined', () => {
    // eslint-disable-next-line no-new
    expect(function () { new Property<string>('aString', undefined) }).toThrow();
  });

  it('initially, get returns initial value', () => {
    const aValue = 'aString';
    const aProperty = new Property<string>(aValue, new Date());
    expect(aProperty.value).toEqual(aValue);
  });

  it('update expects that value is defined', () => {
    const aValue = 'aString';
    const aProperty = new Property<string>(aValue, new Date());
    expect(function () { aProperty.update(undefined, new Date()) }).toThrow();
  });

  it('update expects that Date is defined', () => {
    const aValue = 'aString';
    const aProperty = new Property<string>(aValue, new Date());
    expect(function () { aProperty.update(aValue, undefined) }).toThrow();
  });

  it('update keeps current value if updated happened before', () => {
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020, 12, 24);
    const beforeInitialDate = new Date(2019, 11, 23);
    const aProperty = new Property<string>(initialValue, initialDate);
    const updatedProperty = aProperty.update(anotherValue, beforeInitialDate);
    expect(updatedProperty.value).toEqual(initialValue);
  });

  it('update keeps new value if updated happened later than initial value', () => {
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020, 12, 24);
    const afterInitialDate = new Date(2021, 12, 25);
    const aProperty = new Property<string>(initialValue, initialDate);
    const updatedProperty = aProperty.update(anotherValue, afterInitialDate);
    expect(updatedProperty.value).toEqual(anotherValue);
  });
});
