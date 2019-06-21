import { Project } from './../../projects/project.model';
import { Action } from '@ngrx/store';
export enum ProjectsActionTypes {
  ProjectSelect = '[Projects] Select',
  ProjectCreate = '[Projects] Create',
  ProjectUpdate = '[Projects] Update',
  ProjectDelete = '[Projects] Delete'
}

export class ProjectSelect implements Action {
  readonly type = ProjectsActionTypes.ProjectSelect;
  constructor(private payload: Project) {}
}

export class ProjectCreate implements Action {
  readonly type = ProjectsActionTypes.ProjectCreate;
  constructor(private payload: Project) {}
}

export class ProjectUpdate implements Action {
  readonly type = ProjectsActionTypes.ProjectUpdate;
  constructor(private payload: Project) {}
}

export class ProjectDelete implements Action {
  readonly type = ProjectsActionTypes.ProjectDelete;
  constructor(private payload: Project) {}
}

export type ProjectsActions =
  | ProjectCreate
  | ProjectSelect
  | ProjectUpdate
  | ProjectDelete;
