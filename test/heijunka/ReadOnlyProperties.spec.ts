import { ReadOnlyProperties } from '../../src/heijunka/ReadOnlyProperties';

describe('ReadOnlyProperties', () => {
  it('update keeps current value if update happened before', () => {
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const propertyName = 'name';
    const initialDate = new Date(2020, 12, 24);
    const beforeInitialDate = new Date(2019, 11, 23);
    const someProperties = new ReadOnlyProperties().initialize(propertyName, initialValue, initialDate);
    const updatedProperties = someProperties.update(propertyName, anotherValue, beforeInitialDate);
    expect(updatedProperties.valueOf(propertyName)).toEqual(initialValue);
  });

  it('update keeps new value if update happened afterwards', () => {
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const propertyName = 'name';
    const initialDate = new Date(2020, 12, 24);
    const afterInitialDate = new Date(2021, 12, 25);
    const someProperties = new ReadOnlyProperties().initialize(propertyName, initialValue, initialDate);
    const updatedProperties = someProperties.update(propertyName, anotherValue, afterInitialDate);
    expect(updatedProperties.valueOf(propertyName)).toEqual(anotherValue);
  });
});
