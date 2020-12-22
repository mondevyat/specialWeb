const GAME_FIELD_SIZE = 5;
const GAME_SELL_SIZE = 50;

var Model = function() {
	this.objs = {
		bombs: [
			{
			   x: parseInt(Math.random() * (GAME_FIELD_SIZE)),
			   y: parseInt(Math.random() * (GAME_FIELD_SIZE)),
			   isExploded: false
			},
			{
			   x: parseInt(Math.random() * (GAME_FIELD_SIZE)),
			   y: parseInt(Math.random() * (GAME_FIELD_SIZE)),
			   isExploded: false
			},
		],
		score: 0,
		cells: [],
		mas: [],
		flagCounter: 0,
		isMapCreated: false,
		isGameEnded: false
	};
}

Model.prototype.init = function(renderFunc) {
	this.needRendering = renderFunc;
    
	for( var i = 0; i < GAME_FIELD_SIZE; i++ )
	{
		this.objs.mas[i] = [];
		for (var j = 0; j < GAME_FIELD_SIZE; j++) {
			this.objs.mas[i][j] = {posX: 0, posY: 0, offsetX: 0, offsetY: 0, isBomb: false, isChecked: false, isFlagged: false};
			for (var k = 0; k < this.objs.bombs.length; k++)
    		{
    		    if ( (this.objs.bombs[k].x === i && this.objs.bombs[k].y === j))
    		    { 
    		        this.objs.mas[i][j].isBomb = true;
    		    }
    		}
		}
	}
};

Model.prototype.clickCell = function (e, i, j) { 
    switch (e) {
      case 1: {
		console.log("левая");
		if (!this.objs.mas[i][j].isChecked && !this.objs.mas[i][j].isBomb)
		{
			this.objs.mas[i][j].isChecked = true;
			this.objs.score++;
			console.log("КЛЕТКА №" + parseInt(i) + '' + parseInt(j));
		}
		else if (this.objs.mas[i][j].isBomb && !this.objs.mas[i][j].isChecked)
		{
			this.objs.isGameEnded = true;
			console.log("КЛЕТКА №" + parseInt(i) + '' + parseInt(j));
			console.log(this.objs.isGameEnded);
		}
		this.needRendering();
        break;
      }
      case 3: {
		console.log("правая");
		
		if ( (!this.objs.mas[i][j].isChecked) )
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
		this.needRendering();
        break;
      }
    }
 };

const minesweeperModel = new Model();
