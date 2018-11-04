import React, { Component } from 'react';

class Next extends Component {
    pixel(data) {
        const result = [];

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

        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                result.push(<div className={pixelName(data[i][j])} style={{ top: i * 20, left: j * 20 }} key={i * 10 + j}></div>)
            }
        }
        return result;
    }

    render() {
        return (
            <div className={'next'} id={'local_next'}>
                {this.pixel(this.props.nextData.data)}
            </div>
        );
    }
}

export default Next;