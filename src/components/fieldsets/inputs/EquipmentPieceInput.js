import React, { Fragment } from 'react';

const EquipmentPieceInput = (props) => (
  <Fragment>
    <input
      type="checkbox"
      name="equipment-piece"
      value={props.equipmentPiece.toLowerCase()}
      checked={props.checked}
      onChange={props.onChange}
    />
    {' '}{props.equipmentPiece}
    <br />
  </Fragment>
);

export default EquipmentPieceInput;