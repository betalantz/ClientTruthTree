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
          <h4 className="tooltip-header">{features[0].properties.NAME}</h4>
          <table>
            <tbody>
              <tr className={active.name === 'Total' ? 'row-active' : 'row-inactive'}>
                <td>Total</td>
                <td>{features[0].properties[`STATE`] ? parseFloat(features[0].properties[`correct_total_exp`]).toFixed(2) : 'No Data'}</td>
              </tr>
              <tr className={active.name === 'Vs. All Expenditures' ? 'row-active' : 'row-inactive'}>
                <td>Vs. All Expenditures</td>
                <td>{features[0].properties[`STATE`] ? parseFloat(features[0].properties[`correct_as_fraction_of_total_exp`]).toFixed(2) : 'No Data'}</td>
              </tr>
              <tr className={active.name === 'Per Capita' ? 'row-active' : 'row-inactive'}>
                <td>Per Capita</td>
                <td>{features[0].properties[`STATE`] ? parseFloat(features[0].properties[`correct_per_capita`]).toFixed(2) : 'No Data'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <span className="flex-child color-white triangle triangle--d"></span>
      </div>
    );
  }
}
