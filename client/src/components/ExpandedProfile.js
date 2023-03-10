import ProfileStock from "./ProfileStock";
import PersonalPie from "../charts/PersonalPie"
import data from "../data"

export default function ExpandedProfile(props) {
    return (
        <div id="expanded-profile" className="flex flex-col w-60 bg-white rounded-md border border-black border-opacity-5 drop-shadow-lg">
            <div id="pie-container" className="w-full mt-3 h-36" >
                <PersonalPie data={data.mitch.stocks} />
            </div>
            <div id="pie-legends" className="flex flex-col mb-3 pl-8 pr-12 text-sm">
                {data.mitch.stocks.map(stock => (
                    <div key={stock.id} className="flex flex-row justify-between my-1 text-slate-600">
                        <div className="flex flex-row items-center">
                            <div id="stock-legend-color" className="w-2.5 h-2.5 mr-1.5 text-center rounded-full" style={{ backgroundColor: `${stock.color}` }} />
                            <div id="stock-legend-name" className="font-medium">
                                {stock.label}:
                            </div>
                        </div>

                        <div id="stock-legend-value" className="font-medium text-slate-800">
                            ${parseInt(stock.value).toLocaleString('en-US')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}