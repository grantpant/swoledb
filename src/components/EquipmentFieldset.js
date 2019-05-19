import React from 'react';

class EquipmentFieldset extends React.Component {
  state = {
    barbell: false,
    barbellRack: false,
    dumbbells: false,
    bench: false,
    kettleBell: false,
    smithRack: false,
    cable: false,
    dipStation: false,
    romanChair: false,
    pullUpBar: false,
    trx: false,
    step: false,
    box: false,
    band: false,
    medicineBall: false,
    swissBall: false,
    bosuBall: false,
    foamRoller: false,
    cones: false,
    agilityLadder: false,
    miniHurdles: false
  };
  onChange = (e) => {
    const equipmentPiece = e.target.value;
    this.setState((prevState) => ({ [equipmentPiece]: !prevState[equipmentPiece] }));

    this.props.onChange(equipmentPiece);
  };
  render() {
    return (
      <fieldset id="equipment" className="checkbox-set">
        <h4>Equipment</h4>
        <label>
          Barbell{' '}
          <input
            type="checkbox"
            name="equipment"
            value="barbell"
            checked={this.state.barbell}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Barbell rack{' '}
          <input
            type="checkbox"
            name="equipment"
            value="barbellRack"
            checked={this.state.barbellRack}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Dumbbells{' '}
          <input
            type="checkbox"
            name="equipment"
            value="dumbbells"
            checked={this.state.dumbbells}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Bench{' '}
          <input
            type="checkbox"
            name="equipment"
            value="bench"
            checked={this.state.bench}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Kettle bell{' '}
          <input
            type="checkbox"
            name="equipment"
            value="kettleBell"
            checked={this.state.kettleBell}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Smith rack{' '}
          <input
            type="checkbox"
            name="equipment"
            value="smithRack"
            checked={this.state.smithRack}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Cable{' '}
          <input
            type="checkbox"
            name="equipment"
            value="cable"
            checked={this.state.cable}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Dip station{' '}
          <input
            type="checkbox"
            name="equipment"
            value="dipStation"
            checked={this.state.dipStation}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Roman chair{' '}
          <input
            type="checkbox"
            name="equipment"
            value="romanChair"
            checked={this.state.romanChair}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Pull-up bar{' '}
          <input
            type="checkbox"
            name="equipment"
            value="pullUpBar"
            checked={this.state.pullUpBar}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          TRX straps{' '}
          <input
            type="checkbox"
            name="equipment"
            value="trx"
            checked={this.state.trx}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Step{' '}
          <input
            type="checkbox"
            name="equipment"
            value="step"
            checked={this.state.step}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Box{' '}
          <input
            type="checkbox"
            name="equipment"
            value="box"
            checked={this.state.box}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Band{' '}
          <input
            type="checkbox"
            name="equipment"
            value="band"
            checked={this.state.band}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Medicine ball{' '}
          <input
            type="checkbox"
            name="equipment"
            value="medicineBall"
            checked={this.state.medicineBall}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Swiss ball{' '}
          <input
            type="checkbox"
            name="equipment"
            value="swissBall"
            checked={this.state.swissBall}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          BOSU ball{' '}
          <input
            type="checkbox"
            name="equipment"
            value="bosuBall"
            checked={this.state.bosuBall}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Foam roller{' '}
          <input
            type="checkbox"
            name="equipment"
            value="foamRoller"
            checked={this.state.foamRoller}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Cones{' '}
          <input
            type="checkbox"
            name="equipment"
            value="cones"
            checked={this.state.cones}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Agility ladder{' '}
          <input
            type="checkbox"
            name="equipment"
            value="agilityLadder"
            checked={this.state.agilityLadder}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Mini hurdles{' '}
          <input
            type="checkbox"
            name="equipment"
            value="miniHurdles"
            checked={this.state.miniHurdles}
            onChange={this.onChange}
          />
        </label>
        <br />
      </fieldset>
    );
  }
}

export default EquipmentFieldset;