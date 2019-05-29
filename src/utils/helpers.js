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

export const toCamelCase = (checkboxLabel) => {
  const hasSpace = new RegExp(/\s/, 'g').test(checkboxLabel);
  const hasHyphen = new RegExp(/(-[\w])/, 'g').test(checkboxLabel);
  const hasPeriod =  new RegExp(/[.]/, 'g').test(checkboxLabel);

  let camelizedLabel = checkboxLabel.toLowerCase();

  if (hasSpace) {
    camelizedLabel = camelizedLabel.replace(/(\s[\w])/g, (match) => (
      match[1].toUpperCase()
    ));
  }
  if (hasHyphen) {
    camelizedLabel = camelizedLabel.replace(/(-[\w])/g, (match) => (
      match[1].toUpperCase()
    ));
  }
  if (hasPeriod) {
    camelizedLabel = camelizedLabel.replace(/\./g,'');
  }

  return camelizedLabel;
};