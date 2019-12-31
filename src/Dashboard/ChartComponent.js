import React, { Component } from 'react';
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

export default class ChartComponent extends Component {
    render() {
        // const data = [
        //     {"name":"Workout", "data": {"2017-01-01": 3, "2017-01-02": 4}},
        //     {"name":"Call parents", "data": {"2017-01-01": 5, "2017-01-02": 3}}
        //   ];
        return (
            <div>
                <LineChart
                data={{ "2017-01-01": 11, "2017-01-02": 6, "2017-01-03": 20, "2017-01-20": 6 }}
                // data={data}
                discrete={true}
                // label="value"
                xtitle="Time" ytitle="Amount"
                curve={false}
                // legend={true}
                prefix="$"
                thousands=","
                library={{backgroundColor: "#eee"}} />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}