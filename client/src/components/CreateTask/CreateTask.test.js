import React from "react";
import CreateTask from "./CreateTask";
import { Provider } from "react-redux";
import { BrowserRouter as Router} from "react-router-dom";
import store from "../../Redux/store";
import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
    render(
      <Router>
        <Provider store={store}>
          <CreateTask />
        </Provider>
      </Router>
    );
    const addTaskElement = screen.getByTestId('add-task');
    
    expect(addTaskElement).toBeInTheDocument();
  });