import React, {useEffect, useReducer, useRef, useMemo} from 'react';
import { BUTTON_TYPE } from '../UI/Button/Button';
import classes from "./Test.module.scss";
import { mainPresentationCarouselItems } from '../../data/homepage_data';

const incrementAC = (state: any, action: any, refCount: any) => {

    console.log("incrementAC - refCount - ", refCount.current.count);
    return {count: state.count + 1};

};

class Bla{
    constructor(){
        console.log("New Bla");
    }
}

const useTest = () => {

    const refCount = useRef({count: 0});
    const childItemRef = useRef(null);
    const testRef = useRef(new Bla());

    const reducer = (state: any, action: any) => {

        switch (action.type) {
        case 'increment':
            return incrementAC(state, action, refCount);
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
        }
        
    };

    const [ state, dispatch ] = useReducer(reducer, undefined, () => { return {count: 0};});

    useEffect(() => {

        console.log("useEffect useTest", childItemRef.current);

    }, [state.count]);

    return {
        count: state.count,
        refCount: refCount,
        childItemRef: childItemRef,
        dispatch: dispatch
    }

};

export interface TestProps {
    
}

const items = [
    [1, 2, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6]
];


const Test = () => {

    const {count, refCount, childItemRef, dispatch} = useTest();

    useEffect(() => {

        //console.log("useEffect Test");
        
        window.addEventListener('resize', () => { 
            console.log("resize ", refCount.current.count); 
            //console.log("resize - state ", state.count); 
            console.log("resize - state ", childItemRef.current); 
        }, false);

    }, []);

    useEffect(() => {

        console.log("useEffect Test", childItemRef.current);

    });

    const getChildItems = () => {

        return items[count].map((value, index) => {

            return <li 
                data-index={index}
                ref={childItemRef} 
                key={index}>Child - {value}</li>

        })

    };
 
    console.log("Test render");

    return (

        <div className={classes.Test}>

            <p>State Count - {count}</p>

            <p>Ref Count - {refCount.current.count}</p>

            <button onClick={(event) => {

                dispatch({type: 'increment'})

            }}>Increase</button>

            <button onClick={(event) => {

                //setState(prevState => prevState);
                refCount.current.count++;

            }}>Ref increase</button>

            <br />
            <br />

            {useMemo(() => (<Child getItems={getChildItems} />), [count])}

            <br />
            <br />

            <button onClick={(event) => {

                //setState(prevState => prevState);
                refCount.current.count++;

            }}>Change items</button>

        </div>
    );

};

export default Test;

//ref={props.divRef}
const Child = (props: any) => {

    const items = props.getItems();

    console.log("render Child");

    return (
        <div >

            <ul>
                {items}
            </ul>

        </div>
    );

};