import React from 'react';
import ReactECharts from "echarts-for-react";

function Line(props) {

    const getOption = () => {
        return {
            title: {
                text: '折线图'
            },
            xAxis: {
                type: 'category',
                data: ['三星', '华为', '苹果', 'oppo', 'vivo', '小米']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        };
    }
    return (
        <div>
            <ReactECharts option={getOption()} style={{height:500, width: 1920}} />
        </div>
    );
}

export default Line;