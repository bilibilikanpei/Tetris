import React, { Component } from 'react';
import { connect } from 'react-redux';

//引入组件
import Game from '../Game';
import Next from '../Next';
import Info from '../Info';
//引入动作
import Actions from '../../redux/action';

const INTERVAL = 300;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offId: -1,//游戏开关
            time: 0,//游戏时间
            timerId: -1
        }
    }
    a = () => {
        console.log(this.props.store.getState())
    }
    toggle = () => {
        if (this.state.offId === -1) {
            this.setState({
                offId: this.interval(),//游戏循环
                timerId: this.timer()
            })
        } else {
            clearInterval(this.state.offId);
            clearInterval(this.state.timerId);
            this.setState({
                offId: -1,
                timerId: -1
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <div>请用方向键和空格键进行操作：上-旋转，左-左移，右-右移，下-下移，空格-坠落</div>
                <div className={"square"} id={"local"}>
                    <div className={"title"}>我的游戏区域</div>
                    <Game gameData={this.props.gameData} curData={this.props.curData}></Game>
                    <Next nextData={this.props.nextData}></Next>
                    <Info time={this.state.time} score={this.props.gameData.score} mes={this.props.gameData.mes}></Info>
                </div>
                <button onClick={this.a}>查看state</button>
                <button onClick={this.toggle}>游戏开关</button>
            </React.Fragment>
        );
    }

    componentDidMount() {
        document.onkeydown = this.bindEeyEvent;//可以的话不用绑定在这里
        // this.setState({
        //     offId: this.props.start(),
        //     timerId: this.timer()
        // })
    }
    componentWillUnmount() {
        document.onkeydown = null;
        clearInterval(this.state.offId);
        clearInterval(this.state.timerId);
    }

    bindEeyEvent = (e) => {
        switch (e.keyCode) {
            case 38://up
                this.props.rotate();
                break;
            case 39://right
                this.props.right();
                break;
            case 40://down
                this.props.down();
                break;
            case 37://left
                this.props.left();
                break;
            case 32://space
                this.props.fall();
                break;
            default:
        }
    }
    timer = () => {
        return setInterval(() => {
            this.setState({
                time: this.state.time + 1
            })
        }, 1000)
    }
    interval() {
        return setInterval(() => {
            this.props.down();
            if (this.props.gameData.checkGameOver()) {//游戏结束
                this.toggle();
                this.props.gameOver();
            };
        }, INTERVAL);
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(App);

function mapStateToprops(state, ownProps) {
    return {
        gameData: state.gameData,
        curData: state.curData,//遇到问题了 reducer是个纯函数 要遵从这个原则 所以只能是从外界把数据代入
        nextData: state.nextData,
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        rotate: () => {
            let state = ownProps.store.getState();
            if (state.curData.canRotate(state.gameData)) {
                dispatch(Actions.ROTATE);
            }
        },
        right: () => {
            let state = ownProps.store.getState();
            if (state.curData.canRight(state.gameData)) {
                dispatch(Actions.RIGHT);
            }
        },
        down: () => {
            let state = ownProps.store.getState();
            // if (!state.curData.canDown(state.gameData)) {
            //     dispatch(Actions.FIXED);
            //     dispatch(Actions.CHECKCLEAR);
            // }
            if (state.curData.canDown(state.gameData)) {
                dispatch(Actions.DOWN);
            } else {//下不去就是要固定位置了
                dispatch(Actions.FIXED);
                dispatch(Actions.CHECKCLEAR);
            }
        },
        left: () => {
            let state = ownProps.store.getState();
            if (state.curData.canLeft(state.gameData)) {
                dispatch(Actions.LEFT);
            }
        },
        fall: () => {
            let state = ownProps.store.getState();
            dispatch({
                ...Actions.FALL,
                origin: state.curData.fallTo(state.gameData, state.curData.origin.x + 1, state.curData.origin.y)
            });
        },
        gameOver: () => {
            dispatch({
                ...Actions.GAMEOVER,
                mes: '游戏结束'
            })
        }
    }
}