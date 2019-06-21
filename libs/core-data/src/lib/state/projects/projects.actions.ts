import { Project } from './../../projects/project.model';
import { Action } from '@ngrx/store';
export enum ProjectsActionTypes {
  ProjectSelect = '[Projects] Select',
  ProjectsLoad = '[Projects] Load',
  ProjectsLoaded = '[Projects] Loaded',
  ProjectCreate = '[Projects] Create',
  ProjectCreated = '[Projects] Created',
  ProjectUpdate = '[Projects] Update',
  ProjectUpdated = '[Projects] Updated',
  ProjectDelete = '[Projects] Delete',
  ProjectDeleted = '[Projects] Deleted'
}

export class ProjectSelect implements Action {
  readonly type = ProjectsActionTypes.ProjectSelect;
  constructor(public payload: Project) {}
}

export class ProjectsLoad implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoad;
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoaded;
  constructor(public payload: Project[]) {}
}

export class ProjectCreate implements Action {
  readonly type = ProjectsActionTypes.ProjectCreate;
  constructor(public payload: Project) {}
}

export class ProjectCreated implements Action {
  readonly type = ProjectsActionTypes.ProjectCreated;
  constructor(public payload: Project) {}
}

export class ProjectUpdate implements Action {
  readonly type = ProjectsActionTypes.ProjectUpdate;
  constructor(public payload: Project) {}
}

export class ProjectUpdated implements Action {
  readonly type = ProjectsActionTypes.ProjectUpdated;
  constructor(public payload: Project) {}
}

export class ProjectDelete implements Action {
  readonly type = ProjectsActionTypes.ProjectDelete;
  constructor(public payload: Project) {}
}

export class ProjectDeleted implements Action {
  readonly type = ProjectsActionTypes.ProjectDeleted;
  constructor(public payload: Project) {}
}

export type ProjectsActions =
  | ProjectCreate
  | ProjectCreated
  | ProjectSelect
  | ProjectUpdate
  | ProjectUpdated
  | ProjectDelete
  | ProjectDeleted
  | ProjectsLoad
  | ProjectsLoaded;
