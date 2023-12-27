import { SimpleGrid, Flex, PinInput } from "@chakra-ui/react";
import Square from "./Square";

export default function Board ( {squares, changeGrid, duplicates, checkGameOver, isDark}:any ) {
    /*const squares = [[3x3 array representing square ],[etc],3,4,5,6,7,8,9]*/
    const drawBoardSquares = () => {
        let res: any = []
        for (let i = 0; i < 9; i++) {
            res.push(<Square isDark = {isDark} duplicates = {duplicates} changeGrid = {changeGrid} squareNumber = {i} square = {squares[i]}/>)
        }
        return res
    }
    return (
        <Flex>
            <SimpleGrid columns={3} spacing={5}>  
                <PinInput   onComplete={() => checkGameOver()}>
                      {drawBoardSquares()} 
                </PinInput>
            </SimpleGrid>        
        </Flex>
        
    )
}
