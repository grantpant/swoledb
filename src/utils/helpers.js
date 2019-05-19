export const checkboxHandler = (fieldsetItem, prevState, stateFieldset) => {
  const ticker = (stateKey) => {
    return fieldsetItem === stateKey
      ? !prevState[stateFieldset][stateKey]
      : prevState[stateFieldset][stateKey];
  };

  const newState = {};

  for (let key in prevState[stateFieldset]) {
    newState[key] = ticker(key);
  }

  return { [stateFieldset]: newState };
};