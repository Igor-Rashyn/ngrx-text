import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromProjects from './projects/projects.reducer';

import * as fromCustomers from './customers/customers.reducer';
import { Project } from '../projects/project.model';

export interface AppState {
  customers: fromCustomers.CustomersState;
  projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducer
};

export const selectProjectsState = createFeatureSelector<
  fromProjects.ProjectsState
>('projects');

export const selectProjectIds = createSelector(
  selectProjectsState,
  fromProjects.selectProjectIds
);

export const selectCurrentProjectId = createSelector(
  selectProjectsState,
  fromProjects.getSelectedProjectId
);
export const selectProjectEntities = createSelector(
  selectProjectsState,
  fromProjects.selectProjectEntities
);

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
};

export const selectCurrentProject = createSelector(
  selectProjectEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) => {
    return projectId ? projectEntities[projectId] : emptyProject;
  }
);

export const selectAllProjects = createSelector(
  selectProjectsState,
  fromProjects.selectAllProjects
);

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<
  fromCustomers.CustomersState
>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);

export const selectCustomerProjects = createSelector(
  selectAllCustomers,
  selectAllProjects,
  (customers, projects) => {
    debugger;
    return customers.map(customer => {
      return Object.assign(
        {},
        {
          ...customer,
          projects: projects.filter(
            project => project.customerId === customer.id
          )
        }
      );
    });
  }
);
