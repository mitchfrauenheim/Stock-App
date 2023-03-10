import { ResponsivePie } from '@nivo/pie'

const commonProperties = {
    // width: 130,
    height: 130,
    margin: { top: 5, right: 5, bottom: 5, left: 5},
    animate: true,
    activeOuterRadiusOffset: 4,
}

const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total = 0
    dataWithArc.forEach(datum => {
        console.log(datum.value)
        total += parseInt(datum.value)
    })

    return (
        <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
                fontSize: '18px',
                fontWeight: 600,
            }}
        >
            ${total.toLocaleString('en-US')}
        </text>
    )
}

const PersonalPie = ({ data }) => (
    <ResponsivePie 
        data={data}
        {...commonProperties}
        innerRadius={0.85}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        colors={{ datum: 'data.color' }}
        tooltip={() => (<></>)}
        layers={['arcs', CenteredMetric]}
        // legends={[
        //     {
        //         anchor: 'bottom',
        //         direction: 'row',
        //         justify: false,
        //         translateX: 0,
        //         translateY: 5,
        //         itemWidth: 50,
        //         itemHeight: 0,
        //         itemDirection: 'left-to-right',
        //         symbolShape: 'circle'
        //     }
        // ]}
    />
)

export default PersonalPie;