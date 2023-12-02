import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SignUp from 'components/pages/SignUp/SignUpEmail/SignUpEmail';  // 適切なパスに修正してください。
import { MemoryRouter } from 'react-router-dom';

// APIモック
jest.mock('lib/api/auth', () => ({
    signUp: jest.fn().mockResolvedValue({}),
}));

// alert メソッドのモック
const alertMock = jest.fn();
window.alert = alertMock;

describe('SignUp', () => {
    it('renders the SignUp form', () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
        expect(screen.getByLabelText('パスワード', { selector: 'input#password' })).toBeInTheDocument();
        expect(screen.getByLabelText('パスワード確認', { selector: 'input#password_confirmation' })).toBeInTheDocument();
    });

    it('allows the user to fill out the form and submit it', async () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        const signUpMock = require('lib/api/auth').signUp;


        userEvent.type(screen.getByLabelText(/メールアドレス/i), 'test@example.com');
        userEvent.type(screen.getByLabelText('パスワード', { selector: 'input#password' }), 'password123');
        userEvent.type(screen.getByLabelText('パスワード確認', { selector: 'input#password_confirmation' }), 'password123');
        userEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(signUpMock).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
                passwordConfirmation: 'password123',
                confirmSuccessUrl: 'http://localhost:4000',
            });
            expect(alertMock).toHaveBeenCalledWith('confirm email');
        });
    });
});
