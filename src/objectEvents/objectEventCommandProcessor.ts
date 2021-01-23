import { ObjectEvent } from './objectEvent';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';

export class ObjectEventCommandProcessor {
  private currentBoard : HeijunkaBoard;
  
  constructor() {
    this.currentBoard = HeijunkaBoard.createEmptyHeijunkaBoard();
  }

  process(a: ObjectEvent): HeijunkaBoard {
    a;
    return this.currentBoard;
  }

  get() : HeijunkaBoard {
    return this.currentBoard;
  }
}
