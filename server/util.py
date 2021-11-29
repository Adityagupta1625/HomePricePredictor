import numpy as np
import pickle
import json

_location=None
_model=None
_data_columns=None

def get_estimated_price(location,sqft,bhk,bath):
    try:
        loc_index = _data_columns.index(location.lower())
    except:
        loc_index = -1
    
    x=np.zeros(len(_data_columns))
    x[0]=sqft
    x[1]=bhk
    x[2]=bath
    if loc_index>=0:
        x[loc_index]=1
    return round( _model.predict([x])[0],2)

def get_location_names():
    
    return _location

def get_data_columns():
    return _data_columns

def load_saved_artifacts():
    global _location
    global _data_columns
    
    f= open('server/cols.json')
    _data_columns = json.load(f)['data_columns']
    _location = _data_columns[3:]  

    
    global _model
    if _model is None:
        with open('server/homeprice.pickle', 'rb') as f:
            _model = pickle.load(f)
    

   

if __name__ == "__main__":
    load_saved_artifacts()
    get_location_names()
    # other location