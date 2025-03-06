buttons = document.querySelector(".chess-board");
let chessBoard = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"], // Row 8 (Black pieces)
  ["P", "P", "P", "P", "P", "P", "P", "P"], // Row 7 (Black pawns)
  ["", "", "", "", "", "", "", ""], // Row 6 (empty)
  ["", "", "", "", "", "", "", ""], // Row 5 (empty)
  ["", "", "", "", "", "", "", ""], // Row 4 (empty)
  ["", "", "", "", "", "", "", ""], // Row 3 (empty)
  ["p", "p", "p", "p", "p", "p", "p", "p"], // Row 2 (White pawns)
  ["r", "n", "b", "q", "k", "b", "n", "r"], // Row 1 (White pieces)
];
let chessPieceUnicode = new Map([
  ["k", "&#9812;"], // White King ♔
  ["q", "&#9813;"], // White Queen ♕
  ["r", "&#9814;"], // White Rook ♖
  ["b", "&#9815;"], // White Bishop ♗
  ["n", "&#9816;"], // White Knight ♘
  ["p", "&#9817;"], // White Pawn ♙
  ["K", "&#9818;"], // Black King ♚
  ["Q", "&#9819;"], // Black Queen ♛
  ["R", "&#9820;"], // Black Rook ♜
  ["B", "&#9821;"], // Black Bishop ♝
  ["N", "&#9822;"], // Black Knight ♞
  ["P", "&#9823;"], // Black Pawn ♟
]);

let whiteAttack = new Set();
let blackAttack = new Set();
let whitePieces = new Set();
let blackPieces = new Set();
let turn = 0;
for (let i = 97; i <= 104; i++) {
  let str = String.fromCharCode(i) + "3";
  let str3 = String.fromCharCode(i) + "2";
  let str5 = String.fromCharCode(i) + "1";
  let str2 = String.fromCharCode(i) + "6";
  let str4 = String.fromCharCode(i) + "7";
  let str6 = String.fromCharCode(i) + "8";
  whiteAttack.add(str);
  whiteAttack.add(str3);
  whitePieces.add(str3);
  whiteAttack.add(str5);
  whitePieces.add(str5);
  blackAttack.add(str2);
  blackAttack.add(str4);
  blackPieces.add(str4);
  blackAttack.add(str6);
  blackPieces.add(str6);
}
blackAttack.delete("a8");
blackAttack.delete("h8");
whiteAttack.delete("a1");
whiteAttack.delete("h1");
console.log(blackAttack);
let white_pawns = [0, 0, 0, 0, 0, 0, 0, 0];
let black_pawns = [0, 0, 0, 0, 0, 0, 0, 0];
function isValid(a, b) {
  if (a >= 0 && b >= 0 && a <= 7 && b <= 7) return true;
  return false;
}
function isUpperCase(char) {
  return char === char.toUpperCase();
}
function convert(buttonId) {
  let row = buttonId[1].charCodeAt(0) - "1".charCodeAt(0);
  row = 7 - row;
  let col = buttonId[0].charCodeAt(0) - "a".charCodeAt(0);
  return [row, col];
}
function back_convert(row, col) {
  let a = String.fromCharCode(97 + col);
  let b = String.fromCharCode(7 - row + 49);
  let ans = a + b;
  return ans;
}
function diagonal(row, col, k) {
  let arr = [];
  for (let i = 1; i <= 7; i++) {
    if (isValid(row - i, col - i)) {
      if (chessBoard[row - i][col - i] == "") {
        arr.push(back_convert(row - i, col - i));
      } else {
        let check = isUpperCase(chessBoard[row - i][col - i]);
        if ((k && !check) || (!k && check)) {
          arr.push(back_convert(row - i, col - i));
        }
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (isValid(row + i, col + i)) {
      if (chessBoard[row + i][col + i] == "") {
        arr.push(back_convert(row + i, col + i));
      } else {
        let check = isUpperCase(chessBoard[row + i][col + i]);
        if ((k && !check) || (!k && check)) {
          arr.push(back_convert(row + i, col + i));
        }
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (isValid(row + i, col - i)) {
      if (chessBoard[row + i][col - i] == "") {
        arr.push(back_convert(row + i, col - i));
      } else {
        let check = isUpperCase(chessBoard[row + i][col - i]);
        if ((k && !check) || (!k && check)) {
          arr.push(back_convert(row + i, col - i));
        }
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (isValid(row - i, col + i)) {
      if (chessBoard[row - i][col + i] == "") {
        arr.push(back_convert(row - i, col + i));
      } else {
        let check = isUpperCase(chessBoard[row - i][col + i]);
        if ((k && !check) || (!k && check)) {
          arr.push(back_convert(row - i, col + i));
        }
        break;
      }
    } else {
      break;
    }
  }
  return arr;
}
function vertical(row, col, k) {
  let arr = [];
  for (let i = 1; i <= 7; i++) {
    if (isValid(row - i, col)) {
      if (chessBoard[row - i][col] == "") {
        arr.push(back_convert(row - i, col));
      } else {
        let check = isUpperCase(chessBoard[row - i][col]);
        if ((k && !check) || (!k && check)) {
          arr.push(back_convert(row - i, col));
        }
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (isValid(row + i, col)) {
      if (chessBoard[row + i][col] == "") {
        arr.push(back_convert(row + i, col));
      } else {
        let check = isUpperCase(chessBoard[row + i][col]);
        if ((k && !check) || (!k && check)) {
          arr.push(back_convert(row + i, col));
        }
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (isValid(row, col - i)) {
      if (chessBoard[row][col - i] == "") {
        arr.push(back_convert(row, col - i));
      } else {
        let check = isUpperCase(chessBoard[row][col - i]);
        if ((k && !check) || (!k && check)) {
          arr.push(back_convert(row, col - i));
        }
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (isValid(row, col + i)) {
      if (chessBoard[row][col + i] == "") {
        arr.push(back_convert(row, col + i));
      } else {
        let check = isUpperCase(chessBoard[row][col + i]);
        if ((k && !check) || (!k && check)) {
          arr.push(back_convert(row, col + i));
        }
        break;
      }
    } else {
      break;
    }
  }
  return arr;
}
function knight(row, col, k) {
  let arr = [];
  if (isValid(row + 2, col + 1)) {
    let check = isUpperCase(chessBoard[row + 2][col + 1]);
    if (chessBoard[row + 2][col + 1] == "" || (k && !check) || (!k && check)) {
      arr.push(back_convert(row + 2, col + 1));
    }
  }
  if (isValid(row + 2, col - 1)) {
    let check = isUpperCase(chessBoard[row + 2][col - 1]);
    if (chessBoard[row + 2][col - 1] == "" || (k && !check) || (!k && check)) {
      arr.push(back_convert(row + 2, col - 1));
    }
  }
  if (isValid(row - 2, col + 1)) {
    let check = isUpperCase(chessBoard[row - 2][col + 1]);
    if (chessBoard[row - 2][col + 1] == "" || (k && !check) || (!k && check)) {
      arr.push(back_convert(row - 2, col + 1));
    }
  }
  if (isValid(row - 2, col - 1)) {
    let check = isUpperCase(chessBoard[row - 2][col - 1]);
    if (chessBoard[row - 2][col - 1] == "" || (k && !check) || (!k && check)) {
      arr.push(back_convert(row - 2, col - 1));
    }
  }
  if (isValid(row + 1, col + 2)) {
    let check = isUpperCase(chessBoard[row + 1][col + 2]);
    if (chessBoard[row + 1][col + 2] == "" || (k && !check) || (!k && check)) {
      arr.push(back_convert(row + 1, col + 2));
    }
  }
  if (isValid(row + 1, col - 2)) {
    let check = isUpperCase(chessBoard[row + 1][col - 2]);
    if (chessBoard[row + 1][col - 2] == "" || (k && !check) || (!k && check)) {
      arr.push(back_convert(row + 1, col - 2));
    }
  }
  if (isValid(row - 1, col + 2)) {
    let check = isUpperCase(chessBoard[row - 1][col + 2]);
    if (chessBoard[row - 1][col + 2] == "" || (k && !check) || (!k && check)) {
      arr.push(back_convert(row - 1, col + 2));
    }
  }
  if (isValid(row - 1, col - 2)) {
    let check = isUpperCase(chessBoard[row - 1][col - 2]);
    if (chessBoard[row - 1][col - 2] == "" || (k && !check) || (!k && check)) {
      arr.push(back_convert(row - 1, col - 2));
    }
  }
  return arr;
}
function handleOption(x) {
  let nrow = -1,
    ncol = -1;
  if (turn % 2 == 0) {
    nrow = 0;
    for (let j = 0; j < 8; j++) {
      if (chessBoard[0][j] == "p") {
        ncol = j;
        break;
      }
    }
    x = String.fromCharCode(x.charCodeAt(0) + 32);
  } else {
    nrow = 7;
    for (let j = 0; j < 8; j++) {
      if (chessBoard[7][j] == "P") {
        ncol = j;
        break;
      }
    }
  }
  if (nrow != -1 && ncol != -1) {
    let buttonId = back_convert(nrow, ncol);
    let button = document.querySelector(`button[data-name="${buttonId}"]`);
    button.innerHTML = chessPieceUnicode.get(x);
    chessBoard[nrow][ncol] = x;
    resolve_attack();
  }
  turn += 1;
  return;
}
function support(buttonId) {
  let [row, col] = convert(buttonId);
  let piece = chessBoard[row][col];
  let x = new Set();
  if (turn % 2 == 0) {
    for (let i of blackAttack) x.add(i);
  } else {
    for (let i of whiteAttack) x.add(i);
  }
  chessBoard[row][col] = "";
  resolve_attack2();
  let ans = true;
  if (
    (turn % 2 == 0 && blackAttack.has(buttonId)) ||
    (turn % 2 != 0 && whiteAttack.has(buttonId))
  )
    ans = false;
  if (turn % 2 == 0) blackAttack = x;
  else {
    whiteAttack = x;
  }
  chessBoard[row][col] = piece;
  return ans;
}
function king(buttonId) {
  let [row, col] = convert(buttonId);
  let opp;
  if (turn % 2 == 0) opp = "K";
  else {
    opp = "k";
  }
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i || j) {
        let nrow = row + i;
        let ncol = col + j;
        if (isValid(nrow, ncol)) {
          if (chessBoard[nrow][ncol] == opp) return false;
        }
      }
    }
  }
  return true;
}
function showMoves(buttonId, t) {
  let [row, col] = convert(buttonId);
  let x = chessBoard[row][col];
  let arr = [];
  if (x == "") return arr;
  let k = 0;
  if (x == "P") k = 1;
  if (x != "P" && isUpperCase(x)) {
    k = 1;
    let no = x.charCodeAt(0) + 32;
    x = String.fromCharCode(no);
  }
  switch (x) {
    case "P":
      if (t == 0) {
        if (black_pawns[col] == 0 && row == 1) {
          for (let i = 1; i <= 2; i++) {
            if (isValid(row + i, col) && chessBoard[row + i][col] == "") {
              arr.push(back_convert(row + i, col));
            } else {
              break;
            }
          }
        } else {
          if (isValid(row + 1, col) && chessBoard[row + 1][col] == "") {
            arr.push(back_convert(row + 1, col));
          }
        }
        if (
          isValid(row + 1, col + 1) &&
          chessBoard[row + 1][col + 1] != "" &&
          !isUpperCase(chessBoard[row + 1][col + 1])
        ) {
          arr.push(back_convert(row + 1, col + 1));
        }
        if (
          isValid(row + 1, col - 1) &&
          chessBoard[row + 1][col - 1] != "" &&
          !isUpperCase(chessBoard[row + 1][col - 1])
        ) {
          arr.push(back_convert(row + 1, col - 1));
        }
      } else {
        if (isValid(row + 1, col + 1)) {
          arr.push(back_convert(row + 1, col + 1));
        }
        if (isValid(row + 1, col - 1)) {
          arr.push(back_convert(row + 1, col - 1));
        }
      }
      break;
    case "p":
      if (t == 0) {
        console.log("Shi jagah aya!");
        if (white_pawns[col] == 0 && row == 6) {
          for (let i = 1; i <= 2; i++) {
            if (isValid(row - i, col) && chessBoard[row - i][col] == "") {
              arr.push(back_convert(row - i, col));
            } else {
              break;
            }
          }
        } else {
          if (isValid(row - 1, col) && chessBoard[row - 1][col] == "") {
            arr.push(back_convert(row - 1, col));
          }
        }
        if (
          isValid(row - 1, col + 1) &&
          chessBoard[row - 1][col + 1] != "" &&
          isUpperCase(chessBoard[row - 1][col + 1])
        ) {
          arr.push(back_convert(row - 1, col + 1));
        }
        if (
          isValid(row - 1, col - 1) &&
          chessBoard[row - 1][col - 1] != "" &&
          isUpperCase(chessBoard[row - 1][col - 1])
        ) {
          arr.push(back_convert(row - 1, col - 1));
        }
      } else {
        if (isValid(row - 1, col + 1)) {
          arr.push(back_convert(row - 1, col + 1));
        }
        if (isValid(row - 1, col - 1)) {
          arr.push(back_convert(row - 1, col - 1));
        }
      }
      break;
    case "r":
      arr = vertical(row, col, k);
      break;
    case "n":
      arr = knight(row, col, k);
      break;
    case "b":
      arr = diagonal(row, col, k);
      break;
    case "q":
      arr = diagonal(row, col, k);
      brr = vertical(row, col, k);
      for (let i = 0; i < brr.length; i++) {
        arr.push(brr[i]);
      }
      break;
    case "k":
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i != 0 || j != 0) {
            let nrow = row + i;
            let ncol = col + j;
            if (isValid(nrow, ncol)) {
              let check = isUpperCase(chessBoard[nrow][ncol]);
              let str = back_convert(nrow, ncol);
              if (
                (chessBoard[nrow][ncol] == "" ||
                  (k && !check) ||
                  (!k && check)) &&
                ((k && !whiteAttack.has(str)) || (!k && !blackAttack.has(str)))
              ) {
                if (king(str)) arr.push(str);
              }
            }
          }
        }
      }
      break;
    default:
      console.log("Fuck off!");
  }
  return arr;
}
// script.js
function colorChange(x) {
  let [row, col] = convert(x);
  let piece = chessBoard[row][col];
  let button = document.querySelector(`button[data-name="${x}"]`);
  button.classList.add("selected");
  button.style.backgroundColor = "var(--selected)";
  if (piece) {
    button.innerHTML = chessPieceUnicode.get(piece);
    button.style.transform = "scale(1.05)";
  }
}

function colorBack(arr) {
  arr.forEach((x) => {
    let button = document.querySelector(`button[data-name="${x}"]`);
    let no = x[0].charCodeAt(0) + x[1].charCodeAt(0);
    button.classList.remove("selected");
    button.style.backgroundColor =
      no % 2 === 0 ? "var(--board-dark)" : "var(--board-light)";
    button.style.transform = "none";
  });
}
function resolve_attack2() {
  let new_attack = new Set();
  if (turn % 2 != 0) {
    for (let i of whitePieces) {
      let arr = showMoves(i, 1);
      for (let l = 0; l < arr.length; l++) {
        new_attack.add(arr[l]);
      }
    }
    whiteAttack = new_attack;
  } else {
    for (let i of blackPieces) {
      let arr = showMoves(i, 1);
      for (let l = 0; l < arr.length; l++) {
        new_attack.add(arr[l]);
      }
    }
    blackAttack = new_attack;
  }
  return;
}
function resolve_attack() {
  let new_attack = new Set();
  if (turn % 2 == 0) {
    for (let i of whitePieces) {
      let arr = showMoves(i, 1);
      for (let l = 0; l < arr.length; l++) {
        new_attack.add(arr[l]);
      }
    }
    whiteAttack = new_attack;
    console.log(whiteAttack);
  } else {
    for (let i of blackPieces) {
      let arr = showMoves(i, 1);
      for (let l = 0; l < arr.length; l++) {
        new_attack.add(arr[l]);
      }
    }
    blackAttack = new_attack;
  }
  return;
}
let k = 0;
function search(x) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (chessBoard[i][j] == x) return back_convert(i, j);
    }
  }
  return null;
}
function check() {
  if (
    (turn % 2 == 0 && blackAttack.has(search("k"))) ||
    (turn % 2 != 0 && whiteAttack.has(search("K")))
  )
    return true;
  return false;
}
let wk_mov = 0;
let bk_mov = 0;
let wlr_mov = 0;
let wrr_mov = 0;
let blr_mov = 0;
let brr_mov = 0;
function movement(prev_button, buttonId) {
  console.log(
    `Movement ke andar pichla button:${prev_button} and agla button:${buttonId}`
  );
  let [row, col] = convert(prev_button);
  let [nrow, ncol] = convert(buttonId);
  let piece = chessBoard[row][col];
  if (piece == "R" && prev_button == "h8") brr_mov = 1;
  else if (piece == "R" && prev_button == "a8") blr_mov = 1;
  else if (piece == "r" && prev_button == "h1") wrr_mov = 1;
  else if (piece == "r" && prev_button == "a1") wlr_mov = 1;
  else if (piece == "k") wk_mov = 1;
  else if (piece == "K") bk_mov = 1;
  if (piece == "p" && row == 6) white_pawns[col] = 1;
  else if (piece == "P" && row == 1) {
    black_pawns[col] = 1;
  }
  let prev = document.querySelector(`button[data-name="${prev_button}"]`);
  prev.innerHTML = "";
  let curr = document.querySelector(`button[data-name="${buttonId}"]`);
  if (piece != "") {
    let str = chessPieceUnicode.get(piece);
    curr.innerHTML = str;
  }
  if (turn % 2 == 0) {
    if (chessBoard[nrow][ncol] != "") blackPieces.delete(buttonId);
    whitePieces.delete(prev_button);
    whitePieces.add(buttonId);
  } else if (turn % 2 != 0) {
    if (chessBoard[nrow][ncol] != "") whitePieces.delete(buttonId);
    blackPieces.delete(prev_button);
    blackPieces.add(buttonId);
  }
  chessBoard[row][col] = "";
  chessBoard[nrow][ncol] = piece;
  k = 1;
  resolve_attack();
  return;
}
let prev_id = [];
let prev_button = null;
let prev_check = 0;
function validMove(previous, current) {
  let [row, col] = convert(previous);
  let [nrow, ncol] = convert(current);
  let piece = chessBoard[row][col];
  let x = new Set();
  let y = new Set();
  let z = new Set();
  let w = new Set();
  for (let i of whitePieces) x.add(i);
  for (let i of blackPieces) y.add(i);
  for (let i of whiteAttack) z.add(i);
  for (let i of blackAttack) w.add(i);
  if (turn % 2 == 0) {
    if (chessBoard[nrow][ncol] != "") blackPieces.delete(current);
    whitePieces.delete(previous);
    whitePieces.add(current);
  } else if (turn % 2 != 0) {
    if (chessBoard[nrow][ncol] != "") whitePieces.delete(current);
    blackPieces.delete(previous);
    blackPieces.add(current);
  }
  chessBoard[row][col] = "";
  let r = chessBoard[nrow][ncol];
  chessBoard[nrow][ncol] = piece;
  resolve_attack2();
  let ans = true;
  if (check()) {
    ans = false;
  }
  whitePieces = x;
  blackPieces = y;
  whiteAttack = z;
  blackAttack = w;
  chessBoard[row][col] = piece;
  chessBoard[nrow][ncol] = r;
  return ans;
}
function check_moves(buttonId) {
  let all_moves = new Map();
  if (turn % 2 == 0) {
    for (let i of whitePieces) {
      let arr = showMoves(i, 0);
      for (let j = 0; j < arr.length; j++) {
        if (validMove(i, arr[j])) {
          if (all_moves.get(i) == undefined) all_moves.set(i, []);
          let brr = all_moves.get(i);
          brr.push(arr[j]);
          all_moves.set(i, brr);
        }
      }
    }
  } else {
    for (let i of blackPieces) {
      let arr = showMoves(i, 0);
      for (let j = 0; j < arr.length; j++) {
        if (validMove(i, arr[j])) {
          if (all_moves.get(i) == undefined) all_moves.set(i, []);
          let brr = all_moves.get(i);
          brr.push(arr[j]);
          all_moves.set(i, brr);
        }
      }
    }
  }
  return all_moves;
}
function valid_pin(i) {
  let [row, col] = convert(i);
  let piece = chessBoard[row][col];
  chessBoard[row][col] = "";
  let new_attack = new Set();
  if (turn % 2 == 0) for (let j of blackAttack) new_attack.add(j);
  else {
    for (let j of whiteAttack) new_attack.add(j);
  }
  resolve_attack2();
  let ans = false;
  if (
    (turn % 2 == 0 && blackAttack.has(search("k"))) ||
    (turn % 2 != 0 && whiteAttack.has(search("K")))
  ) {
    ans = true;
  }
  if (turn % 2 == 0) blackAttack = new_attack;
  else {
    whiteAttack = new_attack;
  }
  chessBoard[row][col] = piece;
  return ans;
}
function checkStillMate() {
  if (turn % 2 == 0) {
    for (let i of whitePieces) {
      let arr = showMoves(i);
      if (arr.length > 0) return false;
    }
  } else {
    for (let i of blackPieces) {
      let arr = showMoves(i);
      if (arr.length > 0) return false;
    }
  }
  return true;
}
let blackTime = 10 * 60; // 10 minutes in seconds
let whiteTime = 10 * 60; // 10 minutes in seconds
let currentPlayer = "white"; // Start with white player's turn

// Elements where the timers will be displayed
const blackTimerElement = document.querySelector(".player-timer.black");
const whiteTimerElement = document.querySelector(".player-timer.white");

// Function to format time as MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Function to update timers
function updateTimers() {
  if (currentPlayer === "black") {
    blackTime--;
    blackTimerElement.textContent = `Black Timer: ${formatTime(blackTime)}`;
    if (blackTime === 0) {
      clearInterval(timerInterval); // Stop the timer when black's time runs out
      alert("Black loses on time!");
      window.location.reload();
    }
  } else {
    whiteTime--;
    whiteTimerElement.textContent = `White Timer: ${formatTime(whiteTime)}`;
    if (whiteTime === 0) {
      clearInterval(timerInterval); // Stop the timer when white's time runs out
      alert("White loses on time!");
      window.location.reload();
    }
  }
}

// Function to switch players (e.g., after a move)
function switchPlayer() {
  if (turn % 2 == 0) currentPlayer = "white";
  else {
    currentPlayer = "black";
  }
}

// Start the timer and update every second
const timerInterval = setInterval(updateTimers, 1000);
buttons.addEventListener("click", function (event) {
  let pinnedPieces = new Set();
  if (turn % 2 == 0) {
    for (let i of whitePieces) {
      if (valid_pin(i)) {
        pinnedPieces.add(i);
      }
    }
  } else {
    for (let i of blackPieces) {
      if (valid_pin(i)) {
        pinnedPieces.add(i);
      }
    }
  }
  if (!check()) {
    let ans = checkStillMate();
    console.log(`Still mate consition is ${ans}`);
    if (ans) {
      alert("Game is Drawn!");
      window.location.reload();
    }
    let buttonId = event.target.getAttribute("data-name");
    let [drow, dcol] = convert(buttonId);
    console.log(`Button Id:${buttonId}`);
    if (
      prev_id.length > 0 &&
      prev_id.includes(buttonId) &&
      prev_button != null &&
      prev_button != buttonId
    ) {
      movement(prev_button, buttonId);
      let [a, b] = convert(buttonId);
      let c = chessBoard[a][b];
      if ((c == "p" && a == 0) || (c == "P" && a == 7)) {
        let hidden_box = document.querySelector(".hidden");
        hidden_box.style.display = "inline-block";
      } else {
        turn += 1;
      }
    }
    switchPlayer();
    if (turn % 2 != 0) {
      console.log(`Black's turn! Turn:${turn}`);
    } else {
      console.log(`white's turn! Turn:${turn}`);
    }
    if (prev_id.length > 0) {
      colorBack(prev_id);
    }
    prev_id = [];
    let cond1 =
      turn % 2 == 0 &&
      (whitePieces.has(buttonId) || chessBoard[drow][dcol] == "");
    let cond2 =
      turn % 2 != 0 &&
      (blackPieces.has(buttonId) || chessBoard[drow][dcol] == "");
    console.log(`cond1:${cond1} Cond2:${cond2}`);
    if (cond1 || cond2) {
      let arr = showMoves(buttonId, 0);
      if (pinnedPieces.has(buttonId) == false) {
        let piece = chessBoard[drow][dcol];
        for (let i = 0; i < arr.length; i++) {
          if (piece != "k" && piece != "K") {
            colorChange(arr[i]);
          } else {
            if (support(arr[i])) {
              colorChange(arr[i]);
            }
          }
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          let value = arr[i];
          let d = validMove(buttonId, value);
          console.log(`${buttonId} to ${value} is ${d}`);
          if (d) {
            colorChange(value);
          }
        }
      }
      prev_id = arr;
      prev_button = buttonId;
    } else if (!cond1 && !cond2 && !k) {
      alert("Move your own pieces!");
    }
    k = 0;
    console.log(`Button ${buttonId} clicked!`);
    console.log("------------------");
    prev_check = 0;
  } else {
    console.log(`turn:${turn}`);
    prev_check = 1;
    let buttonId = event.target.getAttribute("data-name");
    let main, color, piece, button;
    if (turn % 2 == 0) {
      main = search("k");
      piece = "k";
      button = document.querySelector(`button[data-name="${main}"]`);
    } else {
      main = search("K");
      piece = "K";
      button = document.querySelector(`button[data-name="${main}"]`);
    }
    let no = main[0].charCodeAt(0) + main[1].charCodeAt(0);
    if (no % 2 == 0) {
      color = "#207e0b";
    } else {
      color = "white";
    }
    if (
      prev_id != undefined &&
      prev_id.length > 0 &&
      prev_id.includes(buttonId) &&
      prev_button != null &&
      prev_button != buttonId
    ) {
      movement(prev_button, buttonId);
      let btn = document.querySelector(`button[data-name="${main}"]`);
      btn.style.backgroundColor = color;
      btn.style.innerHTML = chessPieceUnicode.get(piece);
      prev_check = 0;
      let [a, b] = convert(buttonId);
      let c = chessBoard[a][b];
      if ((c == "p" && a == 0) || (c == "P" && a == 7)) {
        let hidden_box = document.querySelector(".hidden");
        hidden_box.style.display = "inline-block";
      } else {
        turn += 1;
      }
    }
    switchPlayer();
    if (prev_id != undefined && prev_id.length > 0) {
      colorBack(prev_id);
    }
    prev_id = [];
    if (prev_check) {
      let button = document.querySelector(`button[data-name="${main}"]`);
      button.style.backgroundColor = "red";
      button.style.innerHTML = chessPieceUnicode.get(piece);
      let mpp = check_moves(main);
      for (let [key, value] of mpp) {
        let btn = document.querySelector(`button[data-name="${key}"]`);
      }
      if (mpp.size == 0) {
        if (turn % 2 == 0) {
          alert(
            "Congratulations,Player 2 playing with black pieces has won the game!"
          );
          window.location.reload();
        } else {
          alert(
            "Congratulations,Player 1 playing with white pieces has won the game!"
          );
          window.location.reload();
        }
      }
      let arr = mpp.get(buttonId);
      if (arr != undefined) {
        for (let i = 0; i < arr.length; i++) {
          colorChange(arr[i]);
        }
      }
      prev_id = arr;
      prev_button = buttonId;
      k = 0;
    }
    console.log(`Button ${buttonId} clicked!`);
    console.log("------------------");
  }
});

document.querySelectorAll(".option").forEach(function (options) {
  options.addEventListener("click", function (event) {
    const selected = event.target.getAttribute("name");
    document.getElementById("infoBox").style.display = "none";
    switch (selectedChoice) {
      case "Q":
        castling("Q");
        break;
      case "R":
        castling("R");
        break;
      default:
        console.log("Fuck Off!");
    }
  });
});
document.querySelectorAll(".choice").forEach(function (choiceButton) {
  choiceButton.addEventListener("click", function (event) {
    const selectedChoice = event.target.getAttribute("name");
    document.getElementById("optionsBox").style.display = "none";
    switch (selectedChoice) {
      case "Q":
        handleOption("Q");
        break;
      case "R":
        handleOption("R");
        break;
      case "N":
        handleOption("N");
        break;
      case "B":
        handleOption("B");
        break;
      default:
        console.log("You fucked up everything!");
    }
  });
});
// Add to script.js
function startGame() {
  const whitePlayerName =
    document.getElementById("whitePlayerName").value || "White Player";
  const blackPlayerName =
    document.getElementById("blackPlayerName").value || "Black Player";

  document.getElementById("whitePlayerDisplay").textContent = whitePlayerName;
  document.getElementById("blackPlayerDisplay").textContent = blackPlayerName;

  document.getElementById("introScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  // Initialize game
  initializeBoard();
  initializeTimers();
}

// Add smooth transitions for moves
function animateMove(fromSquare, toSquare) {
  const piece = fromSquare.innerHTML;
  fromSquare.innerHTML = "";

  const moveAnimation = document.createElement("div");
  moveAnimation.className = "moving-piece";
  moveAnimation.innerHTML = piece;

  document.body.appendChild(moveAnimation);

  // Calculate positions
  const fromRect = fromSquare.getBoundingClientRect();
  const toRect = toSquare.getBoundingClientRect();

  moveAnimation.style.position = "fixed";
  moveAnimation.style.left = `${fromRect.left}px`;
  moveAnimation.style.top = `${fromRect.top}px`;

  requestAnimationFrame(() => {
    moveAnimation.style.transition = "all 0.3s ease";
    moveAnimation.style.left = `${toRect.left}px`;
    moveAnimation.style.top = `${toRect.top}px`;
  });

  setTimeout(() => {
    toSquare.innerHTML = piece;
    moveAnimation.remove();
  }, 300);
}
// Add to script.js
document.addEventListener("DOMContentLoaded", () => {
  const chessBoard = document.querySelector(".chess-board");
  let currentRotationX = 0;
  let currentRotationY = 0;
  let isFlipped = false;
  let isDragging = false;
  let startX, startY;

  // Add control buttons
  const controls = document.createElement("div");
  controls.className = "board-controls";
  controls.innerHTML = `
        <button class="control-btn" id="flipBoard">Flip Board</button>
        <button class="control-btn" id="resetView">Reset View</button>
    `;
  document.querySelector(".board-container").appendChild(controls);

  // Flip board button
  document.getElementById("flipBoard").addEventListener("click", () => {
    isFlipped = !isFlipped;
    updateBoardTransform();
  });

  // Update board transform without any initial tilt
  function updateBoardTransform() {
    let transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    if (isFlipped) {
      transform += " rotateZ(180deg)";
    }
    chessBoard.style.transform = transform;
  }
  updateBoardTransform();
  // Reset view button
  document.getElementById("resetView").addEventListener("click", () => {
    currentRotationX = 0;
    currentRotationY = 0;
    isFlipped = false;
    updateBoardTransform();
  });

  // Mouse controls for rotation
  chessBoard.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;

    // Limit rotation
    currentRotationX = Math.max(-45, Math.min(45, currentRotationX));
    currentRotationY = Math.max(-45, Math.min(45, currentRotationY));

    updateBoardTransform();

    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "f":
        isFlipped = !isFlipped;
        updateBoardTransform();
        break;
      case "r":
        currentRotationX = 0;
        currentRotationY = 0;
        isFlipped = false;
        updateBoardTransform();
        break;
    }
  });

  function updateBoardTransform() {
    let transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    if (isFlipped) {
      transform += " rotateZ(180deg)";
    }
    chessBoard.style.transform = transform;

    // Update piece orientations
    document.querySelectorAll(".square").forEach((square) => {
      if (isFlipped) {
        square.style.transform = "rotateZ(180deg)";
      } else {
        square.style.transform = "none";
      }
    });
  }
});

// testing
// Add to script.js
document.addEventListener("DOMContentLoaded", () => {
  // Mouse trail effect
  const trail = document.querySelector(".cursor-trail");
  let trailElements = [];

  document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    trail.style.left = `${clientX}px`;
    trail.style.top = `${clientY}px`;

    createTrailElement(clientX, clientY);
  });

  function createTrailElement(x, y) {
    const element = document.createElement("div");
    element.className = "cursor-trail";
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    document.body.appendChild(element);

    setTimeout(() => {
      element.style.opacity = "0";
      setTimeout(() => element.remove(), 300);
    }, 100);
  }

  // Particle system
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // class Particle {
  //   constructor() {
  //     this.x = Math.random() * canvas.width;
  //     this.y = Math.random() * canvas.height;
  //     this.size = Math.random() * 3;
  //     this.speedX = Math.random() * 2 - 1;
  //     this.speedY = Math.random() * 2 - 1;
  //   }

  //   update() {
  //     this.x += this.speedX;
  //     this.y += this.speedY;

  //     if (this.x > canvas.width) this.x = 0;
  //     if (this.x < 0) this.x = canvas.width;
  //     if (this.y > canvas.height) this.y = 0;
  //     if (this.y < 0) this.y = canvas.height;
  //   }

  //   draw() {
  //     ctx.beginPath();
  //     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  //     ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  //     ctx.fill();
  //   }
  // }

  // function initParticles() {
  //   for (let i = 0; i < 100; i++) {
  //     particles.push(new Particle());
  //   }
  // }

  // testing
  // Update/Add to script.js
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 2;
      this.baseSize = this.size;
      this.color = color;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.life = 1;
      this.velocity = 0;
    }

    update(mouse) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Particle attraction to mouse
      if (distance < 150) {
        const force = (150 - distance) / 1500;
        this.speedX += dx * force;
        this.speedY += dy * force;
        this.size = this.baseSize * (1 + force * 10);
        this.velocity = Math.sqrt(
          this.speedX * this.speedX + this.speedY * this.speedY
        );
      } else {
        this.size = this.baseSize;
      }

      this.x += this.speedX;
      this.y += this.speedY;

      // Add decay and damping
      this.speedX *= 0.98;
      this.speedY *= 0.98;
      this.life *= 0.99;

      // Boundary check
      if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
      if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
    }

    draw(ctx) {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size
      );

      // Create glowing effect based on velocity
      const alpha = Math.min(1, 0.3 + this.velocity);
      gradient.addColorStop(0, `${this.color.replace(")", `,${alpha})`)})`);
      gradient.addColorStop(1, `${this.color.replace(")", ",0)")}`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function initParticleSystem() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const particles = [];
    const mouse = { x: 0, y: 0 };
    const colors = [
      "rgba(79, 70, 229", // Indigo
      "rgba(147, 51, 234", // Purple
      "rgba(236, 72, 153", // Pink
      "rgba(59, 130, 246", // Blue
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create initial particles
    for (let i = 0; i < 100; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          colors[Math.floor(Math.random() * colors.length)]
        )
      );
    }

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Add new particles on mouse move
      if (Math.random() < 0.2) {
        particles.push(
          new Particle(
            mouse.x + (Math.random() - 0.5) * 20,
            mouse.y + (Math.random() - 0.5) * 20,
            colors[Math.floor(Math.random() * colors.length)]
          )
        );
      }
    });

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update(mouse);
        particle.draw(ctx);

        // Remove dead particles
        if (particle.life < 0.01) {
          particles.splice(index, 1);
        }
      });

      // Add new particles to maintain count
      while (particles.length < 100) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            colors[Math.floor(Math.random() * colors.length)]
          )
        );
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // Initialize particle system
  document.addEventListener("DOMContentLoaded", initParticleSystem);
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let particle of particles) {
      particle.update();
      particle.draw();
    }

    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // Add glowing text effect
  const title = document.querySelector(".game-title");
  title.setAttribute("data-text", title.textContent);
});

// Add to script.js
document.addEventListener("DOMContentLoaded", () => {
  // Neural network background
  const canvas = document.createElement("canvas");
  canvas.classList.add("neural-bg");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let nodes = [];
  let connections = [];

  function initNeuralBg() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
  }

  function drawNeuralNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update nodes
    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#4f46e5";
      ctx.fill();
    });

    // Draw connections
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((other) => {
        const distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(79, 70, 229, ${1 - distance / 100})`;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(drawNeuralNetwork);
  }

  initNeuralBg();
  drawNeuralNetwork();

  // Piece movement effects
  const pieces = document.querySelectorAll(".square:not(:empty)");
  pieces.forEach((piece) => {
    piece.addEventListener("mouseenter", () => {
      gsap.to(piece, {
        scale: 1.1,
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    piece.addEventListener("mouseleave", () => {
      gsap.to(piece, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    });
  });
});

// testing final
// Add to script.js
function initIntroAnimation() {
  // Three.js Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector(".intro-screen").prepend(renderer.domElement);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.zIndex = "1";

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Create Chess Pieces
  const pieces = [];
  const pieceGeometry = new THREE.ConeGeometry(0.5, 1.5, 32);
  const pieceMaterial = new THREE.MeshPhongMaterial({
    color: 0x4f46e5,
    shininess: 100,
    transparent: true,
    opacity: 0.8,
  });

  for (let i = 0; i < 20; i++) {
    const piece = new THREE.Mesh(pieceGeometry, pieceMaterial);
    piece.position.x = (Math.random() - 0.5) * 10;
    piece.position.y = (Math.random() - 0.5) * 10;
    piece.position.z = (Math.random() - 0.5) * 10;
    pieces.push(piece);
    scene.add(piece);
  }

  camera.position.z = 5;

  // Mouse Interaction
  const mouse = new THREE.Vector2();
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouseX = event.clientX;
    mouseY = event.clientY;

    // Update particle system
    particleSystem.forEach((particle) => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 200) {
        particle.vx += dx * 0.001;
        particle.vy += dy * 0.001;
      }
    });
  });

  // Particle System
  const particleSystem = [];
  const particleCanvas = document.createElement("canvas");
  particleCanvas.style.position = "absolute";
  particleCanvas.style.top = "0";
  particleCanvas.style.zIndex = "0";
  document.querySelector(".intro-screen").prepend(particleCanvas);

  const ctx = particleCanvas.getContext("2d");

  function initParticles() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    for (let i = 0; i < 100; i++) {
      particleSystem.push({
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
      });
    }
  }

  function updateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    ctx.fillStyle = "rgba(79, 70, 229, 0.3)";
    particleSystem.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary check
      if (particle.x < 0 || particle.x > particleCanvas.width)
        particle.vx *= -0.5;
      if (particle.y < 0 || particle.y > particleCanvas.height)
        particle.vy *= -0.5;

      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    pieces.forEach((piece) => {
      piece.rotation.x += 0.005;
      piece.rotation.y += 0.005;
      piece.position.y += Math.sin(Date.now() * 0.001) * 0.02;
    });

    // Camera movement
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    updateParticles();
  }

  initParticles();
  animate();

  // Resize handler
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initIntroAnimation);
