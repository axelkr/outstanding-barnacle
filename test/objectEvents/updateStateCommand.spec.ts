import { expect } from 'chai';

import { UpdateStateCommand } from '../../src/objectEvents/updateStateCommand';

describe('UpdateStateCommand', () => {
  let service: UpdateStateCommand;

  beforeEach(() => {
    service = new UpdateStateCommand();
  });

  it('should be created', () => {
    expect(service).to.exist;
  });
});
