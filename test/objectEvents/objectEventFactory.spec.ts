import { expect } from 'chai';

import { ObjectEventFactory } from '../../src/objectEvents/objectEventFactory';

describe('ObjectEventFactory', () => {
  let service: ObjectEventFactory;

  beforeEach(() => {
    service = new ObjectEventFactory();
  });

  it('should be created', () => {
    expect(service).to.exist;
  });
});
