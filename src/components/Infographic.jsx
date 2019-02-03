import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StackedArea from './Charts/StackedArea';
import scrollToComponent from 'react-scroll-to-component';
import '../styles/Infographic.css';
import superagent from 'superagent';

export default class Infographic extends Component {
  constructor(props){
    super(props);

    // this.state = {
    //   topCountries: [],
    // };

  }

  componentDidUpdate() {
    let resultHeadingScroll = ReactDOM.findDOMNode(this); // eslint-disable-line
    scrollToComponent(resultHeadingScroll, { offset: -197, align: 'top', duration: 900});
  }

  // componentDidMount(){
  //   const baseURL = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'http://ihme-env.22u24hwmvk.us-west-2.elasticbeanstalk.com';
    
  //   superagent.get(`${baseURL}/api/v1/top_countries`)
  //     .then(res => {
  //       let topCountries = res.body;
  //       this.setState({topCountries});
  //     });
  // }

  render() {

    let {data} = this.props;
    
    return (
      <React.Fragment>
        <div className="infographic country">
          {/* <h2 className="country-title fancy">{country}</h2> */}

          <div className="chartContainer">
            <StackedArea
              data={data}
              
            />
            
          
          </div>
        </div>
        
        
      </React.Fragment>
    );
  }
}
