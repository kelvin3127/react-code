import React, { useState,useEffect } from 'react'
import Button from './Button'
import Msg from './Msg'

export default function Main() {

    const [test3, setTest3] = useState({value: "1", state: "" , type: "", prev: "", isFloat: false})
    const [test1, setTest1] = useState("1")
    const [test2, setTest2] = useState({testexp1:"123", testexp2:"456"})

    function clicktest2() {
        console.log("clicked")
        let temp = {...test2}
        temp.testexp1 = "987"
        setTest2(temp)
    }

    function renderPage() {
        return <div>{test2.testexp1} and {test2.testexp2}</div>
    }

    useEffect(()=> {
        console.log(test2)
        renderPage()
    }, [test2])
    
  return (
    <div>
        <p>{test1}</p>
        {renderPage()}
        <Msg
            test3={test3}
        />
        <Button
            test3={test3}
            setTest3={setTest3}
        />
        <button onClick={ () => clicktest2()}>test2</button>
        <button onClick={() => setTest1("2")}>test1</button>
    </div>
  )
}
