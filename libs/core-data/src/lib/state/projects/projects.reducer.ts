import { Project } from './../../projects/project.model';
import { ProjectsActionTypes } from './projects.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
});

export function projectsReducer(state = initialState, action): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.ProjectSelect:
      return Object.assign({}, state, { selectedProjectId: action.payload });
    case ProjectsActionTypes.ProjectsLoaded:
      return adapter.addMany(action.payload, state);
    case ProjectsActionTypes.ProjectCreate:
      return adapter.addOne(action.payload, state);
    case ProjectsActionTypes.ProjectUpdate:
      return adapter.upsertOne(action.payload, state);
    case ProjectsActionTypes.ProjectDelete:
      return adapter.removeOne(action.payload, state);
    default:
      return state;
  }
}

export const getSelectedProjectId = (state: ProjectsState) =>
  state.selectedProjectId;

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;
export const selectAllProjects = selectAll;
