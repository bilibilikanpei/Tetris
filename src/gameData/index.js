export default class GameData {
    constructor(GameData) {
        if (!GameData) {//不传参初始化
            this.data = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ];
            this.score = 0;//得分记录在此
        } else {
            this.data = JSON.parse(JSON.stringify(GameData.data));//使用json的解析/反解析生成一个新的对象 对象中无fun undefined类型
            this.score = GameData.score;
        }
        this.Xlen = this.data.length;
        this.Ylen = this.data[0].length;
        this.mes = '加油';

    }
    combine(curData) {
        let newGameData = new GameData(this);
        for (let i = 0; i < curData.data.length; i++) {
            for (let j = 0; j < curData.data[0].length; j++) {
                if (curData.data[i][j] !== 0) {//既然都要合并 就在curData上有效的位置都在Gamedata上设置为1
                    newGameData.data[curData.origin.x + i][curData.origin.y + j] = 1
                }
            }
        }
        return newGameData;
    }

    checkClear() {
        let newGameData = new GameData(this);
        var line = 0, clear = true;
        for (let i = this.Xlen - 1; i >= 0; i--) {
            clear = true;
            for (let j = 0; j < this.Ylen; j++) {
                if (newGameData.data[i][j] !== 1) {//这里要取新数据
                    clear = false;
                    break;
                }
            }
            if (clear) {
                line++;
                newGameData.data.splice(i, 1);
                newGameData.data.unshift(Array(this.Ylen).fill(0));
                i++
            }
        }
        newGameData.score = this.addScore(line);
        return newGameData;
    }
    addScore(line) {
        switch (line) {
            case 1:
                return this.score + 10;
            case 2:
                return this.score + 30;
            case 3:
                return this.score + 60;
            case 4:
                return this.score + 100;
            default:
                return this.score;
        }
    }
    checkGameOver() {//查找序号第一行是否又为1的像素 返回true
        return this.data[1].some(function (item, index, arr) {
            return item === 1;
        })
        // } else {
        //     return ['加油', '再快一点', '快要碰顶了！'][Math.floor(Math.random() * 3)];
        // }
    }
}