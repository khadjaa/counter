import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const [minValue, setMinValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(0)
    const [value, setValue] = useState<number>(0)

    useEffect(() => {
        resetHandler()
    }, [])

    useEffect(() => {
        setHandler()
    }, [minValue])

    const incHandler = () => {
        setValue(value + 1)
    }
    const resetHandler = () => {
        let valueAsString = localStorage.getItem('counterValue')
        if (valueAsString) {
            let newValue = JSON.parse(valueAsString)
            setMinValue(newValue)
        }
    }
    const setHandler = () => {
        localStorage.setItem('minValue', JSON.stringify(minValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }

    return (
        <div className="App">
            <div className='view'>
                <h1>{minValue}</h1>
                <button onClick={incHandler}>inc</button>
                <button onClick={() => {}}>reset</button>
            </div>
            <div className='set'>
                <input type="number"
                       onClick={incHandler}
                       value={minValue}/> min value
                <input type="number"
                       value={maxValue}/> max value
                <button onClick={setHandler}>set</button>
            </div>
        </div>
    );
}

export default App;
