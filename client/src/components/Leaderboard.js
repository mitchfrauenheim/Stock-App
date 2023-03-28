import React from "react";
import ExpandedProfile from "./ExpandedProfile";
import ProfilePopper from "./ProfilePopper";
import RankingProfile from "./RankingProfile";

import { users } from "../data"


function Leaderboard(props) {
    return (
        <div id="leaderboard-wrapper" className="relative w-80 sm:w-full h-full bg-white rounded-md">
            <div id="header" className="sticky pb-6 top-0 border-b">
                <div className="pl-7 text-lg font-semibold">
                    Leaderboard
                </div>
            </div>
            <div id="profiles-wrapper" className="relative rounded-lg">
                {props.users ? (
                    props.users.map((user, i) => (
                        <div key={i} className="group hover:bg-gray-100">
                            <div className="mx-3 border-b">
                                <ProfilePopper user={user} place={i + 1} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div id="leaderboard-spinner" className="flex w-full justify-center mt-6">
                        <div aria-label="Loading..." role="status">
                            <svg class="h-8 w-8 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                <line
                                    x1="195.9"
                                    y1="60.1"
                                    x2="173.3"
                                    y2="82.7"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="24"></line>
                                <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                <line
                                    x1="195.9"
                                    y1="195.9"
                                    x2="173.3"
                                    y2="173.3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="24"></line>
                                <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                <line
                                    x1="60.1"
                                    y1="195.9"
                                    x2="82.7"
                                    y2="173.3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="24"></line>
                                <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                <line
                                    x1="60.1"
                                    y1="60.1"
                                    x2="82.7"
                                    y2="82.7"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="24"></line>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Leaderboard;