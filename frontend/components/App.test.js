import React from "react"
import AppFunctional from "./AppFunctional"
import { fireEvent, screen, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'

test('render without any errors', () => {
  render(<AppFunctional />);
});

test('Coordinates display on the screen.', () => {
  render(<AppFunctional />);
  const coordinates = screen.getByText(/coordinates/i);
  expect(coordinates).toBeInTheDocument;
});

test('steps increment on upward move', () => {
  render(<AppFunctional />);
  const up = screen.getByText(/up/i);
  fireEvent.click(up);
  const steps = screen.getByText(/you moved 1 times/i);
  expect(steps).toBeInTheDocument;
});

test('left button changes coordinates', () => {
  render(<AppFunctional />);
  const left = screen.getByText(/left/i);
  fireEvent.click(left);
  const newCoordinates = screen.getByText('Coordinates (1, 2)');
  expect(newCoordinates).toBeInTheDocument;
});

test('reset button sets all to initial values', () => {
  render(<AppFunctional />);
  const reset = screen.getByText(/reset/i);
  fireEvent.click(reset);
  const initialCoordinates = screen.getByText('Coordinates (2, 2)');
  expect(initialCoordinates).toBeInTheDocument;
});
