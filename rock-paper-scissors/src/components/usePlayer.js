import { useState } from 'react';
import { useStoreContext } from '../context/store';

const handToInt = { 'ROCK': 0, 'PAPER': 1, 'SCISSORS': 2 };
const inToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];

const usePlayer = () => {
    const [state, setState] = useState();
    // const { setState } = useStoreContext()
    const { reach } = useStoreContext()
    const random = () => {
        return reach.hasRandom.random();
    }
    const getHand = async () => {
        const hand = await new Promise(resolveHandP => {
            setState(prev => ({
                ...prev,
                view: 'GetHand',
                playable: true,
                resolveHandP
            }))
        })
        setState(prev => ({
            ...prev,
            view: 'WaitingForResult',
            hand
        }))
        return handToInt[hand]
    }

    const seeOutcome = (i) => setState(prev => ({
        ...prev,
        view: 'Done',
        outcome: inToOutcome[i]
    }))

    const informTimeout = () => setState(prev => ({ ...prev, view: 'Timeout' }))
    // const playHand = (hand) => {
    //     resolveHandP(hand)
    // }
    const player = {
        getHand, 
        random, 
        seeOutcome, 
        informTimeout,
        // playHand,
    }

    return player

}

export default usePlayer;


// import { useState } from 'react';
// import { useStoreContext } from '../context/store';

// const handToInt = { 'ROCK': 0, 'PAPER': 1, 'SCISSORS': 2 };
// const inToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];

// const usePlayer = () => {
//     const [state, setState] = useState();
//     // const { setState } = useStoreContext()
//     const { reach } = useStoreContext()
//     const random = () => {
//         return reach.hasRandom.random();
//     }
//     const getHand = async () => {
//         const hand = await new Promise(resolveHandP => {
//             setState(prev => ({
//                 ...prev,
//                 view: 'GetHand',
//                 playable: true,
//                 resolveHandP
//             }))
//         })
//         setState(prev => ({
//             ...prev,
//             view: 'WaitingForResult',
//             hand
//         }))
//         return handToInt[hand]
//     }

//     const seeOutcome = (i) => setState(prev => ({
//         ...prev,
//         view: 'Done',
//         outcome: inToOutcome[i]
//     }))

//     const informTimeout = () => setState(prev => ({ ...prev, view: 'Timeout' }))
//     const playHand = () => setState(prev => ({ ...prev, view: 'Timeout' }))

//     return [
//         getHand, 
//         random, 
//         seeOutcome, 
//         informTimeout,
//         playHand,
//         state,
//     ]

// }

// export default usePlayer;