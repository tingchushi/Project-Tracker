import React, { Fragment, useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";

const Percentage = ({pid}) => {
  const [data, setData] = useState([])
  
  useEffect(()=>{
    fetch(`project/item/${pid}`, {
      method: "get",
    })
      .then(res => res.json())
      .then((data) => {
        setData(data)
      });
  },[])

const completedCount = [];
const completedNumerator = [];

data.forEach(function(value, index) {
completedCount[index] = value;
});
console.log(completedCount)

for (var key in completedCount){
    completedNumerator.push(completedCount[key].completed);
  }

const numerator = completedNumerator.filter(x => x==true).length

const percentage = (numerator * 100 / completedNumerator.length).toFixed(0)

return (
    <Fragment>
        <ProgressBar now={!percentage ? 0 : percentage} />
        <p style={{textAlign:'center', padding:'10px'}}>{isNaN(percentage) ? 0.00 : percentage}% Completed</p>
    </Fragment>
  );
};

export default Percentage;