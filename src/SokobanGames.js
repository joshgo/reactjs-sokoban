class SokobanGames {
    constructor() {
        this.games = [
            "#######\n" +
            "#.@ # #\n" +
            "#$* $ #\n" +
            "#   $ #\n" +
            "# ..  #\n" +
            "#  *  #\n" +
            "#######",

            "######################\n" +
            "#     ##########     #\n" +
            "# $ $ #   ###### ..* #\n" +
            "#   $##   ####  ..$ ##\n" +
            "### $    #####**.$####\n" +
            "# $$# #$$$  ......####\n" +
            "# @ #    ## $.#  #####\n" +
            "######################",

            "########\n" +
            "#@$.   #\n" +
            "#$*$  .#\n" +
            "#.$ *#.#\n" +
            "#  $ $ #\n" +
            "# #$..##\n" +
            "#.. $  #\n" +
            "########"
        ]
    }

    getRandomGame() {
        return this.games[Math.floor(Math.random() * this.games.length)];
    }
}

export default (new SokobanGames());