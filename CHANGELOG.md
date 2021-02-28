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