import ExpandedProfile from "./ExpandedProfile";
import RankingProfile from "./RankingProfile";

import { useState } from "react";
import { Popover, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';

export default function ProfilePopper(props) {
    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let placement = props.user.place < 3 ? 'right-start' : props.user.place < 5 ? 'right' : 'right-end'
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 30]
                }
            },
        ]
    })

    return (
        <Popover className="relative">
            <Popover.Button ref={setReferenceElement} className="w-full focus:outline-none">
                <RankingProfile key={props.user.place} user={props.user} />
            </Popover.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"    
            >
                <Popover.Panel
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="absolute z-20"
                >
                    <div>
                        <ExpandedProfile user={props.user} />
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}