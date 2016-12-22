/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution;

  var createStartingArray = function(n) {  // creates a single array of n*n values with the first n values being 1
    var result = [];
    for (var i = 1; i <= n; i++) {
      result.push(1);
    }
    for (var j = 1; j <= n * (n - 1); j++) {
      result.push(0);
    }
    return result;
  };

  var matricize = function(n, array) {
    var result = [];  // will become final matrix outer array

    // iterate through passed in array (n * n number of elements), increment by n
    for (var i = 0; i < array.length; i += n) {
      // push an array of n elements to result
      result.push(array.slice(i, i + n));
    }
    
    //return newly formed matrix array result
    return result;
  };

  // create starting test Board based on n (entire first row will be 1's)
  var testBoard = new Board(matricize(n, createStartingArray(n)));

  // create set of starting indices based on n
  var positions = function() {
    var result = [];
    for (var i = 0; i < n; i++) {
      result.push([0, i]);
    }
    return result;
  }();  // i.e. [[0, 0], [1, 3], [2, 0], [3, 3]] ==> starting indices for n = 4 ([row, column])

  var indexIncrement = function(array) {
    if (array[1] === n - 1) {
      array[1] = 0;
      array[0]++;
    } else {
      array[1]++;
    }
    return array;
  };

  // create function to run checks on a board setup, and make changes -> re-run if not passing
  var checkBoard = function(board) {
    // if the board passes Rooks checks
    if (board.hasAnyRooksConflicts() === false) {
      // make solution the current board
      solution = board;
      // and return
      return;

    } else { // otherwise...
      // if the entire last row of the board is 1's (aka no more combinations left)
      if (board.get((n - 1).toString()).includes(0) === false) {
        // stop
        return;
      } else {
        // otherwise
        var anchor;  // will represent anchor point to make changes in positions (will be an index within 'positions')
        if (positions[n - 1][0] === n - 1 && positions[n - 1][1] === n - 1) {  // when last elemnent in positions is the last possible index (n*n - 1)
          // iterate backwards through positions checking if positions[i][1] is 1 less than positions[i + 1]
          for (var i = n - 2; i >= 0; i--) {
            if (positions[i][1] === positions[i + 1] - 1 && positions[i][0] === positions[i + 1][0]) { // if current colIndex is 1 less than next
              board.togglePiece.apply(board, positions[i]);
              continue;
            // set anchor point at index in positions where the next lower index is not current index's value - 1
            } else if (positions[i][1] === n - 1 && positions[i][0] === positions[i + 1][0] - 1) {
              board.togglePiece.apply(board, positions[i]);
              continue;
            } else {
              board.togglePiece.apply(board, positions[i]);
              anchor = i;
              break;
            }
          }
          // increment positions at index anchor up 1 & toggle
          indexIncrement(positions[anchor]);
          board.togglePiece.apply(board, positions[anchor]);

          // iterate forward from anchor, setting the value of positions[anchor] to positions[anchor - 1] + 1, etc...
          for (var j = anchor + 1; j < positions.length; j++) {
            var last = positions[j - 1].slice();
            positions[j] = indexIncrement(last);
            board.togglePiece.apply(board, positions[j]);
          }

          // set last space on board back to a 0
          board.togglePiece.apply(board, [n - 1, n - 1]);
          // and recursively re-run checkBoard
          checkBoard(board);

        } else { // if the rightmost 1 in the array is not the last element...
          // make the current right-most 1 a 0...
          board.togglePiece.apply(board, positions[n - 1]);
          // make the NEXT element a 1 (moving to first index of next row if necessary)...
          indexIncrement(positions[n - 1]);
          board.togglePiece.apply(board, positions[n - 1]);
          // and recursively re-run checkBoard on the new array
          checkBoard(board);
        }
      }
    }
  };

  checkBoard(testBoard);
  



  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var createStartingArray = function(n) {  // creates a single array of n*n values with the first n values being 1
    var result = [];
    for (var i = 1; i <= n; i++) {
      result.push(1);
    }
    for (var j = 1; j <= n * (n - 1); j++) {
      result.push(0);
    }
    return result;
  };

  var matricize = function(n, array) {
    var result = [];  // will become final matrix outer array

    // iterate through passed in array (n * n number of elements), increment by n
    for (var i = 0; i < array.length; i += n) {
      // push an array of n elements to result
      result.push(array.slice(i, i + n));
    }
    
    //return newly formed matrix array result
    return result;
  };

  // create starting test Board based on n (entire first row will be 1's)
  var testBoard = new Board(matricize(n, createStartingArray(n)));

  // create set of starting indices based on n
  var positions = function() {
    var result = [];
    for (var i = 0; i < n; i++) {
      result.push([0, i]);
    }
    return result;
  }();  // i.e. [[0, 0], [1, 3], [2, 0], [3, 3]] ==> starting indices for n = 4 ([row, column])

  var indexIncrement = function(array) {
    if (array[1] === n - 1) {
      array[1] = 0;
      array[0]++;
    } else {
      array[1]++;
    }
    return array;
  };

  // create function to run checks on a board setup, and make changes -> re-run if not passing
  var checkBoard = function(board) {
    // if the board passes Rooks checks
    if (board.hasAnyRooksConflicts() === false) {
      // make solution the current board
      solution = board;
      // and return
      return;

    } else { // otherwise...
      // if the entire last row of the board is 1's (aka no more combinations left)
      if (board.get((n - 1).toString()).includes(0) === false) {
        // stop
        return;
      } else {
        // otherwise
        var anchor;  // will represent anchor point to make changes in positions (will be an index within 'positions')
        if (positions[n - 1][0] === n - 1 && positions[n - 1][1] === n - 1) {  // when last elemnent in positions is the last possible index (n*n - 1)
          // iterate backwards through positions checking if positions[i][1] is 1 less than positions[i + 1]
          for (var i = n - 2; i >= 0; i--) {
            if (positions[i][1] === positions[i + 1] - 1 && positions[i][0] === positions[i + 1][0]) { // if current colIndex is 1 less than next
              board.togglePiece.apply(board, positions[i]);
              continue;
            // set anchor point at index in positions where the next lower index is not current index's value - 1
            } else if (positions[i][1] === n - 1 && positions[i][0] === positions[i + 1][0] - 1) {
              board.togglePiece.apply(board, positions[i]);
              continue;
            } else {
              board.togglePiece.apply(board, positions[i]);
              anchor = i;
              break;
            }
          }
          // increment positions at index anchor up 1 & toggle
          indexIncrement(positions[anchor]);
          board.togglePiece.apply(board, positions[anchor]);

          // iterate forward from anchor, setting the value of positions[anchor] to positions[anchor - 1] + 1, etc...
          for (var j = anchor + 1; j < positions.length; j++) {
            var last = positions[j - 1].slice();
            positions[j] = indexIncrement(last);
            board.togglePiece.apply(board, positions[j]);
          }

          // set last space on board back to a 0
          board.togglePiece.apply(board, [n - 1, n - 1]);
          // and recursively re-run checkBoard
          checkBoard(board);

        } else { // if the rightmost 1 in the array is not the last element...
          // make the current right-most 1 a 0...
          board.togglePiece.apply(board, positions[n - 1]);
          // make the NEXT element a 1 (moving to first index of next row if necessary)...
          indexIncrement(positions[n - 1]);
          board.togglePiece.apply(board, positions[n - 1]);
          // and recursively re-run checkBoard on the new array
          checkBoard(board);
        }
      }
    }
  };

  checkBoard(testBoard);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};