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
    canvas = document.querySelector(".canvas");
    canvas.addEventListener("mousedown",
            (event)=>{
                var x = event.offsetX;
                var y = event.offsetY;
                console.log(x, y);
                this.minesweeperModel.clickCell(event.which, x, y);
            });
};

var minesweeperController = new Controller(minesweeperView, minesweeperModel);
minesweeperController.init();