import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../store/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}));

import Navbar from '../Navbar';
import { useAuthStore } from '../../store/useAuthStore';

const mockUseAuthStore = useAuthStore;

describe('Navbar', () => {
  it('renders the app name and settings link', () => {
    mockUseAuthStore.mockReturnValue({ authUser: null, logout: vi.fn() });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Nexus')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders profile and logout when user is authenticated', () => {
    mockUseAuthStore.mockReturnValue({ authUser: { email: 'test@example.com' }, logout: vi.fn() });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('hides profile and logout when user is not authenticated', () => {
    mockUseAuthStore.mockReturnValue({ authUser: null, logout: vi.fn() });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
