import React from 'react';
import propTypes from 'prop-types';
import '../styles/Tooltip.css';

export default class Tooltip extends React.Component {

  static propTypes = {
    features: propTypes.array.isRequired,
  };


  render() {
    const { features, active, year } = this.props;
  
    return (
      <div className="flex-parent-inline flex-parent--center-cross flex-parent--column absolute bottom">
        <div className="flex-child color-white shadow-darken10 round txt-s w140 clip txt-truncate">
          <h4 className="tooltip-header">{features[0].properties.name}</h4>
          <table>
            <tbody>
              <tr className={active.name === 'Male' ? 'row-active' : 'row-inactive'}>
                <td>Male</td>
                <td>{features[0].properties[`opioid_data_location_id`] ? parseFloat(features[0].properties[`opioid_rate_male_${year}`]).toFixed(2) : 'No Data'}</td>
              </tr>
              <tr className={active.name === 'Female' ? 'row-active' : 'row-inactive'}>
                <td>Female</td>
                <td>{features[0].properties[`opioid_data_location_id`] ? parseFloat(features[0].properties[`opioid_rate_female_${year}`]).toFixed(2) : 'No Data'}</td>
              </tr>
              <tr className={active.name === 'Both' ? 'row-active' : 'row-inactive'}>
                <td>Both</td>
                <td>{features[0].properties[`opioid_data_location_id`] ? parseFloat(features[0].properties[`opioid_rate_both_${year}`]).toFixed(2) : 'No Data'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <span className="flex-child color-white triangle triangle--d"></span>
      </div>
    );
  }
}
