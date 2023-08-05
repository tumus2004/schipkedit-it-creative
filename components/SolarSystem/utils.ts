import axios from 'axios';

export const fetchPlanetData = async () => {
  const BASE_URL = 'https://ssd.jpl.nasa.gov/api/horizons.api';
  const CONFIG_PARAMS =
    "?format=json&COMMAND='199'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&CENTER='@10'&START_TIME='2022-01-01'&STOP_TIME='2022-01-02'&STEP_SIZE='1%20d'";

  try {
    const response = await axios.get(`${BASE_URL}${CONFIG_PARAMS}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
