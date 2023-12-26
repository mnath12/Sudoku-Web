import { SimpleGrid, Flex, PinInput } from "@chakra-ui/react";
import Square from "./Square";

export default function Board ( {squares, changeGrid, duplicates, checkGameOver}:any ) {
    /*const squares = [[3x3 array representing square ],[etc],3,4,5,6,7,8,9]*/
    return (
        <Flex>
            <SimpleGrid columns={3} spacing={5}>  
                <PinInput onComplete={() => checkGameOver()}>
                    <Square duplicates = {duplicates} squareNumber = {0} changeGrid = {changeGrid} square = {squares[0]}/>
                    <Square duplicates = {duplicates} squareNumber = {1} changeGrid = {changeGrid} square = {squares[1]}/>
                    <Square duplicates = {duplicates} squareNumber = {2} changeGrid = {changeGrid} square = {squares[2]}/>
                    <Square duplicates = {duplicates} squareNumber = {3} changeGrid = {changeGrid} square = {squares[3]}/>
                    <Square duplicates = {duplicates} squareNumber = {4} changeGrid = {changeGrid} square = {squares[4]}/>
                    <Square duplicates = {duplicates} squareNumber = {5} changeGrid = {changeGrid} square = {squares[5]}/>
                    <Square duplicates = {duplicates} squareNumber = {6} changeGrid = {changeGrid} square = {squares[6]}/>
                    <Square duplicates = {duplicates} squareNumber = {7} changeGrid = {changeGrid} square = {squares[7]}/>
                    <Square duplicates = {duplicates} squareNumber = {8} changeGrid = {changeGrid} square = {squares[8]}/> 
                </PinInput>
            </SimpleGrid>
           
            
        </Flex>
        
    )
}
