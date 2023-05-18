import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const [minValue, setMinValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(0)
    const [value, setValue] = useState<number>(0)
    const [flag, setFlag] = useState<boolean>(false)

    useEffect(() => {
        resetHandler()
    }, [])

    useEffect(() => {
        setValue(Number(minValue))
    }, [minValue])

    const incHandler = () => {
        console.log('Value ', value)
        if (value < maxValue) {
            setValue((prevState) => prevState + 1) // value smaller one ?
        } else {
            setFlag(true)
        }
    }
    const resetHandler = () => {
        let minValueAsString = localStorage.getItem('minValue')
        let maxValueAsString = localStorage.getItem('maxValue')

        if (minValueAsString && maxValueAsString) {
            let newMinValue = JSON.parse(minValueAsString)  // parsed string ?
            setMinValue(Number(newMinValue))
            console.log('newMinValue ', typeof newMinValue)

            let newMaxValue = Number(JSON.parse(maxValueAsString))
            setMaxValue(Number(newMaxValue))
            console.log('newMaxValue ', typeof newMinValue)
        }
        setFlag(false)
        setValue(minValue)
    }

    const setMinValueOnClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let minV = Number(e.currentTarget.value)
        setMinValue(minV)
        localStorage.setItem('minValue', JSON.stringify(e.currentTarget.value))
    }

    const setMaxValueOnClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let maxV = Number(e.currentTarget.value)
        setMaxValue(maxV)
        localStorage.setItem('maxValue', JSON.stringify(e.currentTarget.value))
    }

    return (
        <div className="App">
            <div className='view'>
                <h1>{value}</h1>
                <button onClick={incHandler} disabled={flag}>inc</button>
                <button onClick={resetHandler}>reset</button>
            </div>
            <div className='set'>
                <input type="number" value={minValue} onChange={(e) => setMinValueOnClickHandler(e)}/> min // how to do in one line
                <input type="number" value={maxValue} onChange={(e) => setMaxValueOnClickHandler(e)}/> max
                <button onClick={() => {
                }}>set
                </button>
            </div>
        </div>
    );
}

export default App;
