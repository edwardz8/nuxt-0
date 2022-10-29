import { defineComponent, h, PropType } from 'vue'

import { PolarArea } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale)

export default defineComponent({
    name: 'PolarAreaChart',
    components: {
        PolarArea
    },
    props: {
        chartId: {
            type: String,
            default: 'polar-chart'
        },
        width: {
            type: Number,
            default: 320
        },
        height: {
            type: Number,
            default: 320
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object as PropType<Partial<CSSStyleDeclaration>>,
            default: () => { }
        },
        plugins: {
            type: Array as PropType<Plugin<'polarArea'>[]>,
            default: () => []
        },
        stats: {
            type: Array,
            default: () => []
        },
        labels: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const chartData = {
            labels: [
                'cargo',
                'cost',
                'crew',
                'passengers',
                ...props.labels
            ],
            datasets: [
                {
                    label: 'Specs',
                    backgroundColor: [
                        'orange', 'red', 'green', 'orangered'
                    ],
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [
                        props.stats?.cargo_capacity,
                        props.stats?.cost_in_credits,
                        props.stats?.crew,
                        props.stats?.passengers,
                        props.stats
                    ]
                },

            ]
        }

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false
        }

        return () =>
            h(PolarArea, {
                chartData,
                chartOptions,
                chartId: props.chartId,
                width: props.width,
                height: props.height,
                cssClasses: props.cssClasses,
                styles: props.styles,
                plugins: props.plugins
            })
    }
})