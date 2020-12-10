const GAME_FIELD_SIZE = 10;
//const MINE_COUNT = 1;

var Model = function() {
	this.objs = {
		gameField: {
			size: GAME_FIELD_SIZE,
			//mine: MINE_COUNT,
		},
		bombs: [
			{
			   x: parseInt(Math.random() * (9 - 0) + 0),
			   y: parseInt(Math.random() * (9 - 0) + 0),
			   isExploded: false
			},
			{
			   x: parseInt(Math.random() * (9 - 0) + 0),
			   y: parseInt(Math.random() * (9 - 0) + 0),
			   isExploded: false
			},
		],
		score: 0,
		cells: [],
		flagCounter: 0,
		isMapCreated: false,
		isGameEnded: false
	};
}

Model.prototype.init = function(renderFunc) {
	this.needRendering = renderFunc;
	
	for (var i = 0; i < this.objs.gameField.size; i++)
    {
        for (var j = 0; j < this.objs.gameField.size; j++)
		{
			this.objs.cells[i + '' + j] = {x: i, y: j, isFlag: false, isChecked: false};
		}
	}
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

Model.prototype.clickCell = function (e, cellId) {
    switch (e) {
      case 1: {
		for (var i = 0; i < this.objs.bombs.length; i++)
    	{
			if (this.objs.bombs[i].x + '' + this.objs.bombs[i].y === cellId)
			{
				this.objs.bombs[i].isExploded = true;
				this.objs.bombs[i].isGameEnded = true;
			}
			else
			{
				for (var j = 0; j < this.objs.gameField.size; j++)
				{
					for (var k = 0; k < this.objs.gameField.size; k++)
					{
						if (cellId != this.objs.bombs[i].x + '' + this.objs.bombs[i].y && 
							!this.objs.cells[cellId].isFlag && !this.objs.cells[cellId].isChecked)
						{
							this.objs.cells[cellId].isChecked = true;
							console.log(this.objs.cells[cellId].isChecked);
							this.objs.score++;
						}
					}
				}
			}
		}
		this.needRendering();

        break;
      }
      case 3: {
		//console.log(this.objs.cells);
		for (var i = 0; i < this.objs.gameField.size; i++)
    	{
        	for (var j = 0; j < this.objs.gameField.size; j++)
			{
				if (!this.objs.cells[i + '' + j].isChecked)
				{
					if (this.objs.cells[i + '' + j].x + '' + this.objs.cells[i + '' + j].y === cellId)
					{
						if (this.objs.cells[i + '' + j].isFlag == false && this.objs.flagCounter < 5)
						{
							this.objs.flagCounter++;
							this.objs.cells[i + '' + j].isFlag = true;
							console.log("флажок поставлен " + this.objs.flagCounter);
							this.needRendering();
						}
						else if (this.objs.cells[i + '' + j].isFlag == true && this.objs.flagCounter > 0) {
							this.objs.flagCounter--;
							this.objs.cells[i + '' + j].isFlag = false;
							console.log("флажок убран " + this.objs.flagCounter);
							this.needRendering();
						}
					}
				}
			}
		}
        break;
      }
    }
 };

const minesweeperModel = new Model();