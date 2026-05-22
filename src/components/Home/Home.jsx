import React, { useContext } from 'react'
import Style from "./Home.module.css"
import { CounterContext } from '../../Context/Contect'




export default function Home() {

  let { Counter, setCounter } = useContext(CounterContext);

  return (<>
    <div>Home:{Counter}</div>
    <button onClick={() => setCounter(Math.floor(Math.random() * 10))} className='btn btn-info'>Change</button>

  </>
  )
}
