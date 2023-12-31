import { PinInput, PinInputField } from "@chakra-ui/react";

interface CellProps {
    enable : any
    isDark: boolean
    duplicate?: any
    value: number
    isDisabled? : boolean
    isReadOnly?: boolean
    row: number
    col: number
    changeGrid: any
}

export default function Cell ({ enable, isDark, duplicate, value, isDisabled, isReadOnly, row, col, changeGrid}: CellProps ) {
    /*function member (element: Array<number>, arr: Array<number>) {
        for (let list of arr) {
            if (JSON.stringify(list)==JSON.stringify(element)) {
                return true
            }
        }
        return false
    }*/
    function ReadOnly () {
        if (JSON.stringify(enable) == JSON.stringify([row,col])){
            return false
        } else {
            return true
        }
    }
    return (
        <>
        <PinInput size= 'lg' variant='outline' placeholder = {value == 0 ? "" : value.toString()} isInvalid = {/*member([row,col], duplicate)*/ duplicate[row][col]==true} isDisabled={isDisabled}>
            <PinInputField borderColor={isDark ? 'white':'black'} _placeholder={{color: isDark ? 'white':'black'}} inputMode='numeric'  /*backgroundColor={isDark? '#ABCDEA':'#ABCDEA'}*/ onChange={ (val) => changeGrid(row, col, val)} readOnly = {isReadOnly && ReadOnly()}/>
        </PinInput> 
        </>
    )
}