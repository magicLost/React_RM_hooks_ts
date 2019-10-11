
interface IToDos {
    todos: any[];
}

interface ICounter {
    count: number;
}

interface ICounterWithToDos extends IToDos, ICounter {

}

const state: ICounterWithToDos = {
    todos: [],
    count: 0
};


export function counter<T extends ICounter>(state: T, action: any): T {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count + 1 };
      default:
        return state
    }
}

export function todos<T extends IToDos>(state: T, action: any): T {

    switch (action.type) {
      case 'ADD_TODO':
        return { ...state, todos: state.todos.concat([action.text])};
      default:
        return state;
    }
}

const reducer = (state: ICounterWithToDos, action: any ) => {

    let newState: ICounterWithToDos;

    newState = counter<ICounterWithToDos>(state, action);

    newState = todos<ICounterWithToDos>(state, action);

    return newState;
}

  
