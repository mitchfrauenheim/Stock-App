import React from "react";
import ExpandedProfile from "./ExpandedProfile";
import ProfilePopper from "./ProfilePopper";
import RankingProfile from "./RankingProfile";

import { users } from "../data"


function Leaderboard() {
    return (
        <div id="leaderboard-wrapper" className="relative w-80 sm:w-full h-full bg-white rounded-md">
            <div id="header" className="sticky pb-6 top-0 border-b">
                <div className="pl-7 text-lg font-semibold">
                    Leaderboard
                </div>
            </div>
            <div id="profiles-wrapper" className="relative rounded-lg">
                {users.map(user => (
                    <div key={user.name} className="group hover:bg-gray-100">
                        <div className="mx-3 border-b">
                            <ProfilePopper user={user} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Leaderboard;