export const truncAddress = address => {
  if (!address || address.length < 20) {
    return address;
  }
  const first = address.slice(0, 5);
  const last = address.slice(-4);
  return `${first}...${last}`;
};

export const getDistance = (val1, val2) => {
  return;
};
