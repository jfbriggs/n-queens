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

////////////////////////// ONE ROOK /////////////////////////////////

window.findNRooksSolution = function(n) {
  var solution;

  // create a new clear board of size nxn
  var board = new Board({n: n});

  // create inner function to generate a combination and check for conflicts
  var generateCombo = function(n, board, currentRow) {

    // create variable for 'current row'
    currentRow = currentRow || 0;

    // BASE CASE --> if 'current row' is greater than n (i.e. no more rows)
    if (currentRow === n) {
      // we have a working combination, so set solution to a copy of it and return
      solution = _.map(board.rows(), function(row) {
        return row.slice();
      });
      // and break out
      return;
    }

    // iterate through possible indeces in a row (n)
    for (var i = 0; i < n; i++) {
      if (solution !== undefined) {
        break;
      }
      // toggle piece in board for that row/index to be a 1
      board.togglePiece(currentRow, i);
      // if what we currently have placed does not have conflicts
      if (!board.hasAnyRooksConflicts()) {
        // recursively re-run generateCombo for next row
        generateCombo(n, board, currentRow + 1);
      }
      // toggle the current piece back
      board.togglePiece(currentRow, i);

    }
  }
  
  // run initial invocation of inner combo-generator function
  generateCombo(n, board);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

////////////////////////// TOTAL ROOKS /////////////////////////////////

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  // create a new clear board of size nxn
  var board = new Board({n: n});

  // create inner function to generate a combination and check for conflicts
  var generateCombo = function(n, board, currentRow) {

    // BASE CASE --> if 'current row' is n (i.e. no more rows)
    if (currentRow === n) {
      // we have a working combination, so increment solutionCount
      solutionCount++;
      // and break out
      return;
    }

    // iterate through possible indeces in a row (n)
    for (var i = 0; i < n; i++) {
      // toggle piece in board for that row/index to be a 1
      board.togglePiece(currentRow, i);
      // if what we currently have placed does not have conflicts
      if (!board.hasAnyRooksConflicts()) {
        // recursively re-run generateCombo for next row
        generateCombo(n, board, currentRow + 1);
      }
      // toggle the current piece back
      board.togglePiece(currentRow, i);

    }
  }
  
  // run initial invocation of inner combo-generator function
  generateCombo(n, board, 0);


  // return total count
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

/////////////////////////// SINGLE QUEEN ///////////////////////////////////

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;

  // create a new clear board of size nxn
  var board = new Board({n: n});

  // create inner function to generate a combination and check for conflicts
  var generateCombo = function(n, board, currentRow) {

    // create variable for 'current row'
    currentRow = currentRow || 0;

    // BASE CASE --> if 'current row' is greater than n (i.e. no more rows)
    if (currentRow === n) {
      // we have a working combination, so set solution to a copy of it and return
      solution = _.map(board.rows(), function(row) {
        return row.slice();
      });
      // and break out
      return;
    }

    // iterate through possible indeces in a row (n)
    for (var i = 0; i < n; i++) {
      if (solution !== undefined) {
        break;
      }
      // toggle piece in board for that row/index to be a 1
      board.togglePiece(currentRow, i);
      // if what we currently have placed does not have conflicts
      if (!board.hasAnyQueensConflicts()) {
        // recursively re-run generateCombo for next row
        generateCombo(n, board, currentRow + 1);
      }
      // toggle the current piece back
      board.togglePiece(currentRow, i);

    }
  }
  
  // run initial invocation of inner combo-generator function
  generateCombo(n, board);

  // if solution is still undefined, change it to default to the empty board matrix
  if (solution === undefined) {
    solution = board.rows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

///////////////////////////// TOTAL QUEENS ////////////////////////////////

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  // create a new clear board of size nxn
  var board = new Board({n: n});

  // create inner function to generate a combination and check for conflicts
  var generateCombo = function(n, board, currentRow) {

    // BASE CASE --> if 'current row' is n (i.e. no more rows)
    if (currentRow === n) {
      // we have a working combination, so increment solutionCount
      solutionCount++;
      // and break out
      return;
    }

    // iterate through possible indeces in a row (n)
    for (var i = 0; i < n; i++) {
      // toggle piece in board for that row/index to be a 1
      board.togglePiece(currentRow, i);
      // if what we currently have placed does not have conflicts
      if (!board.hasAnyQueensConflicts()) {
        // recursively re-run generateCombo for next row
        generateCombo(n, board, currentRow + 1);
      }
      // toggle the current piece back
      board.togglePiece(currentRow, i);

    }
  }
  
  // run initial invocation of inner combo-generator function
  generateCombo(n, board, 0);


  // return total count
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
