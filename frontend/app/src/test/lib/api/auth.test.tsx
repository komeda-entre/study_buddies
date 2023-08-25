import { waitFor } from "@testing-library/react";
import Cookies from "js-cookie";
import {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
} from "lib/api/auth"; 
import client from "lib/api/client"; 

// Mocking the client
jest.mock("lib/api/client"); 

describe("API Functions", () => {
    beforeEach(() => {
        // Clear any cookies before each test
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        jest.clearAllMocks(); 
    });

    it("signUp sends a POST request and handles response", async () => {
        const mockSignUpResponse = {
            data: "user-data",
            status: 200,
        };
        client.post = jest.fn().mockResolvedValue(mockSignUpResponse);

        const signUpParams = {
            email: "test@example.com",
            password: "testpassword",
            passwordConfirmation: "testpassword",
        };

        const response = await signUp(signUpParams);

        expect(client.post).toHaveBeenCalledWith("auth", signUpParams);
        expect(response).toEqual(mockSignUpResponse);
    });

    it("signIn sends a POST request and handles response", async () => {
        const mockSignInResponse = {
            status: 200,
            headers: {
                "access-token": "mock-access-token",
                client: "mock-client",
                uid: "mock-uid",
            },
            data: {
                data: "mock-user-data",
            },
        };
        client.post = jest.fn().mockResolvedValue(mockSignInResponse);

        const signInParams = {
            email: "test@example.com",
            password: "testpassword",
        };

        const response = await signIn(signInParams);
        await waitFor(() => {
            expect(client.post).toHaveBeenCalledWith("auth/sign_in", signInParams);
            expect(response).toEqual(mockSignInResponse);
        });
    });

    it("signOut sends a DELETE request and handles response", async () => {
        const mockSignOutResponse = {
            status: 200,
        };
        client.delete = jest.fn().mockResolvedValue(mockSignOutResponse);

        const response = await signOut();

        expect(client.delete).toHaveBeenCalledWith("auth/sign_out", {
            headers: {
                "access-token": undefined,
                "client": undefined,
                "uid": undefined,
            },
        });
        expect(response).toEqual(mockSignOutResponse);
    });

    it("getCurrentUser sends a GET request and handles response", async () => {
        const mockCurrentUserResponse = {
            data: "user-data",
            status: 200,
        };
        client.get = jest.fn().mockResolvedValue(mockCurrentUserResponse);

        Cookies.set("_access_token", "mock-access-token");
        Cookies.set("_client", "mock-client");
        Cookies.set("_uid", "mock-uid");

        const response = await getCurrentUser();

        expect(client.get).toHaveBeenCalledWith("/auth/sessions", {
            headers: {
                "access-token": "mock-access-token",
                "client": "mock-client",
                "uid": "mock-uid",
            },
        });
        expect(response).toEqual(mockCurrentUserResponse);
    });

    it("getCurrentUser returns undefined when cookies are missing", async () => {
        const response = await getCurrentUser();

        expect(client.get).not.toHaveBeenCalled();
        expect(response).toBeUndefined();
    });
});
