import { expect } from 'chai';

import { Property } from '../../src/heijunka/Property';

describe('Property', () => {
  it('constructor expects that value is defined', () => {
    expect(function(){new Property<string>(undefined,new Date())}).throws();
  });

  it('constructor expects that Date is defined', () => {
    expect(function(){new Property<string>('aString',undefined)}).throws();
  });

  it('initially, get returns initial value', () => {
    const aValue = 'aString';
    const aProperty = new Property<string>(aValue, new Date());
    expect(aProperty.get()).to.equal(aValue);
  });

  it('update expects that value is defined', () => {
    const aValue = 'aString';
    const aProperty = new Property<string>(aValue, new Date());
    expect(function(){aProperty.update(undefined,new Date())}).throws();
  });

  it('update expects that Date is defined', () => {
    const aValue = 'aString';
    const aProperty = new Property<string>(aValue, new Date());
    expect(function(){aProperty.update(aValue,undefined)}).throws();
  });

  it('update keeps current value if updated happened before', () => {
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020,12,24);
    const beforeInitialDate = new Date(2019,11,23);
    const aProperty = new Property<string>(initialValue, initialDate);
    aProperty.update(anotherValue,beforeInitialDate);
    expect(aProperty.get()).to.equal(initialValue);
  });

  it('update keeps new value if updated happened later than initial value', () => {
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020,12,24);
    const afterInitialDate = new Date(2021,12,25);
    const aProperty = new Property<string>(initialValue, initialDate);
    aProperty.update(anotherValue,afterInitialDate);
    expect(aProperty.get()).to.equal(anotherValue);
  });
});
