import React from 'react';
import EquipmentPieceInput from './inputs/EquipmentPieceInput';
import { toCamelCase } from '../../utils/helpers';

const equipment = ['Barbell', 'Barbell rack', 'Dumbbells', 'Bench', 'Kettle bell', 'Smith rack', 'Cable', 'Dip station', 'Roman chair', 'Pull-up bar', 'TRX straps', 'Step', 'Box', 'Band', 'Medicine ball', 'Swiss ball', 'BOSU ball', 'Foam roller', 'Cones', 'Agility ladder', 'Mini hurdles'];

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