import React from "react";

const Settings = (props) => {
  return (
    <div className="settings">
      <button onClick={() => props.nextEpoch()}>Next epoch</button>
      <button onClick={() => props.generateBoard(() => false)}>Reset</button>
      <button
        onClick={() =>
          props.generateBoard(() => Math.floor(Math.random() * 2) === 1)
        }
      >
        Generate Random Board
      </button>
      <br />
      <br />
      <label htmlFor="horizontal-size-slider">
        Horizontal Size: {props.boardSize.x}
      </label>
      <input
        type="range"
        min="3"
        max="50"
        value={props.boardSize.x}
        onChange={(e) =>
          props.setState({
            boardSize: {
              x: e.target.value,
              y: props.boardSize.y,
            },
          })
        }
        id="vertical-size-slider"
      />
      <label htmlFor="vertical-size-slider">
        Vertical Size: {props.boardSize.y}
      </label>
      <input
        type="range"
        min="3"
        max="50"
        value={props.boardSize.y}
        onChange={(e) =>
          props.setState({
            boardSize: {
              x: props.boardSize.x,
              y: e.target.value,
            },
          })
        }
        id="vertical-size-slider"
      />
      <button onClick={() => props.createBoard()}>Apply Size</button>
      <br />
      <br />
      <label htmlFor="vertical-size-slider">
        Auto Next Epoch Interval: {props.epochInterval}ms
      </label>
      <input
        type="range"
        min="20"
        max="1000"
        value={props.epochInterval}
        onChange={(e) =>
          props.setState({
            epochInterval: e.target.value,
          })
        }
        id="auto-next-epoch-slider"
      />
      <button onClick={() => props.autoNextEpoch()}>
        Toggle Auto Next Epoch
      </button>
    </div>
  );
};

export default Settings;
