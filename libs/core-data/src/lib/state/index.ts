import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromProjects from './projects/projects.reducer';

import * as fromCustomers from './customers/customers.reducer';

export interface AppState {
  customers: fromCustomers.CustomersState;
  projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducer
};

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
