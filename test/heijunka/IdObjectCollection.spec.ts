import { expect } from 'chai';
import { IdObject } from '../../src/heijunka/IdObject';

import { IdObjectCollection } from '../../src/heijunka/IdObjectCollection';

class MockIdObject implements IdObject {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

describe('IdObjectCollection', () => {
  it('after replacing an id, the new id is known and the old id is unknown', () => {
    const anId = 'anId';
    const anotherId = 'anotherId';
    const anIdObject = new MockIdObject(anId);
    const anotherIdObject = new MockIdObject(anotherId);
    const testObject = new IdObjectCollection<MockIdObject>().add(anIdObject);
    expect(testObject.replace(anId, anotherIdObject).has(anotherId)).to.be.true;
    expect(testObject.replace(anId, anotherIdObject).has(anId)).to.be.false;
  })
});
