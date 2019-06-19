export const checkboxHandler = (fieldsetItem, prevState, stateFieldset) => {
  const ticker = (stateKey) => (
    fieldsetItem === stateKey
      ? !prevState[stateFieldset][stateKey]
      : prevState[stateFieldset][stateKey]
  );

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

export const isChecked = (fieldset, checkboxInput) => {
  const match = fieldset.find((exercise) => (
    [
      checkboxInput.toLowerCase(),
      toCamelCase(checkboxInput)
    ]
    .includes(exercise.name)
  ));

  return match;
};

export const checkedValue = (props, inputValue) => (
  // For radio inputs, return true if string value in AddExerciseForms's
  // state property matches that of the input value.
  props.inputType === 'radio'
    ? props.state === inputValue.toLowerCase()
    // For checkbox inputs, return a reference to the corresponding property
    // in component's state that's managing the input's "checked" value.
    : props.inputType === 'checkbox'
    ? props.state[inputValue.toLowerCase()]
    : null
);
