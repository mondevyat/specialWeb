const GAME_FIELD_SIZE = 10;

var Model = function() {
	this.objs = {
		bombs: [
			{
			   x: parseInt(Math.random() * (GAME_FIELD_SIZE*50 - 1) + 1),
			   y: parseInt(Math.random() * (GAME_FIELD_SIZE*50 - 1) + 1),
			   isExploded: false
			},
			{
			   x: parseInt(Math.random() * (GAME_FIELD_SIZE*50 - 1) + 1),
			   y: parseInt(Math.random() * (GAME_FIELD_SIZE*50 - 1) + 1),
			   isExploded: false
			},
		],
		score: 0,
		cells: [],
		mas: [],
		flagCounter: 0,
		isMapCreated: false,
		isGameEnded: false,
		trigger: -1
	};
}

Model.prototype.init = function(renderFunc) { // + положение в массиве, убрать x, y и if'ы
	this.needRendering = renderFunc;
	
	for( var i = 0; i < GAME_FIELD_SIZE; i++ )
         this.objs.mas[i] = [{posX: 0, posY: 0, offsetX: 0, offsetY: 0, isBomb: false, isChecked: false, isFlagged: false}];
};

Model.prototype.getBombs = function (obj) {
    return {
     bombs: obj.bombs
    };
};

Model.prototype.setBombs = function(obj, x, y) {
	for (var bomb in obj)
	{
		bomb.x = Math.random() * (9 - 0) + 0;
		bomb.y = Math.random() * (9 - 0) + 0;
	}
	this.needRendering();
};

Model.prototype.getCoordinates = function (x, y)  {
	return {
		eventX: x,
		eventY: y
	}
}

Model.prototype.clickCell = function (e, x, y) { 
    switch (e) {
      case 1: {
		console.log("левая");
		for (var i = 0; i < GAME_FIELD_SIZE; i++) 
		{
			for (var j = 0; j < GAME_FIELD_SIZE; j++)
			{
				if ( (x >= this.objs.mas[i][j].posX && x <= this.objs.mas[i][j].posX + this.objs.mas[i][j].offsetX) &&
					 (y >= this.objs.mas[i][j].posY && y <= this.objs.mas[i][j].posY + this.objs.mas[i][j].offsetY) &&
					 !this.objs.mas[i][j].isChecked && !this.objs.mas[i][j].isBomb)
				{
					this.objs.mas[i][j].isChecked = true;
					this.objs.score++;
					console.log("КЛЕТКА №" + parseInt(i) + '' + parseInt(j));
				}
				else if ( (x >= this.objs.mas[i][j].posX && x <= this.objs.mas[i][j].posX + this.objs.mas[i][j].offsetX) &&
					 	(y >= this.objs.mas[i][j].posY && y <= this.objs.mas[i][j].posY + this.objs.mas[i][j].offsetY) &&
					 	this.objs.mas[i][j].isBomb && !this.objs.mas[i][j].isChecked)
				{
					this.objs.isGameEnded = true;
					console.log("КЛЕТКА №" + parseInt(i) + '' + parseInt(j));
					console.log(this.objs.isGameEnded);
				}
			}
		}
		this.needRendering();
        break;
      }
      case 3: {
		console.log("правая");
		for (var i = 0; i < GAME_FIELD_SIZE; i++) 
		{
			for (var j = 0; j < GAME_FIELD_SIZE; j++)
			{
				if ( (x >= this.objs.mas[i][j].posX && x <= this.objs.mas[i][j].posX + this.objs.mas[i][j].offsetX) &&
					 (y >= this.objs.mas[i][j].posY && y <= this.objs.mas[i][j].posY + this.objs.mas[i][j].offsetY) 
					  && (!this.objs.mas[i][j].isChecked) )
				{
					if (this.objs.mas[i][j].isFlagged == false && this.objs.flagCounter < 5)
					{
						this.objs.flagCounter++;
						this.objs.mas[i][j].isFlagged = true;
						console.log("флажок поставлен " + this.objs.flagCounter);
						this.needRendering();
					}
					else if (this.objs.mas[i][j].isFlagged == true && this.objs.flagCounter > 0) {
						this.objs.flagCounter--;
						this.objs.mas[i][j].isFlagged = false;
						console.log("флажок убран " + this.objs.flagCounter);
						this.needRendering();
					}
					console.log("КЛЕТКА №" + parseInt(i) + '' + parseInt(j));
				}
			}
		}
		this.needRendering();
        break;
      }
    }
 };

const minesweeperModel = new Model();