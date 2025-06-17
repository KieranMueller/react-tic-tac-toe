export default function GameTile({status, handleClick, row, column}: 
    {status: null | 'X' | 'O', handleClick: any, row: number, column: number}) {
    return (
        <div onClick={() => {
            if (!status) {
                handleClick(row, column)
            }
        }} className="tile">{status}</div>
    )
}
