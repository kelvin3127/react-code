import React from 'react'

export default function Button({test3, setTest3}) {

    function clicked() {
        console.log("clicked")
        console.log(test3)
        let temp = {...test3}
        temp.value = "5"
        console.log(temp)
  
        setTest3(temp)
    }

  return (
    <button onClick={() => clicked()}>Button</button>
  )
}
