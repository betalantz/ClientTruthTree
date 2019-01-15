import pandas as pd
import json
from pprint import pprint

with open('./src/data.json') as f:
    data = json.load(f)

pprint(data['features'])

csv_data = pd.read_csv(
    './src/IHME-GBD_2017_DATA-37d305ef-1.csv',
    error_bad_lines=False
)
df = pd.DataFrame(csv_data)

df_country = df[(df['location_name'] == 'Afghanistan') & (df['year'] == 2017)]

failed = []

# The following block of code attempts every name possibility. There are 6 missing from our dataset. 
# There are 177 countries in the geojson file. So 171 will be painted in the map.
dataset = data['features']

for country in dataset:
    country_name_fields = ['name', 'admin', 'name_long', 'name_sort', 'sovereignt', 'subunit']
      
    error = True
    name_index = 0
    
    while error:
        if name_index == len(country_name_fields):
            failed.append(country_name)
            break
            
        try:
            country_name = country['properties'][country_name_fields[name_index]]
            df_country = df[(df['location_name'] == country_name) & (df['year'] == 2017)]
            opioid_rate_male = df_country[(df['sex_id'] == 1)].iloc[0]['val']
            opioid_rate_female = df_country[(df['sex_id'] == 2)].iloc[0]['val']
            opioid_rate_both = df_country[(df['sex_id'] == 3)].iloc[0]['val']
            # Might need to convert from float/decimal
            data['features'][0]['properties']['opioid_rate_male'] = opioid_rate_male
            data['features'][0]['properties']['opioid_rate_female'] = opioid_rate_female
            data['features'][0]['properties']['opioid_rate_both'] = opioid_rate_both
            error=False
        except IndexError:
            name_index += 1

pprint(data['features'][0]) 
pprint(failed)