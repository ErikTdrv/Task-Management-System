import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CompletedTasks from './CompletedTasks';
import store from '../../Redux/store';

describe('CompletedTasks component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Provider store={store}>
        <CompletedTasks/>
        </Provider>
      </Router>
    );
  });

  it('displays the "Completed Tasks" heading', () => {
    const heading = screen.getByTestId('completed-tasks-heading');
    expect(heading).toBeInTheDocument();
  });



  // ...
});