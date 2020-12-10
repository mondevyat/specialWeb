var View = function() { 
    this.canvas = document.querySelector(".canvas");
    this.canvas.setAttribute('width', GAME_FIELD_SIZE * 50);
    this.canvas.setAttribute('height', GAME_FIELD_SIZE * 50);
    this.score = document.querySelector(".gameResult");
    this.context = this.canvas.getContext("2d");
    this.onClickEvent = null;
};

View.prototype.init = function() {
    document.addEventListener("keydown", this.onClickEvent);
};

View.prototype.render = function(objs) {

    const fieldSprite = new Image();
    fieldSprite.src = "field.png";
    const mineSprite = new Image();
    mineSprite.src = "mine.png";
    const flagSprite = new Image();
    flagSprite.src = "flag.png";
    const numberSprite = new Image();
    numberSprite.src = "number.png";

    const offsetX = offsetY = 48;
    console.log(objs.bombs);
    if (!objs.isMapCreated)
    {
        var posY = 1;
        for (var i = 0; i < GAME_FIELD_SIZE; i++) 
        {
            var posX = 1;
            for (var j = 0; j < GAME_FIELD_SIZE; j++)
            {
                objs.mas[i][j] = {posX, posY, offsetX, offsetY, isBomb: false, isChecked : false, isFlagged: false};
                for (var k = 0; k < objs.bombs.length; k++)
                {
                    if ( (objs.bombs[k].x >= posX && objs.bombs[k].x <= posX + offsetX) &&
                         (objs.bombs[k].y >= posY && objs.bombs[k].y <= posY + offsetY))
                    { 
                        objs.mas[i][j].isBomb = true;
                    }
                }
                if (objs.mas[i][j].isBomb == true)
                {
                    this.context.fillStyle = 'red';
                }
                else if (objs.mas[i][j].isBomb == false) { this.context.fillStyle = 'lightgray'; }

                this.context.fillRect(posX, posY, offsetX, offsetY);

                console.log(objs.mas[i][j]);
                posX += 50;
            }
            posY += 50;
        }
        objs.isMapCreated = true;
    }

    for (var i = 0; i < GAME_FIELD_SIZE; i++) 
    {
        for (var j = 0; j < GAME_FIELD_SIZE; j++)
        {
            if (objs.isGameEnded && objs.mas[i][j].isBomb)
            {
                this.renderSprite(mineSprite, objs.mas[i][j].posX, objs.mas[i][j].posY);
                console.log("Проиграл");
                document.querySelector(".gameResult").innerHTML = 'ВЫ ПРОИГРАЛИ!';
            }   
            else if (!objs.mas[i][j].isBomb && objs.mas[i][j].isChecked && !objs.isGameEnded)
            {
                this.renderSprite(numberSprite, objs.mas[i][j].posX, objs.mas[i][j].posY);
                document.querySelector(".gameResult").innerHTML = 'СЧЁТ: ' + objs.score;
            }
            else if (objs.mas[i][j].isFlagged && !objs.isGameEnded)
            {
                this.renderSprite(flagSprite, objs.mas[i][j].posX, objs.mas[i][j].posY);
            }
            else if (!objs.mas[i][j].isFlagged && !objs.mas[i][j].isBomb && !objs.isGameEnded)
            {
                this.context.fillStyle = 'lightgray';
                this.context.fillRect(objs.mas[i][j].posX, objs.mas[i][j].posY, objs.mas[i][j].offsetX, objs.mas[i][j].offsetY);
            }
            else if (!objs.mas[i][j].isFlagged && objs.mas[i][j].isBomb && !objs.mas[i][j].isChecked && !objs.isGameEnded)
            {
                this.context.fillStyle = 'red';
                this.context.fillRect(objs.mas[i][j].posX, objs.mas[i][j].posY, objs.mas[i][j].offsetX, objs.mas[i][j].offsetY);
            }
        }
    }


    // this.context.fillRect(1, 1, 48, 48);
    // this.context.fillRect(51, 1, 48, 48);
    // this.context.fillRect(101, 1, 48, 48);
    // this.context.fillRect(151, 1, 48, 48);
    // this.context.fillRect(201, 1, 48, 48);
    // this.context.fillRect(251, 1, 48, 48);
    // this.context.fillRect(301, 1, 48, 48);
    // this.context.fillRect(351, 1, 48, 48);
    // this.context.fillRect(401, 1, 48, 48);
    // this.context.fillRect(451, 1, 48, 48);

    // this.context.fillRect(1, 51, 48, 48);
    // this.context.fillRect(51, 51, 48, 48);
    // this.context.fillRect(101, 51, 48, 48);
    // this.context.fillRect(151, 51, 48, 48);
    // this.context.fillRect(201, 51, 48, 48);
    // this.context.fillRect(251, 51, 48, 48);
    // this.context.fillRect(301, 51, 48, 48);
    // this.context.fillRect(351, 51, 48, 48);
    // this.context.fillRect(401, 51, 48, 48);
    // this.context.fillRect(451, 51, 48, 48);

    // this.context.fillRect(1, 101, 48, 48);
    // this.context.fillRect(51, 101, 48, 48);
    // this.context.fillRect(101, 101, 48, 48);
    // this.context.fillRect(151, 101, 48, 48);
    // this.context.fillRect(201, 101, 48, 48);
    // this.context.fillRect(251, 101, 48, 48);
    // this.context.fillRect(301, 101, 48, 48);
    // this.context.fillRect(351, 101, 48, 48);
    // this.context.fillRect(401, 101, 48, 48);
    // this.context.fillRect(451, 101, 48, 48);

   
}

View.prototype.renderSprite = function (sprite, x, y) {
    this.context.save();
    this.context.drawImage(sprite, x, y);
    this.context.restore();
}

var minesweeperView = new View();