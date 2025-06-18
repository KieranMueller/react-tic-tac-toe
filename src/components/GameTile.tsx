import { useState } from "react"

export default function GameTile({status, handleClick, row, column}: 
    {status: null | 'X' | 'O', handleClick: any, row: number, column: number}) {
    
    let [rando, setRando] = useState<number>(0)

    function handleClickHere() {
        setRando(Math.floor(Math.random() * 2))
        handleClick(row, column)
    }
    
    return (
        <div onClick={() => {
            if (!status) {
                handleClickHere()
            }
        }} className='tile'>
            <p className={`${status ? rando === 1 ? 'slam-in' : 'spin' : ''}`}>{status}</p>
        </div>
    )
}
