var View = function() { 
    this.myField = document.querySelector(".myField");
    this.score = document.querySelector(".gameResult");
    this.onClickEvent = null;
};

View.prototype.init = function() {
    document.addEventListener("keydown", this.onClickEvent);
};

View.prototype.render = function(objs) {
    if (!objs.isMapCreated)
    {
        for (var i = 0; i < objs.gameField.size; i++)
        {
            for (var j = 0; j < objs.gameField.size; j++)
            {
                var newCell = document.createElement("div");
                for(var k = 0; k < objs.bombs.length; k++)
                {
                    if (i == objs.bombs[k].x && j == objs.bombs[k].y)
                    {
                        newCell.classList.add("bomb");
                    }
                }
                newCell.classList.add("cell");
                //newCell.setAttribute('onclick');
                //newCell.setAttribute('oncontextmenu');
                //newCell.addEventListener("mousedown",
                //        (event)=>console.log("mousedown: " + event.which));
                newCell.id = parseInt(i) + '' + parseInt(j);
                this.myField.appendChild(newCell);
            }
        }
        
        objs.isMapCreated = true;
    }

    for (var i = 0; i < objs.gameField.size; i++)
    {
        for (var j = 0; j < objs.gameField.size; j++)
        {
            for (var k = 0; k < objs.bombs.length; k++)
            {
                if (objs.bombs[k].isExploded)
                {
                    for (var z = 0; z < objs.bombs.length; z++)
                        document.getElementById(objs.bombs[z].x + '' + objs.bombs[z].y).style.backgroundImage = "url('mine.png')";
                    document.getElementById(objs.bombs[k].x + '' + objs.bombs[k].y).style.backgroundColor = "green";
                    document.querySelector(".gameResult").innerHTML = 'ВЫ ПРОИГРАЛИ!';
                    objs.isGameEnded = true;
                }
        
                if (objs.cells[i + '' + j].isChecked && (i + '' + j) != (objs.bombs[k].x + '' + objs.bombs[k].y)
                    && (!objs.isGameEnded))
                {
                    document.getElementById(i + '' + j).style.backgroundColor = "white";
                    document.getElementById(i + '' + j).innerHTML = '1';
                    document.querySelector(".gameResult").innerHTML = 'СЧЁТ: ' + objs.score;
                }
            }

            if (objs.cells[i + '' + j].isFlag && (!objs.isGameEnded))
            {
                document.getElementById(i + '' + j).style.backgroundImage = "url('flag.png')";
            }
            else { document.getElementById(i + '' + j).style.backgroundImage = "none"; }
        }
    }

    console.log(objs.bombs);
}

var minesweeperView = new View();