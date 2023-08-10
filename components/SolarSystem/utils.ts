import axios from 'axios';

export const fetchPlanetData = async () => {
  const BASE_URL = 'https://ssd.jpl.nasa.gov/api/horizons.api';
  const CONFIG_PARAMS =
    "?format=json&COMMAND='199'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&CENTER='@10'&START_TIME='2023-08-09'&STOP_TIME='2023-08-09'&STEP_SIZE='1%20d'";

  try {
    const response = await axios.get(`${BASE_URL}${CONFIG_PARAMS}`);
    console.log('response', response);
    
    // const positionVelocityStr = response.data.result.split('$$SOE\n')[1].split('$$EOE\n')[0].split('\n')[1];
    // const [, X, Y, Z, VX, VY, VZ] = positionVelocityStr.split(/\s+/);
    // const scaleFactor = 1;
    // const initialX = parseFloat(X) * scaleFactor;
    // const initialY = parseFloat(Y) * scaleFactor;
    // const initialZ = parseFloat(Z) * scaleFactor;
    console.log(response.data.result, typeof response.data.result, 'response.data.result');
    // console.log(initialX, initialY, initialZ, 'initialX, initialY, initialZ');
  } catch (error) {
    console.log(error);
  }
};
