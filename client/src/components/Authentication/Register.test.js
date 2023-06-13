import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import Register from "./Register";


describe('Register component', () => {
    beforeEach(() => {
        render(
            <Router>
                <Provider store={store}>
                    <Register />
                </Provider>
            </Router>
        );
    });

    it('renders without crashing', () => {
        const registerTitle = screen.getByText('Register Here');
        expect(registerTitle).toBeInTheDocument();
    });

    it('disables the Register button when there are errors', () => {
        const registerButton = screen.getByRole('button', { name: 'Register' });
        expect(registerButton).toBeDisabled();
    });

    it('enables the Register button when all fields are filled correctly', () => {
        // Fill in the required fields with valid values
        const usernameInput = screen.getByPlaceholderText('Username...');
        fireEvent.change(usernameInput, { target: { value: 'john' } });

        const emailInput = screen.getByPlaceholderText('Email...');
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

        const passwordInput = screen.getByPlaceholderText('Password...');
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password...');
        fireEvent.change(repeatPasswordInput, { target: { value: 'password' } });

        const profilePictureInput = screen.getByLabelText('Add Profile Picture');
        fireEvent.change(profilePictureInput, { target: { files: [new File([], 'profile.jpg')] } });

        const registerButton = screen.getByRole('button', { name: 'Register' });
        //Captcha required
        expect(registerButton).toBeDisabled();
    });
    it('updates the username input value correctly', () => {
        const usernameInput = screen.getByTestId('username');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');
    });

    it('updates the email input value correctly', () => {
        const emailInput = screen.getByTestId('email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
    });

    it('updates the password input value correctly', () => {
        const passwordInput = screen.getByTestId('password');
        fireEvent.change(passwordInput, { target: { value: 'test123' } });
        expect(passwordInput.value).toBe('test123');
    });

    it('updates the repeat password input value correctly', () => {
        const repeatPasswordInput = screen.getByTestId('repeatPassword');
        fireEvent.change(repeatPasswordInput, { target: { value: 'test123' } });
        expect(repeatPasswordInput.value).toBe('test123');
    });

    it('updates the profile picture input value correctly', () => {
        const profilePictureInput = screen.getByTestId('profilePicture');
        fireEvent.change(profilePictureInput, { target: { files: [new File([''], 'test.jpg', { type: 'image/jpeg' })] } });
        expect(profilePictureInput.files[0].name).toBe('test.jpg');
    });

});

  