import React from "react";

export default function RankingProfile(props) {
    const firstName = props.user.name.split(' ')[0];
    const formattedCapital = Number(props.user.capital).toLocaleString();

    return (
        <div id="profile" className="flex relative h-12 max-w-full my-1 items-center cursor-auto bg-[#FEFFFE] group-hover:bg-gray-100">
            <div id="place" className="pl-3 sm:pl-5 font-medium">
                {props.place}.
            </div>
            <div id="name" className="pl-3 text-slate-600 group-hover:text-gray-500">
                {firstName}
            </div>
            <div id="amount" className="absolute right-4 text-[#3BCC9E] font-medium">
                ${formattedCapital}
            </div>
        </div>
    );
}