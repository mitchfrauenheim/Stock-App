

export default function ProfileStock(props) {
    return (
        <div id="stock-wrapper" className="w-5/6 h-13 flex flex-col m-2">
            <div id="top" className="w-full flex items-end justify-between">
                <div id="ticker-symbol" className="lato-700">
                    {props.stock.abbr}
                </div>
                <div id="percent-change" className="text-sm leading-6 lato-400 text-[#3fd7ad]">
                    +{props.stock.perc}%
                </div>
            </div>
            <div id="bottom" className="flex flex-grow items-end text-lg lato-700">
                <div id="investment" className="">
                    ${props.stock.holding}
                </div>
            </div>
        </div>
    );
}