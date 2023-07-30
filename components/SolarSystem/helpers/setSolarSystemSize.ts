export const setSolarSystemSize = () => {
  if (window.innerWidth < 500) {
    return 110;
  }
  if (window.innerWidth > 500 && window.innerWidth < 660) {
    return 100;
  }
  if (window.innerWidth > 660 && window.innerWidth < 768) {
    return 90;
  }
  if (window.innerWidth > 768 && window.innerWidth < 1024) {
    return 75;
  }
  return 45;
};
