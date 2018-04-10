var SingletonClass = /** @class */ (function () {
    function SingletonClass() {
        this._score = 0;
        if (SingletonClass._instance) {
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        SingletonClass._instance = this;
    }
    SingletonClass.getInstance = function () {
        return SingletonClass._instance;
    };
    SingletonClass.prototype.setScore = function (value) {
        this._score = value;
    };
    SingletonClass.prototype.getScore = function () {
        return this._score;
    };
    SingletonClass.prototype.addPoints = function (value) {
        this._score += value;
    };
    SingletonClass.prototype.removePoints = function (value) {
        this._score -= value;
    };
    SingletonClass._instance = new SingletonClass();
    return SingletonClass;
}());
var scoreManager = SingletonClass.getInstance();
scoreManager.setScore(10);
scoreManager.addPoints(1);
scoreManager.removePoints(2);
console.log(scoreManager.getScore());
