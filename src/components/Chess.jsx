import Board from "./Board";
import { useState, useEffect } from "react";

function setUpBoard() {
  const board = Array(64).fill(null);
  // black pieces
  board[0] = "br";
  board[1] = "bn";
  board[2] = "bb";
  board[3] = "bq";
  board[4] = "bk";
  board[5] = "bb";
  board[6] = "bn";
  board[7] = "br";
  for (let i = 8; i < 16; i++) {
    board[i] = "bp";
  }
  // white pieces
  board[56] = "wr";
  board[57] = "wn";
  board[58] = "wb";
  board[59] = "wq";
  board[60] = "wk";
  board[61] = "wb";
  board[62] = "wn";
  board[63] = "wr";
  for (let i = 48; i < 56; i++) {
    board[i] = "wp";
  }
  return board;
}

function movePiece(tiles, from, to) {
  const newTiles = [...tiles];

  newTiles[to] = newTiles[from];

  newTiles[from] = null;
  return newTiles;
}

const pieceMoves = {
  // pawn
  wp: [-8, -16],
  bp: [8, 16],
  // knight
  wn: [6, 10, 15, 17, -6, -10, -17, -15],
  bn: [6, 10, 15, 17, -6, -10, -17, -15],

  // king
  wk: [1, 7, 8, 9],
  bk: [-1, -7, -8, -9],

  // rook
  wr: [-1, 1, -8, 8],
  br: [-1, 1, -8, 8],

  // bishop
  wb: [-7, -9, 7, 9],
  bb: [-7, -9, 7, 9],

  // queen
  wq: [-1, 1, -8, 8, -7, -9, 7, 9],
  bq: [-1, 1, -8, 8, -7, -9, 7, 9],
};

const PLAYER_WHITE = "white";
const PLAYER_BLACK = "black";

function Chess() {
  const [tiles, setTiles] = useState(setUpBoard());
  const [fromTile, setFromTile] = useState(null);
  const [toTile, setToTile] = useState(null);
  const [highlightClass, setHighlightClass] = useState("");
  const [playerTurn, setPlayerTurn] = useState(PLAYER_WHITE);
  const [allowedMoves, setAllowedMoves] = useState([]);

  const getAllowedMoves = (piece, index) => {
    const moves = pieceMoves[piece];
    const allowedMoves = [];
    moves.forEach((move) => {
      const newIndex = index + move;
      if (newIndex >= 0 && newIndex < 64) {
        if (
          tiles[newIndex] != null &&
          tiles[newIndex].startsWith(playerTurn[0])
        ) {
          return;
        }

        allowedMoves.push(newIndex);
      }
    });
    return allowedMoves;
  };

  const handleTileClick = (index) => {
    let from = fromTile;
    let to = toTile;

    if (from == null) {
      // Check if the selected piece matches the current player's color
      if (
        (playerTurn === PLAYER_WHITE && tiles[index]?.startsWith("w")) ||
        (playerTurn === PLAYER_BLACK && tiles[index]?.startsWith("b"))
      ) {
        setFromTile(index);
        setHighlightClass("selected");
        from = index;
        setAllowedMoves(getAllowedMoves(tiles[from], from));
      }
      // handles unselecting a piece
    } else if (from === index) {
      setFromTile(null);
      setAllowedMoves([]);
      from = null;
    } else if (to === null && allowedMoves.includes(index)) {
      setToTile(index);
      to = index;
    } else if (to === index) {
      setToTile(null);
      to = null;
    }

    if (from != null && to != null && allowedMoves.includes(to)) {
      setTiles(movePiece(tiles, from, to));
      setFromTile(null);
      setToTile(null);
      setAllowedMoves([]);
      // Switch player turn after a successful move
      setPlayerTurn(playerTurn === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE);
    }
  };

  return (
    <div>
      <h1>Chess</h1>
      <Board
        tiles={tiles}
        onTileClick={handleTileClick}
        fromTile={fromTile}
        toTile={toTile}
        highlightClass={highlightClass}
        allowedMoves={allowedMoves}
      />
    </div>
  );
}

export default Chess;
