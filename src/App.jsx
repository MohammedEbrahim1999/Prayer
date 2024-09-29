import { useEffect, useState } from 'react'
import Prayer from './Component/Prayer'
// import Weather from './Component/Weather'

function App() {
  const [prayer, setPrayer] = useState({})
  const [date, setDate] = useState("")
  const [city, setCity] = useState('Mansoura');
  const [day, setDay] = useState("")
  // const[weather,setWeater]= useState({})
  const Cities = [
    { name: "المنصورة", value: "Mansoura" },
    { name: "القاهرة", value: "Cairo" },
    { name: "الأسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "أسوان", value: "Aswan" },
    { name: "الأقصر", value: "Luxor" },
  ]
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`);
        const data_prayer = await response.json();
        setPrayer(data_prayer.data.timings);
        setDate(data_prayer.data.date.gregorian.date);
        setDay(data_prayer.data.date.gregorian.weekday.en);
      } catch (error) {
        console.log("There Is Error" + error)
      }
    }
    fetchPrayerTimes()
  }, [city])


  const formatTime = (time) => {
    if (!time) {
      return "00.00";
    }
    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes: minutes} ${perd}`
}




// useEffect(() => {
//   const fetchPrayerTimes = async()=>{
//     try{
//       const responseWeather = await fetch("https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=%3Cspan%20class=dt");
//       const data_Weather = await responseWeather.json();
//       setWeater(data_Weather);
//       console.log(data_Weather)
//     }catch(error){
//       console.log("There Is Error" + error)
//     }
//   }
//   fetchPrayerTimes()
// },[])
return (
  <section>
    <div className="container">
      <div className="top-sec">
        <div className="city">
          <h3>المدينة</h3>
          <select name="" id="" onChange={(e) => setCity(e.target.value)}>
            {Cities.map((item) => {
              return (
                <option value={item.value} key={item.value}> {item.name}</option>
              )
            })}
          </select>
        </div>
        <div className="date">
          <h3>التاريخ</h3>
          <h4>{date}</h4>
        </div>
      </div>


      <Prayer name="الفجر" day={day} time={formatTime(prayer.Fajr)} />
      <Prayer name="الظهر" day={day} time={formatTime(prayer.Dhuhr)} />
      <Prayer name="العصر" day={day} time={formatTime(prayer.Asr)} />
      <Prayer name="المغرب" day={day} time={formatTime(prayer.Maghrib)} />
      <Prayer name="العشاء" day={day} time={formatTime(prayer.Isha)} />
    </div>
    {/* <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id="">
              {Cities.map((item) => {
                return (
                  <option value={item.value} key={item.value}> {item.name}</option>
                )})}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{date}</h4>
          </div>
        </div>
        <Weather />
      </div> */}
  </section>
)
}

export default App
