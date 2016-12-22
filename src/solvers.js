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
  // var solution = undefined; //fixme
  
  /* BS SAMPLE CODE:
  var tempSolution = new Board([[0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0], [1, 0, 0, 0]]);

  if (tempSolution.hasAnyRooksConflicts() === false) {
    solution = tempSolution.rows();
  } */

  var matricize = function(n, array) {
    var result = [];  // final matrix outer array

    // iterate through passed in array (n * n number of elements), increment by n
    for (var i = 0; i < array.length; i += n) {
      // push an array of n elements to result
      result.push(array.slice(i, i + n));
    }
    
    //return newly formed matrix array result
    return result;

  };

  // function to check combinations

  var runThroughCombos = function(n, array) {

  // create Board out of current passed in combination
    var tempBoard = new Board(matricize(n, array));

    // if that Board passes Rook tests
    if (tempBoard.hasAnyRooksConflicts() === false) {
      // return that board's rows() output
      return tempBoard.rows();
    }

    var theOnes = [];
    var last = Math.sqrt(array.length) - 1;

    for (var i = 0; theOnes.length < 4; i++) {
      if (array[i] === 1) {
        theOnes.push(i);
      }
    }

    if (theOnes === [array.length - 1, array.length - 2, array.length - 3, array.length - 4]) {
      return 'Nothing worked.';
    }
    
    if (theOnes[last] !== array.length - 1) {
      array[theOnes[last]] = 0;
      array[theOnes[last] + 1] = 1;
      runThroughCombos(n, array);
    } else {
      array[theOnes[last]] = 0;
      array[theOnes[0]] = 0;
      var anchorPoint = theOnes[theOnes.length - 1];
      for (var i = anchorPoint + 1; i <= anchorPoint + (theOnes.length / 2); i++) {
      // set array[theOnes[theOnes.length - 1]] to 1, as well as 
        array[i] = 1;
      }
      runThroughCombos(n, array);
    }
  };

  var createStartingArray = function(n) {
    var result = [];
    for (var i = 1; i <= n; i++) {
      result.push(1);
    }
    for (var j = 1; j <= n * 3; j++) {
      result.push(0);
    }
    return result;
  };

  runThroughCombos(n, createStartingArray(n));



  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

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

/* EXAMPLE MATRIX

[[0, 1, 0, 0],
 [0, 0, 0, 1],
 [0, 0, 1, 0],
 [1, 0, 0, 0]]

STEPS FOR ROOKS:

1.  Come up with a combo
2.  Run in through row conflict check
3.  If it passes, return it OR add 1 to solutionCount (depending on which function)


*/