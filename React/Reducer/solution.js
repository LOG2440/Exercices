const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
    RESET: "reset",
    RENAME: "rename",
};

/**
 * @param { {name : string, count : number, maxValue : number} } state l'état courrant
 * @param {{type : string, payload}} action action à appliquer. Contient un type et un contenu (payload)
 * @returns { state } le nouveau état modifié (ou non) par l'action
 */
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return {
                ...state,
                count: Math.min(state.count + action.payload, state.maxValue),
            };
        case ACTIONS.DECREMENT:
            return {
                ...state,
                count: Math.max(state.count - action.payload, 0),
            };
        case ACTIONS.RESET:
            return { ...state, count: 0 };
        case ACTIONS.RENAME:
            const newName = action.payload && action.payload.length <= 10 ? action.payload : '';
            return { ...state, name: newName || state.name };
        default:
            return state;
    }
};

let counter = { name: "Timer", count: 0, maxValue: 10 };
const incrementAction = { type: ACTIONS.INCREMENT, payload: 1 };

counter = reducer(counter, incrementAction);
console.log(counter); // { name: 'Timer', count: 1, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.INCREMENT, payload: 15 });
console.log(counter); // { name: 'Timer', count: 10, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.DECREMENT, payload: 5 });
console.log(counter); // { name: 'Timer', count: 5, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.DECREMENT, payload: 10 });
console.log(counter); // { name: 'Timer', count: 0, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.RENAME, payload: '' });
console.log(counter); // { name: 'Timer', count: 0, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.RENAME, payload: 'Very Long Name' });
console.log(counter); // { name: 'Timer', count: 0, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.RENAME, payload: 'New Timer' });
console.log(counter); // { name: 'New Timer', count: 0, maxValue : 10}
