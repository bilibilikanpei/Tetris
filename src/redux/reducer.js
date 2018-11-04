import Square from '../square/index';
import GameData from '../gameData';
import Actions from './action';

//原始数据
const INITDATA = {
    gameData: new GameData(),
    curData: new Square(),
    nextData: new Square(),
}
export default (state, action) => {
    switch (action.type) {
        case Actions.DOWN.type://下移
            return {
                ...state,
                curData: state.curData.down(),
            }
        case Actions.LEFT.type://左移
            return {
                ...state,
                curData: state.curData.left()
            }
        case Actions.RIGHT.type://右移
            return {
                ...state,
                curData: state.curData.right()
            }
        case Actions.ROTATE.type://旋转
            return {
                ...state,
                curData: state.curData.rotate()
            }
        case Actions.FALL.type://下坠
            return {
                ...state,
                curData: state.curData.fall(action.origin)
            }
        case Actions.FIXED.type://固定 把curData的数据改为1 把curData的数据移动到gameData上 生成新的curData和nextData
            return {
                ...state,
                gameData: state.gameData.combine(state.curData),
                curData: state.nextData,
                nextData: new Square()
            }
        case Actions.CHECKCLEAR.type:
            return {
                ...state,
                gameData: state.gameData.checkClear()
            }
        case Actions.GAMEOVER.type:
            return {
                ...state,
                gameData: {
                    ...state.gameData,
                    mes: action.mes
                }
            }
        default:
            return INITDATA;
    }
}

