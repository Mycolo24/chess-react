import Tile from "./Tile";

function Board({ tiles, onTileClick, fromTile, toTile, allowedMoves }) {
  const tileArray = [];

  // generates the 64 tiles for the board
  var row = 0;
  for (let i = 0; i < 64; i++) {
    var className;

    // adds to the row count every 8 tiles
    if (i % 8 === 0 && i !== 0) {
      row++;
    }

    // if the row count is even then the first tile is a dark tile
    if (row % 2 === 0) {
      if (i % 2 === 0) {
        className = "darkTile";
      } else {
        className = "lightTile";
      }
    } else {
      if (i % 2 === 0) {
        className = "lightTile";
      } else {
        className = "darkTile";
      }
    }

    // Add highlight class if the tile is selected
    if (i === fromTile || i === toTile) {
      className += " selected";
    }

    if (allowedMoves.includes(i)) {
      className += " allowedMoves";
    }

    tileArray.push(
      <Tile
        value={tiles[i]}
        className={className}
        onClick={() => onTileClick(i)}
      />
    );
  }

  return <div className="board">{tileArray}</div>;
}

export default Board;
