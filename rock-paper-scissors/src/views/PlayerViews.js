const GetHand = ({ playable, resolveHandP, hand }) => {
    const playHand = (hand) => resolveHandP(hand)
    return (
        <div>
            {hand ? 'It was a draw! Pick again.' : ''}
            <br />
            {!playable ? 'Please wait' : ''}
            <br />
            <button disabled={!playable} onClick={() => playHand('ROCK')}>Rock</button>
            <button disabled={!playable} onClick={() => playHand('PAPER')}>Paper</button>
            <button disabled={!playable} onClick={() => playHand('SCISSORS')}>Scissors</button>
        </div>
    )
}

const WaitingForResult = () => {
    return (
        <div>
            Waiting for results...
        </div>
    )
}

const Done = ({ outcome }) => {
    return (
        <div>
            Thank you for playing. The outcome of this game was:
            <br />{outcome || 'Unknown'}
        </div>
    )
}

const Timeout = () => {
    return <div>There's been a timeout. (Someone took too long.)</div>;
}

export {
    GetHand,
    WaitingForResult,
    Done,
    Timeout
};