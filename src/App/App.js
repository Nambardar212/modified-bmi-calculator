import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import BmiForm from '../BmiForm/BmiForm';
import Bar from '../Bar/Bar';
import Info from '../Info/Info';
import { v4 as uuidv4 } from 'uuid';
import {getLocalData, storeData} from '../LocalStorage/LocalStorage';
import PersonalData from '../PersonalData/Personal'

 

function App() {

  const [state, setState] = useState(getLocalData('state'))
  const [data, setData] = useState({})
  const [flag, setFlag] = useState(false)
  const [graph, setGraph] = useState({
    dates: [],
    bmis: [],
  });
  
  const handleBmiForm = (bmiValue) => {
      let heightInM = bmiValue.height / 100;
      let bmi = (bmiValue.weight / (heightInM * heightInM)).toFixed(2)
      
      bmiValue.bmi = bmi
      bmiValue.id = uuidv4()
      let newState = [...state, bmiValue]
      let len = newState.length
      if(len > 7) newState = newState.slice(1, len);
      setState(newState)
      setData({
       personalBmi: bmi,
       personalHieght: bmiValue.height,
       personalWeight: bmiValue.weight
      })
  }

  const handleDelete = (id) => {
    storeData('lastState', state)
    let newState = state.filter(i => {
      return i.id !== id;
    });
    setState(newState);
    setFlag(true)
    let timer = setTimeout(() => {
      setFlag(false)
    },10000)
   return ()=> clearTimeout(timer);
  }
   
  const handleUndo = () => {
    setState(getLocalData('lastState'))
    setFlag(false)
  }
  
 
  useEffect(()=> {
    localStorage.setItem("state", JSON.stringify(state));

    const dates = [];
    const bmis = [];

    state?.map((v) => {
      dates.push(v?.date);
      bmis.push(v?.bmi);
    });

    setGraph({
      dates: dates,
      bmis: bmis,
    });
   
  },[state])
  

  return (
      <div className='container'>
         <div className="row center">
           <h1 className="white-text">BMI Tracker</h1>
         </div>
         <div className="row">
          <div className="col m12 s12">
             <BmiForm handleBmiForm = {handleBmiForm}></BmiForm>
             {
                data.personalBmi !== undefined ? (
                  <PersonalData personalInfo = {data}></PersonalData>
                ) : (
                  ''
                )
             }
             
             <Bar labelDate = {graph.dates} labelBmi = {graph.bmis}></Bar>
             <div>
              <div className="row center">
                <h4 className="white-text">7 Day Data</h4>
              </div>
              <div className="data-container row">
                {
                   state.length !== 0 ? (
                    <>
                      {state.map((info) => (
                        <Info
                         key={info.id}
                         id={info.id}
                         weight={info.weight}
                         height={info.height}
                         date={info.date}
                         bmi={info.bmi}
                         deleteCard={handleDelete}
                        />
                      ))}
                      </>
                   ) : (
                    <div className="center white-text">No log found</div>
                   )
                }
              </div>
             </div>
             {
              flag === true ? (
                <div className="center">
                  <button className="calculate-btn" onClick={handleUndo}>
                    Undo
                  </button>
                </div>
              ) : (
                ''
              )
             }
          </div>
         </div>
      </div>
  );
}

export default App;
