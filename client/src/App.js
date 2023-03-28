import './tailwind.css';
import { useEffect, useState } from 'react';

import Leaderboard from "./components/Leaderboard";


export default function App() {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3001/users")
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);

	// console.log(users);

	return (
		// <div id="application">
		<div id="page-wrapper" className="flex flex-row w-screen h-screen overscroll-auto overflow-hidden bg-white font-inter text-slate-800">
			<div id="left-bar" className="flex flex-col w-96 ml-3">
				<div id="left-header" className="flex h-24 mb-2">
				</div>
				<div id="left-content" className="flex flex-col flex-grow justify-between">
					<Leaderboard users={users} />
					<div id="footer" className="flex text-xs justify-center mb-10 text-gray-400">
						Copyright &#169; 2023 Mitch Frauenheim.
					</div>
				</div>
			</div>
			<div id="page-body" className="flex flex-col items-center w-full">
				<div id="main-header" className="flex flex-row justify-between w-11/12 h-24 mb-2 items-center text-2xl">
					<div id="page-title" className="text-slate-800 font-semibold">
						Frauenheim Stock Club
					</div>
					<div id="links" className="flex flex-row space-x-6 text-gray-400">
						<span id="mode" className="cursor-pointer hover:text-slate-600">
							<label className="swap swap-rotate">
								<input type="checkbox" />
								<svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
								<svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
							</label>
						</span>
						<span id="githup" className="cursor-pointer hover:text-slate-600">
							<a href="https://github.com/mitchfrauenheim/Stock-App">
								<svg viewBox="0 0 16 16" className="w-6 h-6" fill="currentColor" aria-hidden="true">
									<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
								</svg>
							</a>
						</span>
					</div>
				</div>
				<div id="main-content" className="flex justify-center w-full flex-grow">
					<div id="grid-wrapper" className="grid w-11/12 mb-10 grid-cols-1 grid-rows-4 sm:grid-rows-3 gap-8">
						<div className="col-span-1 sm:row-span-2 bg-gray-200 ">Coming Soon: YTD graph of each member's finances.</div>
						<div className="col-span-1 bg-gray-200 ">Coming Soon: Stock ticker of all held stocks.</div>
					</div>
				</div>
			</div>
		</div>
		// </div>
	);
}

