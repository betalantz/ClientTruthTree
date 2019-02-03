import React, { Component } from 'react';
import '../../styles/App.css';
import { VictoryChart, VictoryStack, VictoryArea, VictoryLine } from 'victory';

// Convert this to a stateless (function-based) component.
export default class Line extends Component {
  render() {
    const {data} = this.props;
    return (
      <React.Fragment>
        <VictoryChart 
          width={600} 
          height={449} 
          //maxDomain={{y: maxDomainWorld }} 
          padding={{left: 60, bottom:35, top:40, right:20}}
          domainPadding={{x: [15, 15]}} 
          scale={{ x: 'time' }}
          animate={{ duration: 1500 }}
          style={{
            parent: {
              border: '1px solid #ccc',
              boxShadow: '0.7px 0.7px 0.7px 0.7px #cfcfcf',
              paddingLeft: '40px',
              paddingBottom: '10px',
            }, 
          }}
        >
          <VictoryStack>
            
            
            <VictoryLine
              data={data.map(el => ({x: new Date(el.Year, 1, 1), y: (+el.Correct_Total_Exp / +el.Total_Revenue)}))}
            />
            <VictoryLine
              data={data.map(el => ({x: new Date(el.Year, 1, 1), y: (+el.Total_Educ_Total_Exp / +el.Total_Revenue)}))}
            />
            <VictoryLine
              data={data.map(el => ({x: new Date(el.Year, 1, 1), y: (+el.Judicial_Total_Expend / +el.Total_Revenue)}))}
            />
            <VictoryLine
              data={data.map(el => ({x: new Date(el.Year, 1, 1), y: (+el.Hous_Com_Total_Exp / +el.Total_Revenue)}))}
            />
            <VictoryLine
              data={data.map(el => ({x: new Date(el.Year, 1, 1), y: (+el.Police_Prot_Total_Exp / +el.Total_Revenue)}))}
            />
            <VictoryLine
              data={data.map(el => ({x: new Date(el.Year, 1, 1), y: (+el.Public_Welf_Total_Exp / +el.Total_Revenue)}))}
            />
            
            
          </VictoryStack>
        </VictoryChart>
      </React.Fragment>
    );
  
  }
}