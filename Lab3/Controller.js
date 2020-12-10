var Controller = function(View, Model) {
    this.minesweeperView = View;
    this.minesweeperModel = Model;
};

Controller.prototype.init = function () {
    this.minesweeperView.onClickEvent = this.clicking.bind(this);
    this.minesweeperView.init();
    this.minesweeperModel.init(this.needRendering.bind(this));
    this.needRendering();
  };

Controller.prototype.needRendering = function () {
    this.minesweeperView.render(minesweeperModel.objs);
};

Controller.prototype.clicking = function (e) {
    for (var i = 0; i < this.minesweeperModel.objs.gameField.size; i++)
    {
        for (var j = 0; j < this.minesweeperModel.objs.gameField.size; j++)
        {
            idOfCell = document.getElementById(parseInt(i) + '' + parseInt(j));
            idOfCell.addEventListener("mousedown",
                        (event)=>{
                            //console.log(event.path[0].id);
                            this.minesweeperModel.clickCell(event.which, event.path[0].id);
                        });
        }
    }

    //this.minesweeperModel.clickCell(e);
};

var minesweeperController = new Controller(minesweeperView, minesweeperModel);
minesweeperController.init();