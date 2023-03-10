import React from "react";

export default function RankingProfile(props) {
    return (
        <div id="profile" className="flex relative h-12 max-w-full my-1 items-center text-sm cursor-auto bg-[#FEFFFE] group-hover:bg-gray-100">
            <div id="place" className="pl-3 sm:pl-5 font-medium">
                {props.user.place}.
            </div>
            <div id="name" className="pl-3 text-slate-600 group-hover:text-gray-500">
                {props.user.name}
            </div>
            <div id="amount" className="absolute right-4 text-[#3fd7ad]">
                {props.user.amount}
            </div>
        </div>
    );
}