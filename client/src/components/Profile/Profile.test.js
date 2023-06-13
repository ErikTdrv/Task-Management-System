import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Profile from './Profile';
import store from '../../Redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Profile component', () => {


    it('does not render user information when user data is not available', () => {
        render(
            <Router>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        // Check if user information is not rendered
        expect(screen.queryByText('Username:')).toBeNull();
        expect(screen.queryByText('Email:')).toBeNull();
        expect(screen.queryByText('Current Tasks:')).toBeNull();
        expect(screen.queryByText('Completed Tasks:')).toBeNull();
    });

    // Add more tests here...
});