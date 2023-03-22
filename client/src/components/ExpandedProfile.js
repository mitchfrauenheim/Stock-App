import ProfileStock from "./ProfileStock";
import PersonalPie from "../charts/PersonalPie"
import data from "../data"

export default function ExpandedProfile(props) {
    const colors = ["#FDAB00", "#F4508D", "#516CF7", "#56C1B9", "#D1D5DB"]

    return (
        <div id="expanded-profile" className="flex flex-col w-60 bg-white rounded-md border border-black border-opacity-5 drop-shadow-lg">
            <div id="pie-container" className="w-full mt-3 h-36" >
                <PersonalPie data={props.user} />
            </div>
            <div id="pie-legends" className="flex flex-col mb-3 pl-8 pr-12 text-sm">
                {props.user.stocks.map((stock, index) => (
                    <div key={stock.id} className="flex flex-row justify-between my-1 text-slate-600">
                        <div className="flex flex-row items-center">
                            <div id="stock-legend-color" className="w-2.5 h-2.5 mr-1.5 text-center rounded-full" style={{ backgroundColor: `${colors[index]}` }} />
                            <div id="stock-legend-name" className="font-medium">
                                {stock.label}:
                            </div>
                        </div>

                        <div id="stock-legend-value" className="font-medium text-slate-800">
                            ${Number(stock.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}