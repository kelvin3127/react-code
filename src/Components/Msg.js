import React, { useEffect } from 'react'

export default function Msg({test3}) {
    useEffect(() => {
        console.log("changed")

    }, [test3])

  return (
    <div>{test3.value}</div>
  )
}
