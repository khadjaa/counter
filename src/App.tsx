import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const [minValue, setMinValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(0)
    const [value, setValue] = useState<number>(0)
    const [flag, setFlag] = useState<boolean>(false)

    useEffect(() => {
        resetHandler()
        // what is the magic with EsLint ?))))))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(Number(minValue))
    }, [minValue])

    const incHandler = () => {
        if (value < maxValue) {
            setValue( (prev) => prev + 1) // value smaller one ?
        }
        console.log('Value ', value)
    }

    useEffect(() => {
        if (maxValue !== 0 && value === maxValue) {
            setFlag(true)
        }
    },[value])

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

    console.log(flag, 'before ret')

    return (
        <div className="App">
            <div className='view'>
                <h1 className={value === maxValue ? 'redValue' : ''}>{value}</h1>
                <button onClick={incHandler} disabled={flag}>inc</button>
                <button onClick={resetHandler}>reset</button>
            </div>
            <div className='set'>
                <input type="number" value={minValue} onChange={(e) => setMinValueOnClickHandler(e)}/>
                <span>min</span>
               <div>
                   <input type="number" value={maxValue} onChange={(e) => setMaxValueOnClickHandler(e)}/>
                   <span>max</span>
               </div>
                <button onClick={() => {
                }}>set
                </button>
            </div>
        </div>
    );
}

export default App;
