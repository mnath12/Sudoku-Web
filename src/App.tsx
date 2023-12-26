import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SimpleGrid, Box, Center, HStack } from '@chakra-ui/react'
import Cell from './components/Cell'
import Board from './components/Board'

function App() {
    const [count, setCount] = useState(0)
    const [value, setValue] = useState()

    const grid = [ [7,2,3,0,0,0,1,5,9],
                  [6,0,0,3,0,2,0,0,8], 
                  [8,0,0,0,1,0,0,0,2],
                  [0,7,0,6,5,4,0,2,0], 
                  [0,0,4,2,0,7,3,0,0],
                  [0,5,0,9,3,1,0,4,0],
                  [5,0,0,0,7,0,0,0,3],
                  [4,0,0,1,0,3,0,0,6],
                  [9,3,2,0,0,0,7,1,4] ]
    const identity = (x:any) => x ;

    const [gameGrid, setGameGrid] = useState(grid)
    console.log(gameGrid)

    let falseGrid: any = []

    for (let i = 0; i < 9; ++i) {
      falseGrid.push([])
      for (let j = 0 ; j < 9; ++j) {
        falseGrid[i].push(false)
      }
    }

    const [duplicateGrid, setDuplicateGrid] = useState(falseGrid)


                  
    const square_one = [grid[0].slice(0,3), grid[1].slice(0,3), grid[2].slice(0,3)]
    const square_two = [grid[0].slice(3,6), grid[1].slice(3,6), grid[2].slice(3,6)]
    const square_three = [grid[0].slice(6,9), grid[1].slice(6,9), grid[2].slice(6,9)]
    const square_four = [grid[3].slice(0,3), grid[4].slice(0,3), grid[5].slice(0,3)]
    const square_five = [grid[3].slice(3,6), grid[4].slice(3,6), grid[5].slice(3,6)]
    const square_six = [grid[3].slice(6,9), grid[4].slice(6,9), grid[5].slice(6,9)]
    const square_seven = [grid[6].slice(0,3), grid[7].slice(0,3), grid[8].slice(0,3)]
    const square_eight = [grid[6].slice(3, 6), grid[7].slice(3,6), grid[8].slice(3,6)]
    const square_nine = [grid[6].slice(6,9), grid[7].slice(6,9), grid[8].slice(6,9)]
  
    let squares = [square_one, square_two, square_three, square_four, square_five, square_six, square_seven, square_eight, square_nine]

    function getSquares (SudokuGrid: Array<Array<number>>) {
        let res:any = []
        for (let s = 0; s < 9; ++s) {
          let square = []
          for (let i = 0; i < 3; ++i) {
              if ((s + 1) % 3 == 1) {
                if (s + 1 == 0) {
                  square.push([SudokuGrid[i].slice(0,3)])
                } else {
                  square.push(SudokuGrid[i + s].slice(0, 3))
                } 
              } else if ((s+1) % 3 == 2) {
                square.push(SudokuGrid[i + s - 1].slice(3, 6))
              } else if ((s+1)%3 ==0){
                square.push(SudokuGrid[i + s - 2].slice(6, 9))
              }
              
          }
          res.push(square)

        }
        return res
    }

    function fix_row ( row: number, old_val: number, matrix: Array<Array<boolean>> ) {
      /* for old val need to store old val somehow in onChange*/
      let count = new Map()
      for (let i = 0; i < 9; ++i) {
        if (gameGrid[row][i] == old_val) {
          if (count.get(old_val) === undefined) {
            count.set(old_val, 1)
          } else {
            count.set(old_val, count.get(old_val) + 1)
          }       
        }
      }

      if (count.get(old_val) == 1) {
        for (let i = 0; i < 9; ++i) {
          if (gameGrid[row][i] == old_val) {
            matrix[row][i] = false
          }
        }   
      }

    }

    function fix_col ( col: number, old_val: number, matrix: Array<Array<boolean>> ) {
        let count = new Map()
        for (let i = 0; i < 9; ++i) {
          if (gameGrid[i][col] == old_val) {
            if (count.get(old_val) === undefined) {
              count.set(old_val, 1)
            } else {
              count.set(old_val, count.get(old_val) + 1)
            }       
          }
        }

        /* check that it's not a square duplicate*/
        if (count.get(old_val) == 1) {
          for (let i = 0; i < 9; ++i) {
            if (gameGrid[i][col] == old_val) {
              matrix[i][col] = false
            }
          }   
        }
      }

    function fix_square ( s: number, row: number, col: number, old_val: number, matrix: Array<Array<boolean>> ) {
      /* Get the square number from row, col */
      /* go through the squares */
      let squares = getSquares(gameGrid)
      let square = squares[s]
      let count = new Map()
      for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 3; ++j) {
              if (square[i][j] === old_val) {
                  if (count.get(old_val) === undefined) {
                      count.set(old_val, 1)
                } else {
                      count.set(old_val, count.get(old_val)+ 1)
                }
              }
          }
      }
      if (count.get(old_val) == 1) {
        for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 3; ++j){
            if (square[i][j] == old_val) {
                let index = actualIndex(s, [i,j])
                if (index[0] != row && index[1] != col) {
                  matrix[index[0]][index[1]] = false
                }
            }
          }
        }   
      } else {
        for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 3; ++j){
            if (square[i][j] == old_val) {
                let index = actualIndex(s, [i,j])
                matrix[index[0]][index[1]] = true
            }
          }
        }   
      }

    }

    function changeGrid (row: any, col: any, val: any) {
        const grid_copy = gameGrid.map(identity)
        setValue(val)
        let old_val = grid_copy[row][col]
        
        grid_copy[row][col] = parseInt(val.target.value)
        
        const duplicateGrid_copy = duplicateGrid.map(identity)
        if (val.target.value == ''){
          grid_copy[row][col] = 0
          duplicateGrid_copy[row][col] = false
          /* set the other things in the row, column, or square valid too*/
          let s = squareNumber([row,col])
          fix_row(row, old_val, duplicateGrid_copy)
          fix_col(col, old_val, duplicateGrid_copy)
          fix_square(s, row, col, old_val, duplicateGrid_copy)
        } else {
          for (let duplicate of findDuplicates()) {
            if (gameGrid[duplicate[0]][duplicate[1]] != 0) {
              duplicateGrid_copy[duplicate[0]][duplicate[1]] = true
            }
          }
        }
        setGameGrid(grid_copy)
        setDuplicateGrid(duplicateGrid_copy)
    }
    
    function rowDuplicates() {
      let res = []
    
      for (let r = 0; r < 9; ++r){
        let row = gameGrid[r]
        let countMap = new Map()
        for (let c = 0; c < 9; ++c){
          if (countMap.get(row[c]) === undefined) {
            if (row[c] !=0) {
              countMap.set(row[c], c);
            } 
          } else {
            res.push([r, countMap.get(row[c])])
            res.push([r, c])    
          }
      }

      }

      return res
    }

    function get_cols() {
      let res = []
      for (let col = 0; col < 9; ++col) {
          let column:any = []
          for (let i = 0; i < 9; ++i) {
            column.push(gameGrid[i][col])
          }
          res.push(column)
      }
      return res
    }

    function colDuplicates( ) {
      let cols = get_cols()
      let res = []

      for (let c = 0; c < 9; ++c) {
          let col = cols[c]
          let countMap = new Map()
          for (let r = 0; r < 9; ++r){
            if (countMap.get(col[r]) === undefined) {
              if (col[r] !=0) {
                countMap.set(col[r], r);
              } 
            } else {
              res.push([countMap.get(col[r]), c])
              res.push([r, c])    
            }
        }
      }
      return res
    }

    const squareIndex = (squareNumber: number) => {
      return [Math.floor(squareNumber / 3), squareNumber % 3]
      
    }

    function squareNumber (grid_index: [number, number]) {
        let square_row_one = [0,1,2]
        let square_row_two = [3,4,5]
        let square_row_three = [6,7,8]
        let row = grid_index[0]
        let col = grid_index[1]
        if (Math.floor(row / 3) == 0) {
            if (Math.floor(col / 3) == 0) {
                return square_row_one[0]
            } else if (Math.floor(col / 3) == 1) {
                return square_row_one[1]
            } else {
                return square_row_one[2]
            }
        } else if (Math.floor(row / 3) == 1)  {
            if (Math.floor(col / 3) == 0) {
                return square_row_two[0]
            } else if (Math.floor(col / 3) == 1) {
                return square_row_two[1]
            } else {
                return square_row_two[2]
            }
        } else {
            if (Math.floor(col / 3) == 0) {
                return square_row_three[0]
            } else if (Math.floor(col / 3) == 1) {
                return square_row_three[1]
            } else {
                return square_row_three[2]
            }
        }
      }
    

    function actualIndex (squareNumber: number, square_index: Array<number>) {
      let dy = squareIndex(squareNumber)[0]*3
      let dx = squareIndex(squareNumber)[1]*3
      return [square_index[0] + dy, square_index[1] + dx]
    } 
    

    function squareDuplicates() {
      let res = []
      for (let s = 0; s < 9; ++s) {
          let square = getSquares(gameGrid)[s]
          let countMap = new Map()
          for (let i = 0; i < 3; ++i) {
              for (let j = 0; j < 3; ++j) {
                  if (countMap.get(square[i][j]) === undefined) {
                      if (square[i][j] != 0) {
                        countMap.set(square[i][j], [i, j])
                      }
                  } else {
                      res.push(actualIndex(s, countMap.get(square[i][j])))
                      res.push(actualIndex(s, [i,j]))

                  }

              }
          }
      }
      return res

    }

    function findDuplicates() {
      return rowDuplicates().concat(colDuplicates().concat(squareDuplicates()))
    }

    function boardFull () {
        for (let r = 0; r < 9; ++r) {
            for (let c = 0; c < 9; ++c) {
                if (gameGrid[r][c] == 0) {
                  return false
                }
            }
        }
        return true
    }

    function checkGameOver () {
      if (JSON.stringify(findDuplicates()) == JSON.stringify([]) && boardFull()) {
        reset()
        alert("game over you win ")
      }
    }

    function reset () {
        setGameGrid(grid)
    
    }

    return (
      <>
    
      
    <h1>Sudoku</h1>
    <Box >
        <Center>
            <Board checkGameOver = {checkGameOver()}duplicates = {duplicateGrid} changeGrid = {changeGrid} squares ={squares}/>
        </Center>
    </Box>
    
    
      </>
    )
  }

  export default App
