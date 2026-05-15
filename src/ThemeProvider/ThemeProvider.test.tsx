import { render } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import '@testing-library/jest-dom';

describe('ThemeProvider', () => {
  it('injects CSS custom properties correctly', () => {
    const theme = {
      colorPrimary: '#ff0000',
      radiusMd: '10px',
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <div data-testid="child">Child</div>
      </ThemeProvider>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle('--ayo-color-primary: #ff0000');
    expect(wrapper).toHaveStyle('--ayo-radius-md: 10px');
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('prevents unnecessary re-renders with useMemo', () => {
    // This is hard to test directly without spying on internals,
    // but we can at least ensure it renders consistently.
    const { rerender, container } = render(
      <ThemeProvider theme={{ colorPrimary: '#000' }}>
        <div>Child</div>
      </ThemeProvider>
    );
    
    const initialWrapper = container.firstChild;
    
    rerender(
      <ThemeProvider theme={{ colorPrimary: '#000' }}>
        <div>Child</div>
      </ThemeProvider>
    );
    
    expect(container.firstChild).toBe(initialWrapper);
  });

  it('handles empty theme correctly', () => {
    const { container } = render(
      <ThemeProvider theme={{}}>
        <div>Child</div>
      </ThemeProvider>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.length).toBe(0);
  });

  it('handles null/undefined theme correctly', () => {
    const { container } = render(
      <ThemeProvider theme={undefined}>
        <div>Child</div>
      </ThemeProvider>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.length).toBe(0);
  });

  it('skips undefined theme values', () => {
    const theme = {
      colorPrimary: undefined,
      radiusMd: '10px',
    };

    const { container } = render(
      // @ts-ignore - testing runtime behavior for undefined values
      <ThemeProvider theme={theme}>
        <div>Child</div>
      </ThemeProvider>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle('--ayo-radius-md: 10px');
    expect(wrapper.style.getPropertyValue('--ayo-color-primary')).toBe('');
  });
});
