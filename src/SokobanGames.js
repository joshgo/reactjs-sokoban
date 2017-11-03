class SokobanGames {
    constructor() {
        this.games = [
            "#######\n" +
            "#.@ # #\n" +
            "#$* $ #\n" +
            "#   $ #\n" +
            "# ..  #\n" +
            "#  *  #\n" +
            "#######"
        ]
    }

    getRandomGame() {
        return this.games[0];
    }
}

export default (new SokobanGames());