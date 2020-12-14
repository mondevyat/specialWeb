var View = function() { 
    this.canvas = document.querySelector(".canvas");
    this.canvas.setAttribute('width', GAME_FIELD_SIZE * GAME_SELL_SIZE);
    this.canvas.setAttribute('height', GAME_FIELD_SIZE * GAME_SELL_SIZE);
    this.score = document.querySelector(".gameResult");
    this.context = this.canvas.getContext("2d");
    this.onClickEvent = null;
    this.arrayView = [];
    for( var i = 0; i < GAME_FIELD_SIZE; i++ )
         this.arrayView[i] = [{posX: 0, posY: 0, offsetX: 0, offsetY: 0}];

};

View.prototype.init = function() {
    document.addEventListener("keydown", this.onClickEvent);
};

View.prototype.leftClick = function(x, y) {
    for (var i = 0; i < GAME_FIELD_SIZE; i++) 
	{
		for (var j = 0; j < GAME_FIELD_SIZE; j++)
		{
			if ( (x >= this.arrayView[i][j].posX && x <= this.arrayView[i][j].posX + this.arrayView[i][j].offsetX) &&
				 (y >= this.arrayView[i][j].posY && y <= this.arrayView[i][j].posY + this.arrayView[i][j].offsetY))
			{
				return [i,j];
			}
			else if ( (x >= this.arrayView[i][j].posX && x <= this.arrayView[i][j].posX + this.arrayView[i][j].offsetX) &&
				 	(y >= this.arrayView[i][j].posY && y <= this.arrayView[i][j].posY + this.arrayView[i][j].offsetY))
			{
				return [i,j];
			}
		}
    }
}

View.prototype.render = function(objs) {

    const fieldSprite = new Image();
    fieldSprite.src = "field.png";
    const mineSprite = new Image();
    mineSprite.src = "mine.png";
    const flagSprite = new Image();
    flagSprite.src = "flag.png";
    const numberSprite = new Image();
    numberSprite.src = "number.png";

    const offsetX = offsetY = GAME_SELL_SIZE - GAME_SELL_SIZE/25;
    console.log(objs.bombs);
    if (!objs.isMapCreated)
    {
        var posY = 1;
        for (var i = 0; i < GAME_FIELD_SIZE; i++) 
        {
            var posX = 1;
            for (var j = 0; j < GAME_FIELD_SIZE; j++)
            {
                this.arrayView[i][j] = {posX, posY, offsetX, offsetY};
                
                if (objs.mas[i][j].isBomb == true)
                {
                    this.context.fillStyle = 'red';
                }
                else if (objs.mas[i][j].isBomb == false) { this.context.fillStyle = 'lightgray'; }

                this.context.fillRect(posX, posY, offsetX, offsetY);

                console.log(objs.mas[i][j]);
                posX += GAME_SELL_SIZE;
            }
            posY += GAME_SELL_SIZE;
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
}

View.prototype.renderSprite = function (sprite, x, y) {
    this.context.save();
    this.context.drawImage(sprite, x, y, GAME_SELL_SIZE, GAME_SELL_SIZE);
    this.context.restore();
}

var minesweeperView = new View();
