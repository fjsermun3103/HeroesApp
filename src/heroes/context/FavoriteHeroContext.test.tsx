import { use } from "react";
import {  afterEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  FavoriteHeroContext,
  FavoriteHeroProvider,
} from "./FavoriteHeroContext";
import type { Hero } from "../types/hero.interface";

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

const mockHero = {
  id: 1,
  name: "batman",
} as unknown as Hero;

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } =
    use(FavoriteHeroContext);

  return (
    <div>
      <div data-testid="favorite-count">{favoriteCount}</div>
      <div data-testid="favorite-list">
        {favorites.map((hero) => (
          <div key={hero.id} data-testid={`hero-${hero.id}`}>
            {hero.name}
          </div>
        ))}
      </div>
      <button
        data-testid="toggle-favorite"
        onClick={() => toggleFavorite(mockHero)}
      >
        Toggle Favorite
      </button>
      <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
    </div>
  );
};

const renderContextTest = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>,
  );
};

describe("FavoriteHeroContext", () => {
  afterEach(() => {
      localStorage.clear();
  })

  test("should initialize with default values", () => {
    renderContextTest();

    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("favorite-list").children.length).toBe(0);
  });

  test("should add hero to favorites when toggleFavorite when toggleFavorite is called with a new hero", () => {
    renderContextTest();
    const button = screen.getByTestId("toggle-favorite");

    fireEvent.click(button);

    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
  });

  test("should remove hero from favorites when toggleFavorite when toggleFavorite is called", () => {
    renderContextTest();
    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);
    
    expect(screen.getByTestId('favorite-count').textContent).toBe('1');
    expect(screen.getByTestId('is-favorite').textContent).toBe('true');
    expect(screen.getByTestId('hero-1').textContent).toBe('batman');

    fireEvent.click(button);

    expect(screen.getByTestId('favorite-count').textContent).toBe('0');
    expect(screen.getByTestId('is-favorite').textContent).toBe('false');
    expect(screen.queryByTestId('hero-1')).toBeNull();
  });
});
