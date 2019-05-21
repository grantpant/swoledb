import React, { Fragment } from 'react';

const EquipmentPieceInput = (props) => (
  <Fragment>
    <label>
      {props.equipmentPiece}{' '}
      <input
        type="checkbox"
        name="equipment-piece"
        value={props.equipmentPiece.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
    <br />
  </Fragment>
);

export default EquipmentPieceInput;