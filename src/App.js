import './App.css';
import { useState, useEffect } from "react"

function App() {
  const [state, setState] = useState({
    "day": "friday",
    "monthName": "march 1st,1.00pm",
    "url": "imgIcon",
    "temperatue": "35 F",
    "weatherCondition": "clear Sky"
  })
  useEffect(() => {
    const url = "https://api.openweathermap.org/data/2.5/forecast?zip=560037,IN&appid=3eb6be99fda986c39aec7d636a9a5c30"
    fetch(url)
      .then(response => response.json())
      .then(function (data) {
        console.log(data)
        let chunkArrayData = chunkArray(data.list)
        setState({ data, chunkArrayData })
      })
  }, [])

  const chunkArray = (bigarray) => {
    var size = 8; var arrayOfArrays = [];
    for (var i = 0; i < bigarray.length; i += size) {
      arrayOfArrays.push(bigarray.slice(i, i + size));
    }
    console.log(arrayOfArrays);
    return arrayOfArrays
  }
  return (
    <div className="App">
      <h3>5-Day ForeCast</h3>
      <h5>{state?.data?.city?.name}, {state?.data?.city?.country}</h5>
      <div className="row">
        {state?.chunkArrayData?.map((ele, i) => {
          // console.log(ele)
          let description = (ele[0]["weather"]["0"]["description"]);
          console.log(description)
          let val = parseInt(ele[0].dt + "000"); let date = new Date(val)
          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          var dayName = days[date.getDay()];
          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          var monthName = monthNames[date.getMonth()];
          let  id = (ele[0]["weather"][0]["id"]);
          const iconIdMap = {
            "804" : "fa fa-cloud",

            "801" : "fa fa-cloud",
            "802" : "fa fa-cloud",
            "803" : "fa fa-cloud",
            "805" : "fa fa-few cloud"           
          }
          // console.log(date)
          let temperatue = (ele[0]["main"].temp - 273.15).toFixed(2)
          return (
            <div className="col" key={i}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">{dayName}</div>
                  <div className="card-title">{monthName}, {date.toLocaleString()}</div>
                  <i className={iconIdMap[id]} aria-hidden="true"></i>                 
                   <div className="card-title">{temperatue}</div>
                  <div className="card-title">{description}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
export default App;
