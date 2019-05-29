import React from 'react';
import EquipmentPieceInput from './inputs/EquipmentPieceInput';

const equipment = ['Barbell', 'Barbell rack', 'Dumbbells', 'Bench', 'Kettle bell', 'Smith rack', 'Cable', 'Dip station', 'Roman chair', 'Pull-up bar', 'TRX straps', 'Step', 'Box', 'Band', 'Medicine ball', 'Swiss ball', 'BOSU ball', 'Foam roller', 'Cones', 'Agility ladder', 'Mini hurdles'];

const toCamelCase = (equipmentPiece) => {
  // It hasn't been lower-cased yet if coming from the rendered list.
  equipmentPiece = equipmentPiece.toLowerCase();
  // Check if the equipmentPiece has a space or a hyphen in it
  const hasSpace = new RegExp(/\s/, 'g').test(equipmentPiece);
  const hasHyphen = new RegExp(/(-[\w])/, 'g').test(equipmentPiece);

  if (hasSpace) {
    equipmentPiece = equipmentPiece.replace(/(\s[\w])/g, (match) => (
      match[1].toUpperCase()
    ));
  }
  if (hasHyphen) {
    equipmentPiece = equipmentPiece.replace(/(-[\w])/g, (match) => (
      match[1].toUpperCase()
    ));
  }

  return equipmentPiece;
};

class EquipmentFieldset extends React.Component {
  onChange = (e) => {
    let equipmentPiece = e.target.value;

    equipmentPiece = toCamelCase(equipmentPiece);

    this.props.onChange(equipmentPiece);
  };
  render() {
    return (
      <fieldset className="fieldset">
        <div className="fieldset__header">
          <h4>Equipment</h4>
        </div>
        <div className="fieldset__body">
          {equipment.map((equipmentPiece, i) => {
            const checkedValue = toCamelCase(equipmentPiece);

            return (
              <EquipmentPieceInput
                key={i}
                equipmentPiece={equipmentPiece}
                checked={this.props.state[checkedValue]}
                onChange={this.onChange}
              />
            );
          })}
        </div>
      </fieldset>
    );
  }
}

export default EquipmentFieldset;