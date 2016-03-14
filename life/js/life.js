var ll = 10;

function countNeihgbours(board, i) {
    var count = 0;
    var neighbors = [
        i - 1,
        i + 1,
        i - ll,
        i + ll,
        i - 1 - ll,
        i - 1 + ll,
        i + 1 - ll,
        i + 1 + ll
    ];

    // todo: fix issue with start and end of the row

    neighbors.forEach(function(index) {
        var isEdge;
        if (board[index]) {
            count++;
        }
    });

    return count;
}

/**
 * @param {Array} board
 * @returns {Array}
 */
function update(board) {
    return board.map(function(v, i) {
        var n = countNeihgbours(board, i);

        if (v) {
            if (n > 3 || n < 2) {
                return 0;
            }
        } else {
            if (n == 3) {
                return 1;
            }
        }

        return v;
    });
}

/**
 * @param {Array} board
 */
function render(board) {
    process.stdout.write('\033c');
    for (var i = 0, n = Math.ceil(board.length / ll); i < n; i++) {
        process.stdout.write(
            board.slice(i * ll, i * ll + ll).map(function(v) {
                return v ? 'x' : ' ';
            }).join('') + '\n'
        );
    }
}

var board = [
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];


render(board);

var interval = setInterval(function() {

    var next = update(board);
    render(next);

    var totalAlive = next.reduce(function(v, total) {
        return total + v;
    });

    if (totalAlive === 0 || board.join() === next.join()) {
        clearInterval(interval);
    }

    board = next;

}, 250);
