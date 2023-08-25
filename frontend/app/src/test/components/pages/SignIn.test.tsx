import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // For extended DOM matchers
import Cookies from "js-cookie";
import SignIn from "components/pages/SignIn"; // テスト対象のコンポーネント
import { AuthContext } from "App"; // もし必要ならば、Mockも考慮してimport
import { MemoryRouter } from "react-router-dom";

// Mock AuthContext
const mockAuthContext = {
    loading: false,
    setLoading: jest.fn(),
    isSignedIn: false,
    setIsSignedIn: jest.fn(),
    currentUser: undefined,
    setCurrentUser: jest.fn(),
};
// Mock signIn function
jest.mock("lib/api/auth", () => ({
    signIn: jest.fn().mockResolvedValue({
        status: 200,
        headers: {
            "access-token": "mock-access-token",
            client: "mock-client",
            uid: "mock-uid",
        },
        data: {
            data: "mock-user-data",
        },
    }),
}));

describe("SignIn Component", () => {
    it("submits the form successfully", async () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <MemoryRouter>
                    <SignIn />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const emailInput = screen.getByLabelText("メールアドレス");
        const passwordInput = screen.getByLabelText("パスワード");
        const submitButton = screen.getByText("Submit");

        // Fill in form fields
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "testpassword" } });

        // Trigger form submission
        fireEvent.click(submitButton);

        // Wait for async actions to complete
        await waitFor(() => {
            expect(mockAuthContext.setIsSignedIn).toHaveBeenCalledWith(true);
            expect(mockAuthContext.setCurrentUser).toHaveBeenCalledWith("mock-user-data");
            expect(Cookies.get("_access_token")).toBe("mock-access-token");
            expect(Cookies.get("_client")).toBe("mock-client");
            expect(Cookies.get("_uid")).toBe("mock-uid");
        });

    });

});
