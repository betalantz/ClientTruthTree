import pandas as pd
import json

# Import state geojson file
with open('./states_2010.json') as f:
    data = json.load(f)

# Import State Data from Government Finance Database
# NOTE: The csv file is in the .gitignore. Download from
# http://willamette.edu/mba/research-impact/public-datasets/index.html
csv_data = pd.read_csv(
    './StateData.csv',
    error_bad_lines=False
)
df = pd.DataFrame(csv_data)


# Note geojson file includes DC & Puerto Rico
dataset = data['features']

errors = []

all_correct_total_exp = []
all_correct_by_total = []
all_correct_per_capita = []

# TODO: Refactor this for loop with a helper function to take a single column name (instead of writing the column name 4 times each time)

# For each state (for the year of 2017), append relevant data into geojson file so it can be dynamically rendered as a map layer.
for state in dataset:
    try:
        df_state = df[(df['Name'].str.lower() == state['properties']['NAME'].lower()) & (df['Year4'] == 2016)]
        population = int(df_state.iloc[0]['Population'])
        total_revenue = int(df_state.iloc[0]['Total_Revenue'])
        total_expenditure = int(df_state.iloc[0]['Total_Expenditure'])
        correct_total_exp = int(df_state.iloc[0]['Correct_Total_Exp'])
        all_correct_total_exp.append(correct_total_exp)
        all_correct_by_total.append(correct_total_exp/total_expenditure)
        all_correct_per_capita.append(correct_total_exp/population)
        state['properties']['population'] = population
        state['properties']['total_revenue'] = total_revenue
        state['properties']['total_expenditure'] = total_expenditure
        state['properties']['correct_total_exp'] = correct_total_exp
        state['properties']['correct_as_fraction_of_total_exp'] = correct_total_exp/total_expenditure
        
        state['properties']['correct_per_capita'] = correct_total_exp/population
        
    except:
        errors.append((df['Name'].str.lower()))
                      
                      
data['features'] = dataset

# Save as new geojson file
with open('./modified_states.json', 'w') as outfile:
    json.dump(data, outfile)
    
