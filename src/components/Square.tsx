import { SimpleGrid } from "@chakra-ui/react";
import Cell from "./Cell";


/*interface squareProps {
    setCellInvalid: Array<number>
}*/

export default function Square ( {isDark, changeGrid, square, squareNumber, duplicates}: any) {
    /*const square_one = [[7,2,3],
                        [6,0,0],
                        [8,0,0]]*/

    const squareIndex = (squareNumber: number) => {
        return [Math.floor(squareNumber / 3), squareNumber % 3]
        
    }
    function actualIndex (squareNumber: number, i: number, j: number) {
        let dy = squareIndex(squareNumber)[0]*3
        let dx = squareIndex(squareNumber)[1]*3
        return [i + dy, j + dx]
    }
    
    const getSquares = () => {
        let content: any = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j ++) {
                const row = actualIndex(squareNumber, i, j)[0]
                const col = actualIndex(squareNumber, i, j)[1]
                content.push(<Cell 
                                isDark = {isDark}
                                duplicate = {duplicates}    
                                row = {row} 
                                col = {col} 
                                changeGrid = {changeGrid} 
                                value = {square[i][j]} 
                                isReadOnly = {square[i][j] == 0 ? false : true}/>)
            }
        }
        return content
    }
    return (
        <SimpleGrid columns={3} spacing={1}>  
            
            {/*<Cell value = {square[0][0]} isDisabled = {true}/>
            <Cell value = {square[0][1]}/>
            <Cell value = {square[0][2]}/>
            <Cell value = {square[1][0]}/>
            <Cell value = {square[1][1]}/>
            <Cell value = {square[1][2]}/>
            <Cell value = {square[2][0]}/>
            <Cell value = {square[2][1]}/>
        <Cell value = {square[2][2]}/>*/}
        {getSquares()}
        </SimpleGrid>
    )
}
