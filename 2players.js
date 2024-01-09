// put all the javascript code within same block ( for variable scope - see details online )
{
    // declare variables before using them ( pColor1 = Color for player1 | pColor2 = Color for player2 ...)
    var pColor1,
        pColor2,
        pName1,
        pName2,
        turn;

    // we have 9 boxes: <td id="box1"> ... <td id="box4"> ... 
    // each box has id="box"+number attribute, starting from 1, ending in 9
    // The condition for game to be won/end is if one of the following:
    // [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]
    // is marked by same user... To hack the array index beginning with zero,
    // addded one [0] before each box's condition, and [0,0,0,0] in the array of boxes
    //
    // boxes is multidimensional array, containing conditions for game winning
    // draw a tic tac toe on paper, mark each boxes as box1, box2, etc.. and see 
    // how the game can be won.. (see above)
    boxes = [[0,
        0,
        0,
        0],
    [0,
        1,
        2,
        3],
    [0,
        4,
        5,
        6],
    [0,
        7,
        8,
        9],
    [0,
        1,
        4,
        7],
    [0,
        2,
        5,
        8],
    [0,
        3,
        6,
        9],
    [0,
        1,
        5,
        9],
    [0,
        3,
        5,
        7]];

    // this is to avoid writing document.getElementById() everywhere
    // this function returns the return value of that function, hence
    // dgi('some-id') will work as document.getElementById('some-id')
    function dgi(a) {
        return document.getElementById(a);
    }

    // takes player (int) and color (string)
    // checks if the colors of both players match - if yes, show warning and disable the 'start game' button
    // else set the colors for players.
    function setPlayerColor(player, color) {
        dgi('errBox').innerHTML = '';
        dgi('startButton').disabled = false;

        switch (player) {
            case 1: // for player 1

                if (color == pColor2) {
                    // check if the color chosen matches with color of player 2
                    dgi('errBox').innerHTML = 'Two players cannot have the same name!';
                    dgi('startButton').disabled = true;
                    return false;
                }

                // set the color
                pColor1 = color;
                return true;
                break;

            case 2: if (color == pColor1) {
                // check if the color chosen matches with color of player 1
                dgi('errBox').innerHTML = 'Two players cannot have the same color!';
                dgi('startButton').disabled = true;
                return false;
            }

                // set the color
                pColor2 = color;
                return true;
                break;
        }

        // p1Color is the color shown in the right-side table while the game is being played,
        // set the background color of the table data to the respective colors chosen
        dgi('p1Color').style.backgroundColor = pColor1;
        dgi('p2Color').style.backgroundColor = pColor2;
    }

    // works exactly as the setPlayerColor() function
    function setPlayerName(player, name) {
        dgi('errBox').innerHTML = '';
        dgi('startButton').disabled = false;

        switch (player) {
            case 1: if (name == pName2) {
                dgi('errBox').innerHTML = 'Two players cannot have the same name!';
                dgi('startButton').disabled = true;
                return false;
            }

                pName1 = name;
                return true;
                break;

            case 2: if (name == pName1) {
                dgi('errBox').innerHTML = 'Two players cannot have the same color!';
                dgi('startButton').disabled = true;
                return false;
            }

                pName2 = name;
                return true;
                break;
        }

        dgi('p1Name').innerHTML = name;
        dgi('p2Name').innerHTML = name;
    }

    // the main logic of the game... takes the input checkbox that was clicked
    // and then checks whose turn it was... updates the information being showed
    // and then checks if any one of the user has won the game or not...
    // finally it checks if all the fields are selected or not...
    function checkThis(target) {
        // from the checkbox, find the <td> which happens to be the parent of chosen checkbox
        ourTarget = target.parentNode;

        if (turn == 1) {
            turn = 2; // shift the turn
            target.value = 1; // target means 'checkbox' that was clicked, hence make it's value = 1 (ie. player1)
            dgi('playerTurn').innerHTML = pName2 + ' Playing...';
            ourTarget.style.backgroundColor = pColor1;
            checkWinner(1);
        }

        else if (turn == 2) {
            turn = 1;
            target.value = 2; // same as above, if turn was of player 2, set the checkbox's value = 2
            dgi('playerTurn').innerHTML = pName1 + ' Playing...';
            ourTarget.style.backgroundColor = pColor2;
            checkWinner(2);
        }

        // lets check if the match has been draw (if all fields are checked but no one is winner)
        allFieldsChecked();
    }

    // checks if the player has won the game or not.
    // using the 'turn (int)' as parameter, finds the value of checkboxes, named 'inp1', 'inp2', etc..
    // Assume, if first row was all selected by player1, value of inp1, inp2 and inp3 would be 1
    // traversing the multidimensional array of game winning condition above, it checks 
    // whether one player has selected all the three boxes (any one of the 8 possible combinations: horizontal, vertical and diagonal)

    // first loop: traverses through the 8 conditions... setting score = 0
    // second loop: traverses through 3 boxes in serial, incrementing score by 1
    // in case the score reaches 3, the player had satisfied one of the conditions for game winning
    // if one of the boxes has not been selected, score will be set back to 0, and will check for another combination
    function checkWinner(turn) {

        for (eachCase = 1; eachCase <= 8; eachCase++) {

            score = 0;

            for (eachBox = 1; eachBox <= 3; eachBox++) {

                // boxToCheck will take values from boxes[][] array
                boxToCheck = boxes[eachCase][eachBox];

                // if turn was of player 1, value of turn will be 1, hence check if the target box has value = 1 or not.
                // same in case turn was of 2nd player... see if the boxes had value 2, serially 3 times
                if (dgi('inp' + boxToCheck).value == turn) {
                    score++;
                }

                // could have used ( score == 3 ) but javascript's floating point approximation needs to be hacked
                // see details about floating point approximation of javascript
                // using ( score > 2 ) works perfect, anyways.
                if (score > 2) {

                    // if three boxes are serially checked, re-traverse those boxes
                    // and mark them by green borders

                    for (eachBox = 1; eachBox <= 3; eachBox++) {
                        boxToCheck = boxes[eachCase][eachBox];
                        dgi('box' + boxToCheck).style.border = '2px solid #0C0';
                    }

                    // set pName = player (turn)'s name

                    if (turn == 1) {
                        pName = pName1;
                    }

                    else if (turn == 2) {
                        pName = pName2;
                    }

                    // save game report to the 'Game Records' section
                    saveGame(pName);

                    // ask if the user wants to play with same names again..
                    // if yes, let the turn of 2nd player come first this time, by swapping their turns
                    // and start the game again,
                    // if they want to reset, reset the game
                    if (confirm(pName + " wins the game!\n\nRe-play between same players?\n\n[Ok] Play Again\t[Cancel] Reset Game") == true) {
                        swapValues();
                        startGame();
                        return;
                    }

                    else {
                        resetGame();
                        return;
                    }

                    return;
                }
            }

        }
    }

    // checks if all the fields are checked or not
    // going from inp1 to inp9.. if any of them is not checked (ie. checked = false means not selected) it returns false
    // if all of them are checked, the parser goes beyond the for-loop
    function allFieldsChecked() {
        allChecked = true;

        for (i = 1; i <= 9; i++) {
            if (dgi('inp' + i).checked == false) {
                allChecked = false;
            }
        }

        // in case all the boxes are already checked
        if (allChecked == true) {

            // save the game with blank string argument (this string denotes the winner's name - see the function)
            saveGame('');

            // again, ak as above (winning condition)... rematch or re-set?
            if (confirm("\tThe game ends in draw!\n\nRe-play between same players?\n\n[Ok] Play Again\t[Cancel] Reset Game") == true) {
                swapValues();
                startGame();
                return;
            }

            else {
                resetGame();
                return;
            }
        }
    }

    // Saves the game...
    // takes ' winner (string) as parameter
    // if winner's name is empty, assumes game ended in draw
    // else winner's name will be displayed as 'Winner : winner'
    function saveGame(winner) {

        dgi('infobox').innerHTML += '<div class="infoboxeach">';
        dgi('infobox').innerHTML += '<em>' + pName1 + '</em> vs <em>' + pName2 + '</em>';

        if (winner == '') {
            dgi('infobox').innerHTML += '<center>Game ended in draw.</center>';
        }

        else {
            dgi('infobox').innerHTML += '<center>Winner: <b>' + winner + '</b></center>';
        }

        dgi('infobox').innerHTML += '</div>';

        // after adding a new game record, make sure the div is properly scrolled
        // (like in chatbox or shoutbox)
        dgi('infobox').scrollTop = dgi('infobox').scrollHeight;
    }

    // starts the game
    // it actually sets the color and name values, unchecks all the checked boxes
    function startGame() {
        dgi('playground').style.display = 'block';
        dgi('playoptions').style.display = 'none';

        dgi('p1Name').innerHTML = dgi('p1NameInput').value;
        dgi('p2Name').innerHTML = dgi('p2NameInput').value;

        dgi('playerTurn').innerHTML = pName1 + ' \'s First Move';
        dgi('p1Color').style.backgroundColor = dgi('p1ColorInput').value;
        dgi('p2Color').style.backgroundColor = dgi('p2ColorInput').value;

        for (i = 1; i <= 9; i++) {
            dgi('box' + i).style.backgroundColor = '#FFF';
            dgi('inp' + i).value = '';
            dgi('inp' + i).disabled = false;
            dgi('inp' + i).checked = false;
            dgi('box' + i).style.border = '1px solid #999';
        }

        dgi('box1').style.borderLeft = dgi('box1').style.borderTop = dgi('box2').style.borderTop = dgi('box3').style.borderTop = dgi('box3').style.borderRight = dgi('box4').style.borderLeft = dgi('box3').style.borderTop = dgi('box6').style.borderRight = dgi('box7').style.borderLeft = dgi('box7').style.borderBottom = dgi('box8').style.borderBottom = dgi('box9').style.borderBottom = dgi('box9').style.borderRight = 'none';

        turn = 1;
    }

    // resets the game 
    // this function is called as soon as the page is loaded.
    // it sets all the un-initialized variables with default values
    function resetGame() {
        pColor0 = '#FFF';
        pColor1 = '#CCCCFF';
        pColor2 = '#CCFFCC';

        pName1 = 'Player One';
        pName2 = 'Player Two';

        turn = 0;

        dgi('playground').style.display = 'none';
        dgi('playoptions').style.display = 'block';

        for (i = 1; i <= 9; i++) {
            dgi('box' + i).style.backgroundColor = '#FFF';
            dgi('inp' + i).value = '';
            dgi('inp' + i).disabled = false;
            dgi('inp' + i).checked = false;
            dgi('box' + i).style.border = '1px solid #CCC';
        }
    }

    // swaps the values of players' names and colors
    // uses simple trick: [ dummyVariable c = a, a = b, b = c ] technique of swapping
    function swapValues() {
        a = dgi('p1NameInput').value;
        pName1 = dgi('p1NameInput').value = dgi('p2NameInput').value;
        pName2 = dgi('p2NameInput').value = a;

        a = dgi('p1ColorInput').value;
        pColor1 = dgi('p1ColorInput').value = dgi('p2ColorInput').value;
        pColor2 = dgi('p2ColorInput').value = a;
    }

    // clears the record by replacing the 'Game records' div with nothing but a header and a button
    function clearRecords() {
        dgi('infobox').innerHTML = '<h2>Game Records</h2><button onClick="clearRecords();">Clear Records</button>';
    }
}
