import React, { Component } from 'react';

class Info extends Component {
    render() {
        return (
            <div className={'info'}>
                <div>已用时：<span id="local_time">{this.props.time}</span>s</div>
                <div>已得分：<span id="local_score">{this.props.score}</span>分</div>
                <div id="local_gameOver">{this.props.mes}</div>
            </div>
        );
    }
}

export default Info;