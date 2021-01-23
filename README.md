# outstanding-barnacle aka domain model for a Heijunka board

## Model
Consists of state model, projects and kanban cards. Together, they form a Heijunka board. The model is immutable. Hence, any modification leaves the original board untouched and returns a modified model.

### State model
Defaults to Kanban model at the moment (Backlog - Doing - Done). Cannot be changed at the moment. In the end, the state model will require
- exactly one initial state exists, 
- a final state can be reached from each state,
- each state (besides the initial state) has to have at least predecessor.

The states are the horizontal division of the overall board.

### Project (aka swimlanes)
Just a name. The projects divide the board vertically.

### Kanban card
Right now, the kanban card only consists of a name. Each kanban card is always associated with the same project. Furthermore, it contains it state history, i.e. when it was closed in a state and when it was pulled to the next state.

## Events
The model is constructed and updated by events. As events may arrive out-of-order, each modification of the model requires the date when it happened. This enables the model to process events in the correct order.

As a consequence, any linked objects may not be present. For example, the project referenced by a kanban card is not yet available. Hence, the model does not validate whether referenced objects exist. However, the model rejects any modification, if the object is not yet present. This way, no events are lost.