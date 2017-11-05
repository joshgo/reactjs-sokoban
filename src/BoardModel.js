class BoardModel {
    constructor(puzzle) {
        this.defaultPuzzleStr = puzzle;
        this.width = this.height = 0;
        this.puzzle = [];
        this.charToItem = new Map();
        this.itemToChar = new Map();

        this.charToItem.set('#', 'wall');
        this.charToItem.set('@', 'person');
        this.charToItem.set('&', 'person-on-goal');
        this.charToItem.set('$', 'box');
        this.charToItem.set('*', 'box-on-goal');
        this.charToItem.set(' ', 'floor');
        this.charToItem.set('.', 'goal');
        for(var [k,v] of this.charToItem) {
            this.itemToChar.set(v, k);
        }

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
        return this.charToItem.get(ch);
    }

    getNextPosition(pos, dir) {
        var inc = 1;
        var current = {x : pos.x, y : pos.y };

        // move left or right
        if (dir === 'l' || dir === 'r') {
            if(dir === 'l')
                inc = -1;
            current.x += inc;
        }

        // move up or down
        if (dir === 'u' || dir === 'd') {
            if(dir === 'u')
                inc = -1;
            current.y += inc;
        }

        return current;
    }

    isFree(pos) {
        var item = this.getItem(pos);
        if (item === 'floor' || item === 'goal')
            return true;
        else
            return false;
    }

    moveIt(pos, npos) {
        // person or box
        var item = this.getItem(pos);

        // Change current tile back to original
        var prev = this.puzzle[pos.y][pos.x];
        if (item === 'person')
            this.puzzle[pos.y][pos.x] = this.itemToChar.get('floor');
        else if (item === 'person-on-goal')
            this.puzzle[pos.y][pos.x] = this.itemToChar.get('goal');
        else if (item === 'box')
            this.puzzle[pos.y][pos.x] = this.itemToChar.get('floor');
        else if (item === 'box-on-goal')
            this.puzzle[pos.y][pos.x] = this.itemToChar.get('goal');
        else
            return;

        var curr = this.puzzle[pos.y][pos.x];
        var isPerson = (item === 'person' || item === 'person-on-goal');
        if (isPerson) {
            this.position = npos;
        }

        var nextItem = this.getItem(npos);
        if (nextItem === 'floor' && isPerson)
            this.puzzle[npos.y][npos.x] = this.itemToChar.get('person');
        else if (nextItem === 'goal' && isPerson)
            this.puzzle[npos.y][npos.x] = this.itemToChar.get('person-on-goal');
        else if (nextItem === 'floor' && !isPerson)
            this.puzzle[npos.y][npos.x] = this.itemToChar.get('box');
        else if (nextItem === 'goal' && !isPerson)
            this.puzzle[npos.y][npos.x] = this.itemToChar.get('box-on-goal');
    }

    move(dir) {
        // get next position
        var npos = this.getNextPosition(this.position, dir);
        // is next position empty, then move done!
        if (this.isFree(npos)) {
            this.moveIt(this.position, npos);
            return;
        }

        var item = this.getItem(npos);
        if (item !== 'box' && item !== 'box-on-goal') {
            return;
        }

        var nnpos = this.getNextPosition(npos, dir);
        if (!this.isFree(nnpos))
            return;
        
        this.moveIt(npos, nnpos);
        this.moveIt(this.position, npos);
    }
}

export default BoardModel;