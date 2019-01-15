import React, {Component} from 'react';
import '../styles/App.css';
import Map from './Map';
import HamburgerMenu from 'react-hamburger-menu';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateData: [],
      countyData: [],
    };
  }


  render() {
    const {stateData, countyData} = this.state;

    return ( 
      <div className="body">
        <header className="header">
          <div className="header-tab">TruthTree</div>
          <div className="hamburger-menu">
            <HamburgerMenu 
              isOpen={false}
              menuClicked={()=>{}}
              width={39}
              height={20}
              strokeWidth={3}
              rotate={0}
              color='black'
              borderRadius={0}
              animationDuration={0.5}
            />
          </div>
          <h1 className="page-title">Police Expenditures in the US</h1>
          <h2 className="subtitle">FINDINGS FROM THE GOVERNMENT FINANCE DATABASE</h2>
        </header>
        <section id="page1">
          <Map />
        </section>
        
      </div>
    );
  }
}
