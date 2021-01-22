// layout according to ADR-0004
export interface ObjectEvent {
  topic: string;
  time: Date;
  id: number;
  eventType: string;
  object: string;
  objectType: string;
  payload: Map<string,string>;
}
