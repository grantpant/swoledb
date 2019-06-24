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

  return !!match;
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

export const configCheckboxVars = (stateFieldset, dbFieldset, varsFieldset) => {
  const newOptions = [];
  const currentOptions = [];

  // Get array of strings from state
  for (let key in stateFieldset) {
    if (stateFieldset[key]) {
      newOptions.push(key);
    }
  }

  // Get array of strings from db
  dbFieldset.forEach((input) => {
    currentOptions.push(input.name);
  });

  // Make sure they're in the same order
  newOptions.sort();
  currentOptions.sort();

  let somethingChanged = false;

  // Make somethingChanged true if the lengths are different
  if (newOptions.length !== currentOptions.length) {
    somethingChanged = true;
  } else {
    // If they are the same, iterate over one, comparing their values in order
    newOptions.forEach((_, i, newOptions) => {
      if (newOptions[i] !== currentOptions[i]) {
        somethingChanged = true;
      }
    });
  }

  // Run this block if an option has changed
  if (somethingChanged) {
    varsFieldset = {
      create: [],
      delete: []
    };

    // Loop over stateAttay, and if there is a value in it that's not on currentOptions,
    // that means that it needs to be added, so add that value to variables.data.create.
    newOptions.forEach((input) => {
      if (!currentOptions.includes(input)) {
        varsFieldset.create.push({ name: input });
      }
    });

    // Loop over currentOptions, and if there's a value on it that's not on newOptions,
    // that means it needs to be deleted, so add that value to variables.data.delete.
    currentOptions.forEach((input) => {
      if (!newOptions.includes(input)) {
        // Get the matching input from props to access the id
        const deletedInput = dbFieldset.find((propsInput) => (
          propsInput.name === input
        ));

        varsFieldset.delete.push({ id: deletedInput.id });
      }
    });

    return varsFieldset;
  }
};