import React from 'react'

const PersonalData = ({personalInfo}) => {

    var s = ''
    function healthy() {
        if(personalInfo.personalBmi < 18.5) {
            s = "(Underweight)"
            return s
        }
        if(personalInfo.personalBmi >= 18.5 && personalInfo.personalBmi < 24.9) {
            s = "(Healthy Weight)"
            return s
        }
        if(personalInfo.personalBmi >= 25 && personalInfo.personalBmi < 29.9) {
            s = "(Overweight)"
            return s
        }
        if(personalInfo.personalBmi > 30) {
            s = "(Obesity)"
            return s
        }
    }
    healthy();

    console.log(personalInfo)
    return (
        <div className="col m6 s12" id='center'>
          <div  className="card">
            <div className="card-content">
               <span className='card-data'>{`Your Personal BMI : ${personalInfo.personalBmi} ${s}` }</span>
               <span className='card-data'>{`Your Personal Weight : ${personalInfo.personalWeight}`}</span><br></br>
               <span className='card-data'>{`Ideal BMI : 18.5 - 24.9`}</span>
            </div>
          </div>
        </div>
    )
}


export default PersonalData;