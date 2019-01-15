<a id="top"></a>

# Truth Tree Client

**Authors**: Ben Hurst, Justin Hedani, Greg Schundler, Lance Warrick

**Version**: 0.1.0

**Back-end GitHub Repo:** 
https://github.com/TruthTree/TruthTreeAPI

Front-end Tools: React, Mapbox GL JS, and D3 (VictoryJS)
___

## Table of contents

* [Overview](#overview)
* [Current Work](#current-work)
* [Next Steps](#next-steps)
* [Getting Started](#getting-started)
* [Change Log](#change-log)

___

<a id="overview"></a>

## Overview

Truth Tree is an interactive, GIS-based data visualization tool presenting the breakdown of government spending and related metrics in an effort to provide a unified resource to gauge public investment effectiveness.

Our long-term goal is a community-driven platform where registered users can create their own data visualizations, publish stories, compare trends, and engage with the public and policymakers on the issues that matter most.

**Key Features:**

* React.js components will be configured to consume [TruthTreeAPI](https://github.com/TruthTree/TruthTreeAPI) endpoints. State and County statistics will be dynamically loaded with current data from API call.

* Interactive map rendered using [Mapbox GL](https://www.mapbox.com/mapbox-gl-js/api/) and a custom GeoJSON modification/generation script (assets/modify_geojson.py).

* Charts enabled by [VictoryJS](https://formidable.com/open-source/victory/).

<a id="current-work"></a>

## Current Work

Phase One efforts consist of converting the Atkinson School of Management's Government Finance Database (State & County datasets for the time being) into a highly accessible and interactive web application to provide a baseline exploration tool.

If you're interested in contributing, we reccomend checking out the following resources:
- [Democracy Lab Profile](https://www.democracylab.org/index/?section=AboutProject&id=69)
- [Government Finance Database](http://willamette.edu/mba/research-impact/public-datasets/index.html)
- [IHME Opioid Study](https://github.com/benbenbuhben/client_opioid_study) (Our Phase One efforts will be based heavily on presenting a similar tool with the GFD dataset)

Other useful references:
- [Our Wolrd In Data](https://ourworldindata.org/)
- [ClearGov](https://www.cleargov.com/)
- [Gapminder](https://www.gapminder.org/tools/#$state$time$value=2018;;&chart-type=bubbles)
- [IHME Viz Hub](https://vizhub.healthdata.org/gbd-compare/)

<a id="next-steps"></a>

## Next Steps

As a preliminary proof of concept, this repo generates a chloropleth map presenting state correctional spending (total, per capita, and as a percent of total expenditures). Aside from general cleanup, we could use much help in: 

1. Integrating the front-end to dynamically call (perhaps through a typeahead-driven form) a specified column in the dataset (not just correctional spending) from the backend and render out the associated chloropleth on the frontend. 
2. Update the chloropeth layer to show county-level data on zoom (https://www.mapbox.com/mapbox-gl-js/example/updating-choropleth/). This will require making appends to the county geojson file.

**Key Blockers:**
1. In regards to time series analysis, **county level data is only complete in years ending with a 2 or 7** (when a census on government financial statistics is conducted). As a consequene, interim years only contain about half of the ~3000 counties in the country. ***Reference pg. 3-4 of The Government Finance Database research article***
2. The geojson file for counties was compiled in 2010. However, counties periodically get redrawn. Thus, providing a sliding time scale on the map would require accounting for this discrepancy.
___

<a id="getting-started"></a>

## Getting Started in Development (using yarn and pipenv)

In a terminal instance:

1. ```git clone https://github.com/TruthTree/ClientTruthTree.git```
2. ```cd ClientTruthTree/```
3. ```yarn install``` to install required dependencies.
4. ```touch env``` and add your Mapbox access key as REACT_APP_MAPBOX_ACCESS_TOKEN.
5. ```cd src/assets/```
6. ```pipenv shell```
7. ```pipenv install```
8. Download State and County datasets from [The Government Finance Database](http://willamette.edu/mba/research-impact/public-datasets/index.html) and place in assets/ directory.
9. Download 20m State & County geojson files from http://eric.clst.org/tech/usgeojson/ and place in assets/ directory (rename ```states_2010.json``` & ```counties_2010.json```)
10. ```python3 modify_geojson.py```
11. ```exit```
12. ```cd ../../```
13. ```yarn start```

<a id="change-log"></a> 

## Change Log

1-15-2018 11:00am - Initial Scaffolding.


[Back to top](#top)
