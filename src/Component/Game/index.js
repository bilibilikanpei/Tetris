import React, { Component } from 'react';

class Game extends Component {
    pixel(gameData, curData) {//渲染每个像素点
        var oriX = curData.origin.x,
            oriY = curData.origin.y;
        const result = [];

        for (let i = 0; i < gameData.Xlen; i++) {
            for (let j = 0; j < gameData.Ylen; j++) {
                if (oriX <= i && i < oriX + curData.data.length) {
                    if (oriY <= j && j < oriY + curData.data[0].length) {
                        if (curData.data[i - oriX][j - oriY] !== 0) {
                            result.push(<div className={pixelName(curData.data[i - oriX][j - oriY])} style={{ top: i * 20, left: j * 20 }} key={i * 10 + j}></div>)
                            continue;
                        }
                    }
                }
                result.push(<div className={pixelName(gameData.data[i][j])} style={{ top: i * 20, left: j * 20 }} key={i * 10 + j}></div>)
            }
        }
        function pixelName(n) {
            switch (n) {
                case 0:
                    return 'none';
                case 1:
                    return 'done';
                case 2:
                    return 'current';
                default:
                    return ''
            }
        }
        return result;
    }

    check(pos, x, y) {
        if (pos.x + x < 0) {
            return false;
        } else if (pos.x + x >= this.props.gameData.Xlen) {
            return false;
        } else if (pos.y + y < 0) {
            return false;
        } else if (pos.y + y >= this.props.gameData.Ylen) {
            return false;
        } else if (this.props.gameData.data[pos.x + x][pos.y + y] === 1) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className={'game'} id={'local_game'}>
                {
                    this.pixel(this.props.gameData, this.props.curData)
                }
            </div>
        );
    }
}

export default Game;