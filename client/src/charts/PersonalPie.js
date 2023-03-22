import { ResponsivePie } from '@nivo/pie'

const commonProperties = {
    // width: 130,
    height: 130,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    animate: true,
    activeOuterRadiusOffset: 4,
}

const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total = 0
    dataWithArc.forEach(datum => {
        // console.log(datum.value)
        total += Number(datum.value)
    })

    // total

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
            {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </text>
    )
}

const PersonalPie = ({ data }) => (
    <ResponsivePie
        data={data.stocks}
        {...commonProperties}
        innerRadius={0.85}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        // colors={{ datum: 'data.color' }}
        colors={["#FDAB00", "#F4508D", "#516CF7", "#56C1B9", "#D1D5DB"]}
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