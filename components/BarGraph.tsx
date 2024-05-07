import React, { useEffect, useState } from 'react'
import styles from "../styles/Home.module.css"
import dynamic from 'next/dynamic'
const ChartDisplay = dynamic(() => import("./ChartDisplay") , { ssr : false})

const CitySearch = () => {

 const [searchTerm , setSearchTerm] = useState("")
 const [days , setDays] = useState(1)
 const [data, setData] = useState<any>()

  
  useEffect(() => {
    if(searchTerm.length > 2) {
        const debounceTimer = setTimeout(() => {
            fetchApi();
          }, 500)
        return () => clearTimeout(debounceTimer)
    }
    else {
        setData(null)
    }
    fetchApi()
    
  },[searchTerm , days])



  const fetchApi = async() => {
    if(searchTerm.length > 2){
      try{
       const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchTerm}&cnt=${days}&appid=23da13304a0096bcdf900edc15a66563`)
       const res = await data.json();
       setData(res)
      } 
      catch(error){
       alert(error)
      }
    }
   }

   console.log("data" , data)
  
  return (
    <div className='App'>
      <div className={styles.searchWithDays}>
        <input placeholder="search any city" className={styles.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <div>
        <input placeholder="Days (max 10)" type="number" min={1} max={10} className={styles.searchInput1} 
         value={days} onChange={(e : any) => setDays(e.target.value)}/> 
         <span style={{ marginLeft: "10px" , color: "#FFFFFF" , fontSize: "16px"}}>(max of 10 days)</span>
         </div>
      </div>
      <div>
        {data && data.cod === "200" &&
          <ChartDisplay city={data.city} list={data.list}/>
        }
        {data && data.cod === "404" &&
          <p style={{ textAlign: "center" , fontSize: "28px" , color: "#FFFFFF"}}>City not found</p>
        }
      </div>
  </div>
  )
}

export default CitySearch