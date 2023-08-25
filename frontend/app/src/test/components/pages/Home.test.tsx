import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Home from "components/pages/Home";
import { AuthContext } from 'App';

// テストデータの生成用のユーティリティ関数
const createUser = (overrides = {}) => ({
    id: 1,
    uid: "dummyUID",
    provider: "dummyProvider",
    allowPasswordChange: false,
    email: 'test@example.com',
    name: 'Test User',
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides
});

const createMockContext = (overrides = {}) => ({
    loading: false,
    setLoading: jest.fn(),
    isSignedIn: false,
    setIsSignedIn: jest.fn(),
    currentUser: undefined,
    setCurrentUser: jest.fn(),
    ...overrides
});

describe('Home component', () => {
    it('displays signed in user details', () => {
        const mockContext = createMockContext({
            isSignedIn: true,
            currentUser: createUser()
        });

        const { getByText } = render(
            <AuthContext.Provider value={mockContext}>
                <Home />
            </AuthContext.Provider>
        );

        expect(getByText('Signed in successfully!')).toBeInTheDocument();
        expect(getByText('Email: test@example.com')).toBeInTheDocument();
        expect(getByText('Name: Test User')).toBeInTheDocument();
    });

    it('displays not signed in message', () => {
        const mockContext = createMockContext();

        const { getByText } = render(
            <AuthContext.Provider value={mockContext}>
                <Home />
            </AuthContext.Provider>
        );

        expect(getByText('Not signed in')).toBeInTheDocument();
    });
});
