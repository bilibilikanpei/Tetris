import makeModel from './makeModel';


//数据与视图分离
//这里Square将完全只是数据，存储在state中，对于数据的变化，则定义在类中
//每个类方法将返回this
export default class Square {
    constructor(...list) {

        if (list.length === 0 || list.length === 2) {
            //处理情况一：
            var [squareType, dir] = list;
            squareType = squareType || squareType === 0 ? squareType : Math.ceil(Math.random() * 7) - 1;
            dir = dir || dir === 0 ? dir : Math.ceil(Math.random() * 4) - 1;
            this.data = makeModel(squareType, dir)//图形面板
            this.origin = {//面板相对屏幕位置
                x: 0,
                y: 3
            };
            this.dir = dir;//选择哪个方向的s
            this.squareType = squareType;//第几张图也保存下来
        } else if (list.length === 1 && list[0] instanceof Square) {
            //处理情况二：返回一个和输入实例相同属性的新实例
            var [square] = list;
            this.dir = square.dir;
            this.squareType = square.squareType;
            this.data = square.data;
            this.origin = {//这样返回的对象与原来的不是同一个
                ...square.origin
            };
        }
    }

    canRotate(gameData) {
        var d = (this.dir + 1) % 4;
        var test = makeModel(this.squareType, d);
        return this.isVaildData(this.origin, gameData, test);
    }
    rotate(num) {
        if (!num) num = 1;
        let newData = new Square(this);
        newData.dir = (this.dir + num) % 4;
        newData.data = makeModel(this.squareType, newData.dir);
        return newData;
    }
    canDown(gameData) {
        return this.isVaildData(
            {
                x: this.origin.x + 1,
                y: this.origin.y
            }, gameData);
    }
    down() {//不能修改原来实例
        let newData = new Square(this);
        newData.origin.x = this.origin.x + 1;
        return newData;
    }
    fallTo(gameData, x, y) {
        if (this.isVaildData(
            {
                x: x,
                y: y
            }, gameData)) {
            return this.fallTo(gameData, x + 1, y)
        } else {
            return { x: x - 1, y };
        }
    }
    fall(origin) {
        this.origin = origin;
        return new Square(this);
    }

    canLeft(gameData) {
        return this.isVaildData(
            {
                x: this.origin.x,
                y: this.origin.y - 1
            }, gameData);
    }
    left() {
        let newData = new Square(this);
        newData.origin.y = this.origin.y - 1;
        return newData;
    }
    canRight(gameData) {
        return this.isVaildData(
            {
                x: this.origin.x,
                y: this.origin.y + 1
            }, gameData);
    }
    right() {
        let newData = new Square(this);
        newData.origin.y = this.origin.y + 1;
        return newData;
    }
    isVaildData(origin, gameData, test) {//图形上的有效像素
        function check(x, y) {
            if (origin.x + x < 0) {
                return false;
            } else if (origin.x + x >= gameData.Xlen) {
                return false;
            } else if (origin.y + y < 0) {
                return false;
            } else if (origin.y + y >= gameData.Ylen) {
                return false;
            } else if (gameData.data[origin.x + x][origin.y + y] === 1) {
                return false;
            } else {
                return true;
            }
        }
        let data = test ? test : this.data;
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[0].length; j++) {
                if (data[i][j] !== 0 && !check(i, j)) {//只会有四个点进入这里
                    return false;
                }
            }
        }
        return true;
    }
}