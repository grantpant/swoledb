import React, { Fragment } from 'react';

const EquipmentPieceInput = (props) => (
  <Fragment>
    <label>
      <input
        type="checkbox"
        name="equipment-piece"
        value={props.equipmentPiece.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
      {' '}{props.equipmentPiece}
    </label>
    <br />
  </Fragment>
);

export default EquipmentPieceInput;