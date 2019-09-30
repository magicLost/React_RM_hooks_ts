import React, {useEffect, useState} from 'react';
import { BUTTON_TYPE } from '../UI/Button/Button';
import classes from "./Test.module.scss";


export interface TestProps {
    
}


const Test = () => {

    const [ state, setState ] = useState({ count: 1 });

    useEffect(() => {

        console.log("useEffect Test");

    }, []);
 
    console.log("Test render");

    return (

        <div className={classes.Test}>

            <p>Count - {state.count}</p>
            

            <button onClick={(event) => {

                setState(prevState => ({ count: prevState.count + 1 }));

            }}>Increase</button>

            <button onClick={(event) => {

                setState(prevState => prevState);

            }}>Not increase</button>

        </div>
    );

};

export default Test;