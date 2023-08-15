import configurationConstants from './configurationConstants';

export const lights = [
  {
    color: configurationConstants.LIGHT_COLOR,
    intensity: configurationConstants.LIGHT_INTENSITY,
    distance: configurationConstants.LIGHT_DISTANCE,
    position: [0, 15, 25] as [number, number, number],
  },
  {
    color: configurationConstants.LIGHT_TWO_COLOR,
    intensity: configurationConstants.LIGHT_TWO_INTENSITY,
    distance: configurationConstants.LIGHT_TWO_DISTANCE,
    position: [0, -15, -25] as [number, number, number],
  },
  {
    color: configurationConstants.LIGHT_THREE_COLOR,
    intensity: configurationConstants.LIGHT_THREE_INTENSITY,
    distance: configurationConstants.LIGHT_THREE_DISTANCE,
    position: [-10, 5, 10] as [number, number, number],
  },
  {
    color: configurationConstants.LIGHT_FOUR_COLOR,
    intensity: configurationConstants.LIGHT_FOUR_INTENSITY,
    distance: configurationConstants.LIGHT_FOUR_DISTANCE,
    position: [10, -5, -10] as [number, number, number],
  },
  {
    color: configurationConstants.LIGHT_FIVE_COLOR,
    intensity: configurationConstants.LIGHT_FIVE_INTENSITY,
    distance: configurationConstants.LIGHT_FIVE_DISTANCE,
    position: [20, -10, 10] as [number, number, number],
  },
  {
    color: configurationConstants.LIGHT_SIX_COLOR,
    intensity: configurationConstants.LIGHT_SIX_INTENSITY,
    distance: configurationConstants.LIGHT_SIX_DISTANCE,
    position: [45, 30, -20] as [number, number, number],
  },
];
