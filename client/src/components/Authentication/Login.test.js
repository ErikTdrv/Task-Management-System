import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import App from "../../App";
import Cookies from 'js-cookie';

describe("Login component", () => {
    it("renders without crashing", () => {
        render(
            <Router>
                <Provider store={store}>
                    <Login />
                </Provider>
            </Router>
        );

        const loginTitle = screen.getByTestId("login-title");
        expect(loginTitle).toBeInTheDocument();
    });
    it("updates the email state when email input is changed", () => {
        render(
          <Router>
            <Provider store={store}>
              <Login />
            </Provider>
          </Router>
        );
    
        const emailInput = screen.getByTestId("email-input");
        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        expect(emailInput.value).toBe("test@test.com");
      });
      it("should set auth cookie on login", async () => {
        render(
          <Router>
            <Provider store={store}>
              <Login />
            </Provider>
          </Router>
        );
    
        const emailInput = screen.getByTestId("email-input");
        const passwordInput = screen.getByTestId("password-input");
        const loginBtn = screen.getByRole("button", { name: "Login" });
    
        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.blur(emailInput);
        fireEvent.change(passwordInput, { target: { value: "testpassword" } });
        fireEvent.blur(passwordInput);
        fireEvent.click(loginBtn);
    
        Cookies.set("auth", "cookie value");
    
        const authCookie = Cookies.get("auth");
        expect(authCookie).toBeDefined();
      });
});