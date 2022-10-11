import React from 'react';
import ReactECharts from "echarts-for-react";

function pie(props) {

    const getOption = () => {
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 150, name: '三星' },
                        { value: 230, name: '华为' },
                        { value: 224, name: '苹果' },
                        { value: 218, name: 'oppo' },
                        { value: 147, name: 'vivo' },
                        { value: 260, name: '小米' },
                    ]
                }
            ]
        };
    }
    return (
        <div>
            <ReactECharts option={getOption()} style={{height:750, width: 1920}} />
        </div>
    );
}

export default pie;