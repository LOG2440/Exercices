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
            return { name: state.name, count: state.count + action.payload };
        case ACTIONS.DECREMENT:
            return { name: state.name, count: state.count - action.payload };
        case ACTIONS.RESET:
            return { ...state, count: 0 };
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
