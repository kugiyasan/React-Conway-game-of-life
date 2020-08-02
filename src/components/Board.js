import React, { Component } from "react";
import Cell from "./Cell";
import Settings from "./Settings";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: { x: props.x, y: props.y },
      cells: [],
    };
  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard() {
    var { cells } = this.state;
    var newCells = [];

    for (var y = 0; y < this.state.boardSize.y; y++) {
      newCells.push([]);
      for (var x = 0; x < this.state.boardSize.x; x++) {
        try {
          newCells[y].push(cells[y][x]);
        } catch (error) {
          newCells[y].push(false);
        }
      }
    }

    this.setState({ cells: newCells });
  }

  generateBoard(valueFunction) {
    var { cells } = this.state;
    for (var y = 0; y < cells.length; y++) {
      for (var x = 0; x < cells[y].length; x++) {
        cells[y][x] = valueFunction(x, y);
      }
    }

    this.setState(cells);
  }

  nextEpoch() {
    var { cells } = this.state;
    var newCells = [];

    cells.map((row) => {
      newCells.push([...row]);
    });

    for (var y = 0; y < cells.length; y++) {
      for (var x = 0; x < cells[y].length; x++) {
        var neighborCount = this.cellCountNeighbors(x, y);

        if (neighborCount < 2 || neighborCount > 3) {
          newCells[y][x] = false;
        } else if (neighborCount === 3 && newCells[y][x] === false) {
          newCells[y][x] = true;
        }
      }
    }

    this.setState({
      cells: newCells,
    });
  }

  cellCountNeighbors(x, y) {
    var { cells } = this.state;
    var count = 0;
    var coords = [
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x - 1, y: y + 1 },
      { x: x, y: y + 1 },
      { x: x + 1, y: y + 1 },
    ];

    coords.map(({ x, y }) => {
      if (y < 0 || x < 0 || y >= cells.length || x >= cells[y].length) {
      } else if (cells[y][x] === true) {
        count++;
      }
    });

    return count;
  }

  onCellClick({ rowIndex, cellIndex }) {
    var { cells } = this.state;
    cells[rowIndex][cellIndex] = !cells[rowIndex][cellIndex];
    this.setState(cells);
  }

  render() {
    return (
      <div id="board">
        <label htmlFor="board">Conway's Game Of Life</label>
        {this.state.cells.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Cell
                coords={{ rowIndex, cellIndex }}
                isAlive={cell}
                onClick={this.onCellClick.bind(this)}
                key={cellIndex}
              />
            ))}
          </div>
        ))}
        <Settings
          createBoard={this.createBoard.bind(this)}
          generateBoard={this.generateBoard.bind(this)}
          nextEpoch={this.nextEpoch.bind(this)}
          boardSize={this.state.boardSize}
          setState={this.setState.bind(this)}
        />
      </div>
    );
  }
}

export default Board;
