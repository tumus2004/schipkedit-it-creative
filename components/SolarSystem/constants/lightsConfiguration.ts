import {
  LIGHT_COLOR,
  LIGHT_DISTANCE,
  LIGHT_FIVE_COLOR,
  LIGHT_FIVE_DISTANCE,
  LIGHT_FIVE_INTENSITY,
  LIGHT_FOUR_COLOR,
  LIGHT_FOUR_DISTANCE,
  LIGHT_FOUR_INTENSITY,
  LIGHT_INTENSITY,
  LIGHT_SIX_COLOR,
  LIGHT_SIX_DISTANCE,
  LIGHT_SIX_INTENSITY,
  LIGHT_THREE_COLOR,
  LIGHT_THREE_DISTANCE,
  LIGHT_THREE_INTENSITY,
  LIGHT_TWO_COLOR,
  LIGHT_TWO_DISTANCE,
  LIGHT_TWO_INTENSITY,
} from './configurationConstants';

export const lights = [
  {
    color: LIGHT_COLOR,
    intensity: LIGHT_INTENSITY,
    distance: LIGHT_DISTANCE,
    position: [0, 15, 25] as [number, number, number],
  },
  {
    color: LIGHT_TWO_COLOR,
    intensity: LIGHT_TWO_INTENSITY,
    distance: LIGHT_TWO_DISTANCE,
    position: [0, -15, -25] as [number, number, number],
  },
  {
    color: LIGHT_THREE_COLOR,
    intensity: LIGHT_THREE_INTENSITY,
    distance: LIGHT_THREE_DISTANCE,
    position: [-10, 5, 10] as [number, number, number],
  },
  {
    color: LIGHT_FOUR_COLOR,
    intensity: LIGHT_FOUR_INTENSITY,
    distance: LIGHT_FOUR_DISTANCE,
    position: [10, -5, -10] as [number, number, number],
  },
  {
    color: LIGHT_FIVE_COLOR,
    intensity: LIGHT_FIVE_INTENSITY,
    distance: LIGHT_FIVE_DISTANCE,
    position: [20, -10, 10] as [number, number, number],
  },
  {
    color: LIGHT_SIX_COLOR,
    intensity: LIGHT_SIX_INTENSITY,
    distance: LIGHT_SIX_DISTANCE,
    position: [45, 30, -20] as [number, number, number],
  },
];
