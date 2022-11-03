import React, { useState } from "react";
import '../App/App.css';

const initiState = {
    weight: '',
    height: '',
    date: '',
}

const BmiForm = ({handleBmiForm}) => {

   const [state, setState] = useState(initiState)
   const date = new Date().toLocaleDateString().split(',')[0];

   const handleWeight = (e) => {
       const newState = {...state}
       newState.weight = e.target.value
       newState.date = date
       setState(newState)
   }

   const handleHeight = (e) => {
       const newState = {...state}
       newState.height = e.target.value
       newState.date = date
       setState(newState)
   }

   const handleSubmit = () => {
        handleBmiForm(state)
        setState(initiState)
   }

    return(
        <>
        <div className="row">
            <div className="col m6 s12">
                <label htmlFor="weight">Weight (in kg)</label>
                <input
                 id="wight"
                 name="weight"
                 type='tel'
                 maxLength='3'
                 placeholder="$ 0" 
                 value={state.weight}
                 onChange={(e) => handleWeight(e)} 
                 ></input>
            </div>
            <div className="col m6 s12">
                <label htmlFor="height">Height (in cm)</label>
                <input
                 id="height"
                 name="height"
                 type='tel'
                 maxLength='3'
                 placeholder="0"
                 value={state.height}
                 onChange = {(e) => handleHeight(e)}
                 ></input>
            </div>
        </div>
        <div className="center">
            <button
             id="bmi-btn"
             className="calculate-btn"
             type="button"
             disabled = {state.weight === '' || state.height === ''}
             onClick = {handleSubmit}
            >
             Calculate BMI
            </button>
        </div>
        </>
    )
}

export default BmiForm;