import React, { Fragment, useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";

const Percentage = ({project_id}) => {
  const [data, setData] = useState([])
  
  useEffect(()=>{
    fetch(`project/item/${project_id}`, {
      method: "get",
    })
      .then(res => res.json())
      .then((data) => {
        setData(data)
      });
  },[])
console.log(project_id)
console.log(data)

const arrResult = [];
const countryName = [];

data.forEach(function(value, index) {
arrResult[index] = value;
});
console.log(arrResult)

for (var key in arrResult){
    countryName.push(arrResult[key].completd);
  }

console.log(countryName)



return (
    <Fragment>
        <ProgressBar />
    </Fragment>
  );
};

export default Percentage;