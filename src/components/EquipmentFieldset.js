import React from 'react';
import EquipmentPieceInput from './EquipmentPieceInput';

const equipment = ['Barbell', 'Barbell rack', 'Dumbbells', 'Bench', 'Kettle bell', 'Smith rack', 'Cable', 'Dip station', 'Roman chair', 'Pull-up bar', 'TRX straps', 'Step', 'Box', 'Band', 'Medicine ball', 'Swiss ball', 'BOSU ball', 'Foam roller', 'Cones', 'Agility ladder', 'Mini hurdles'];

class EquipmentFieldset extends React.Component {
  onChange = (e) => {
    let equipmentPiece = e.target.value;

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

    this.props.onChange(equipmentPiece);
  };
  render() {
    return (
      <fieldset id="equipment" className="checkbox-set">
        <h4>Equipment</h4>
        {equipment.map((equipmentPiece, i) => (
          <EquipmentPieceInput
            key={i}
            equipmentPiece={equipmentPiece}
            checked={this.props.state[equipmentPiece]}
            onChange={this.onChange}
          />
        ))}
      </fieldset>
    );
  }
}

export default EquipmentFieldset;