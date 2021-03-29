# v6.3.0
- setup new domain object: task

# v6.2.2
- fix: kanban cards are automatically active if no context has been defined so far.
- fix: an implicitly active context renders the kanban card implicitly active as well.

# v6.2.1
- fix: deactivate context uses correct index

# v6.2.0
- minify output
- commands can specify whether they're transient or not
- contexts can now be set to active or deactive. If no contexts are explicitly active, all are implicitly active.

# v6.1.0
- contexts can now be connected/disconnected with other ids on the board

# v6.0.0
- renamed object to proper domain names
- command factories now mirror the domain 

# v5.1.0
- find active transition at specific point in time

# v5.0.2
- fix: provide access again for domain model root

# v5.0.1
- fix: publish types of collections as well.
- fix: create commands now don't try to add the same new object again

# v5.0.0
- refactored a lot 
- kanban cards and projects are now individual collections with correct information hiding

# v4.3.2
- fix: topic really belongs to a separate component.

# v4.3.1
- fix: add constructor to topic class...

# v4.3.0
- refactor topic to a class, to enable adding properties later on

# v4.2.1
- fix: creation of a kanban card also moves it to the initial state

# v4.2.0
- extract event factories for KanbanCards and Projects to provide aggregate commands.
- define common properties in one place. 

# v4.1.4
- fix: names of factory methods related to properties reflect now the fact that they are about one property only.

# v4.1.3
- fix: add possibility to initialize properties in the first place

# v4.1.2
- fix: rename method to new name.

# v4.1.1
- fix: rebuild without types for old commands

# v4.1.0 
- replace Rename(KanbanCard|Project) with generic versions. Name is no longer implicitly handled.

# v4.0.0
- Kanban Cards and projects can now have generic string properties. Name has been discontinued as object property; use a generic string property instead.

# v3.3.2 
- provide uuid generator

# v3.3.1
- provide command to move a card to trash

# v3.3.0
- model trash state explicitly

# v3.2.1
- shortcut to access state model of a specific project

# v3.2.0
- state models are now set per project

# v3.1.2
- separation of concerns: extract linearization of state model

# v3.1.1
- fix: PersonalKanban can be serialized itself

# v3.1.0
- provide reproducible way to linearize states of a state model

# v3.0.0
- StateModel is now non-linear, e.g. a state can have multiple successors and loops can be defined
- breaking change: calling library has to setup state model by itself. For the time being, ObjectEventCommandProcessor.initializeWithPersonalKanban reproduces the previously automatically created model.

# v2.1.3
- fix: library handles cards without state as well

# v2.1.2
- no longer expects that an new card automatically gets transitioned to an inital state

# v2.1.1
- reuse refactored type definition

# v2.1.0
- enable rename of Kanban card as well

# v2.0.3
- fix: transfer object type as well

# v2.0.2
- simplify command implementation

# v2.0.1
- fix: currentTransition returns latest (as expected) and no longer the earliest transition

# v2.0.0
- breaking change: filter by states instead of single status only. 
- filter based on transition type (in progress vs. completed) available as well

# v1.3.0
- find state based on id as well

# v1.2.0
- Boilerplate code for finding cards and projects based on their id
- Encapsulate finding initial state as well

# v1.1.0
- Events available for creating a Kanban Card and moving it around

# v1.0.0 
- Define domain model for a heijunka board
- base setup