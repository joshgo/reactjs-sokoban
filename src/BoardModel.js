class BoardModel {
    constructor(puzzle) {
        this.defaultPuzzleStr = puzzle;
        this.width = this.height = 0;
        this.puzzle = [];

        // Initialize puzzle
        var lines = this.defaultPuzzleStr.split('\n');

        for(var y = 0; y < lines.length; y++) {
            var line = lines[y].trim();
            this.puzzle.push([]);
            for(var x = 0; x < line.length; x++) 
                this.puzzle[y].push(line[x]);

            this.width = Math.max(this.width, line.length);
        }
        this.height = lines.length;

        // find position of persion
        for(var y = 0; y < this.puzzle.length; y++) {
            for(var x = 0; x < this.puzzle[y].length; x++) {
                if (this.puzzle[y][x] === '@') {
                    this.position = { x:x, y:y };
                }
            }
        }
    }

    getWidth() { return this.width; }
    getHeight() { return this.height; }
    getPosition() { return this.position; }
    getItem(pos) {
        var ch = this.puzzle[pos.y][pos.x];
        switch(ch) {
            case '#' :
                return 'wall';
                break;
            case '@':
                return 'person';
                break;
            case '.':
                return 'goal';
                break;
            case '$':
                return 'box';
                break;
            case '*':
                return 'box-on-goal';
                break;
            case ' ':
                return 'floor';
                break;
        }

        return 'X';
    }

    move(dir) {
        var inc = 1;
        console.log(this.position);
        // move left or right
        if (dir === 'l' || dir === 'r') {
            if(dir === 'l')
                inc = -1;
            this.position.x += inc;
        }

        // move up or down
        if (dir === 'u' || dir === 'd') {
            if(dir === 'u')
                inc = -1;
            this.position.y += inc;
        }

        this.puzzle[this.position.y][this.position.x] = "@";
        console.log(this.position);
    }

}

export default BoardModel;