import React from 'react';
import ReactECharts from 'echarts-for-react';

function Bar(props) {
    const getOption = () => {
        return {
            title: {
                text: '柱状图'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ['三星', '华为', '苹果', 'oppo', 'vivo', '小米']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [150, 230, 224, 218, 135, 147, 260],
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

export default Bar;