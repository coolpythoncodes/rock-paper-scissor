import { useRef, useState } from "react"
import { useStoreContext } from "../context/store"
import * as backend from '../../build/index.main.mjs';

const handToInt = { 'ROCK': 0, 'PAPER': 1, 'SCISSORS': 2 };
const inToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];

const AttacherWrapper = ({ content }) => {
    return (
        <div className="Attacher">
            <h2>Attacher {'{Bob}'}</h2>
            {content}
        </div>
    )
}

const Attach = ({ setState, state }) => {
    const { acc, reach } = useStoreContext()
    const [ctcInfoStr, setCtcInfoStr] = useState('')


    const textAreaRef = useRef()
    const handleTextChange = (e) => setCtcInfoStr(e.target.value)
    const attach = async (ctcInfoStr) => {
        const ctc = acc.contract(backend, JSON.parse(ctcInfoStr))
        const info = JSON.parse(ctcInfoStr)
        const interactObject = {
            info,
            acceptWager,
            getHand: async () => {
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
            },
            random: () => {
                return reach.hasRandom.random();
            },
            playHand: (hand) => {
                state.resolveHandP(hand)
            },
            seeOutcome: (i) => setState(prev => ({
                ...prev,
                view: 'Done',
                outcome: inToOutcome[i]
            })),
            informTimeout: () => setState(prev => ({ ...prev, view: 'Timeout' }))
        }
        setState(prev => ({
            ...prev,
            appView: 'AttacherViews',
            view: 'Attaching'
        }))
        backend.Bob(ctc, interactObject)

    }

    const acceptWager = async (wagerAtomic) => {
        const wager = reach.formatCurrency(wagerAtomic, 4);
        return await new Promise(resolveAcceptedP => {
            setState(prev => ({
                ...prev,
                view: 'AcceptTerms',
                wager,
                resolveAcceptedP
            }))
        })
    }
    return (
        <div>
            Please paste the contract info to attach to:
            <br />
            <textarea
                spellCheck={false}
                className="ContractInfo"
                placeholder="{}"
                ref={textAreaRef}
                onChange={handleTextChange}
            >
            </textarea>
            <br />
            <button
                disabled={!ctcInfoStr}
                onClick={() => attach(ctcInfoStr)}
            >
                Attach
            </button>
        </div>
    )
}

const Attaching = () => {
    return (
        <div>
            Attaching, please wait...
        </div>
    )
}

const AcceptTerms = ({ wager, resolveAcceptedP, setState, state }) => {
    const { defaults } = useStoreContext()
    const [isDisabled, setIsDisabled] = useState(false);

    const termsAccepted = () => {
        setIsDisabled(true)
        resolveAcceptedP()
        setState(prev => ({
            ...prev,
            view: "WaitingForTurn"
        }))
        setIsDisabled(false)
    }

    return (
        <div>
            The terms of the game are:
            <br /> Wager: {wager} {defaults.standardUnit}
            <br />
            <button disabled={isDisabled} onClick={termsAccepted}>
                Accept terms and pay wager
            </button>
        </div>
    );
}

const WaitingForTurn = () => {
    return (
        <div>
            Waiting for the other player...
            <br />Think about which move you want to play.
        </div>
    )
}

export {
    AttacherWrapper,
    Attach,
    Attaching,
    AcceptTerms,
    WaitingForTurn,
}