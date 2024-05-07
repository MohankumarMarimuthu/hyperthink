import React, { useEffect, useState } from 'react'
import styles from "../styles/Home.module.css"

const CitySearch = () => {

 const [searchTerm , setSearchTerm] = useState("")
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
    
  },[searchTerm])



  const fetchApi = async() => {
    if(searchTerm.length > 2){
      try{
       const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=23da13304a0096bcdf900edc15a66563`)
       const res = await data.json();
       setData(res)
     } 
     catch(error){
       alert(error)
     }
    }
   }
  
  return (
    <div className='App'>
      <div className={styles.searchCity}>
        <h1 style={{ color : "#D2D3D6" , margin: "40px 0px" , fontSize: "32px"}}>Search Any City</h1>
        <input placeholder="search any city" className={styles.searchInput} onChange={(e) => setSearchTerm(e.target.value)}/>
        {data && data.main && 
            <div>
              <p className={styles.todayTemp}>Today&apos;s temp - {data?.main?.temp}</p>
              <p className={styles.todayTemp}>Date - {data?.dt ? new Date(data.dt * 1000).toISOString().slice(0, 10) : 'N/A'}</p>
            </div>
        }
        {data && data.cod==="404"  &&
          <p className={styles.todayTemp}>No city found</p>
        }
      </div>
  </div>
  )
}

export default CitySearch