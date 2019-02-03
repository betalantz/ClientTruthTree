import React, {Component} from 'react';
import '../styles/App.css';
import Map from './Map';
import Infographic from './Infographic';
import HamburgerMenu from 'react-hamburger-menu';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import superagent from 'superagent';
import { ClipLoader } from 'react-spinners';
import ScrollUpButton from 'react-scroll-up-button';
// import stateGeojson from '../assets/modified_states.json';
// import countyGeojson from '../assets/modified_counties.json';

const options = {
  'revenue':{
    'Total Taxes': 'Total_Taxes', 
    'Property Tax': 'Property_Tax',
    'Sales Tax': 'Tot_Sales_Gr_Rec_Tax', 
    'License Taxes': 'Total_License_Taxes', 
    'Income Tax': 'Total_Income_Taxes', 
    'Estate Tax': 'Death_and_Gift_Tax', 
    'Real Estate Transfer Tax': 'Docum_and_Stock_Tr_Tax', 
    'Severence Tax': 'Severance_Tax', 
    'Other Taxes': 'Taxes_NEC',
  },
  'expenditure':{
    'Total Expenditures': 'Total_Expenditure',
    'Correctionals': 'Correct_Total_Exp', 
    'Education': 'Total_Educ_Total_Exp',
    'Judicial': 'Judicial_Total_Expend', 
    'Housing & Community Development': 'Hous___Com_Total_Exp', 
    'Police': 'Police_Prot_Total_Exp', 
    'Public Welfare': 'Public_Welf_Total_Exp', 
    'Welfare (Other)': 'Welf_NEC_Total_Expend',
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateData: [],
      countyData: [],
      loading: true,
      category: 'revenue',
      selectedField: 'Total Taxes',
      localeData: [],
    };
    
    this.fetchDefaultData = this.fetchDefaultData.bind(this);
    this.fetchSelectedData = this.fetchSelectedData.bind(this);
    this.fetchLocaleData = this.fetchLocaleData.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  componentDidMount() {
    this.fetchDefaultData();
  }

  fetchDefaultData(category = 'revenue', selectedField = Object.keys(options[this.state.category])[0]){
    // console.log(category);
    const baseURL = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'http://ihme-env.22u24hwmvk.us-west-2.elasticbeanstalk.com';

    const loading = false;

    superagent.get(`${baseURL}/api/v1/${category}/allstates?fields=Name,Population,Total_Revenue,${Object.values(options[category])[0]}`)
      .then(res => {
        return res.body;
      })
      .then(stateData =>
        superagent.get(`${baseURL}/api/v1/${category}/allcounties?fields=Name,Population,Total_Revenue,${Object.values(options[category])[0]}`)
          .then(res=> {
            const countyData = res.body;
            this.setState({stateData, countyData, loading, category, selectedField});
            // console.log(this.state.category);
          })
      ); 
  }

  fetchLocaleData(localeLevel, localeID){
    const baseURL = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'http://ihme-env.22u24hwmvk.us-west-2.elasticbeanstalk.com';

    superagent.get(`${baseURL}/api/v1/${this.state.category}/${localeLevel}/${localeID}`)
      .then(res => {
        const localeData = res.body;
        console.log(res);
        this.setState({localeData});
      });
  }


  fetchSelectedData(selectedField){
    const baseURL = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'http://ihme-env.22u24hwmvk.us-west-2.elasticbeanstalk.com';
    
    superagent.get(`${baseURL}/api/v1/${this.state.category}/allstates?fields=Name,Population,Total_Revenue,Total_Taxes,${options[this.state.category][selectedField]}`)
      .then(res => {
        return res.body;
      })
      .then(stateData =>
        superagent.get(`${baseURL}/api/v1/${this.state.category}/allcounties?fields=Name,Population,Total_Revenue,Total_Taxes,${options[this.state.category][selectedField]}`)
          .then(res=> {
            const countyData = res.body;
            this.setState({stateData, countyData, selectedField});
          })
      );
  }

  // We need this to set category to state and also toggle dropdown label & options.
  handleCategorySelect(e) {
    console.log(e.target.id);
    const category = e.target.id;
    const selectedField = Object.keys(options[category])[0];
    // this.setState({category, selectedField});
    this.fetchDefaultData(category, selectedField);
  }


  render() {
    const {stateData, countyData, selectedField, localeData} = this.state;
    

    if(this.state.loading){
      return(
        <div  className="spinner">
          <ClipLoader
            sizeUnit={'px'}
            size={150}
            color={'#08306b'}
            loading={this.state.loading}
          />
        </div>
      );
    }
    else{
      const scrollButtonStyle = {
        display: 'block',
        position: 'relative',
        right: '0',
        bottom: '0',
        width: '50px',
        margin: 'auto',
        transition: 'opacity 0.5s ease-in-out 0s',
        opacity: '0.4',
        fill: 'black',
        backgroundColor: 'transparent',
        zIndex: '1',  
      };
  
      let arrow = <ScrollUpButton style={scrollButtonStyle} ToggledStyle={{right: 0, opacity: 0.5}} ContainerClassName="scroll-up-button"/>;
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
            <h1 className="page-title">Social Justice Spending</h1>
            <h2 className="subtitle">FINDINGS FROM THE GOVERNMENT FINANCE DATABASE</h2>
          </header>
          <section id="page1">
            <div className="button-container">
              <button className={this.state.category === 'revenue' ? 'category-button-focused' : 'category-button'} onClick={e=>this.handleCategorySelect(e)} id="revenue">Revenue</button>
              <button className={this.state.category === 'expenditure' ? 'category-button-focused' : 'category-button'} onClick={e=>this.handleCategorySelect(e)} id="expenditure">Expenditures</button>
            </div>
            <div className="dropdown-container">
              <Dropdown options={Object.keys(options[this.state.category])} onChange={e=>this.fetchSelectedData(e.value)} value={this.state.selectedField} placeholder="Select an option" />
            </div>
            <Map 
              stateData={stateData}
              countyData={countyData}
              selectedField={options[this.state.category][selectedField]}
              fetchLocaleData={this.fetchLocaleData}
            />
          </section>
          <section id="page2" style={{display: localeData.length ? 'block' : 'none' }}>
            {arrow}
            
            <Infographic
              data={localeData}
            />

          </section>        
        </div>
      );
    }
  }
}
