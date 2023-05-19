import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const [minValue, setMinValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(0)
    const [value, setValue] = useState<number>(0)
    const [flags, setFlags] = useState({inc: false, res: false, set: true})

    const incHandler = () => {
        if (value < maxValue) {
            setValue((prev) => prev + 1)
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
        setValue(minValue)
        setFlags({...flags, inc: false})
    }

    const setSettingsValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        if (name === "minValue") {
            setMinValue(Number(value));
        } else if (name === "maxValue") {
            setMaxValue(Number(value));
        }
        setFlags({...flags, inc: true, res: true, set: false})
    }

    const saveValuesOnLocalStorage = () => {
        localStorage.setItem('minValue', JSON.stringify(minValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        setFlags({...flags, inc: false, res: false, set: true})
    }

    useEffect(() => {
        resetHandler()
        // eslint-disable-next-line
    }, [])

    const conditionValue = minValue > maxValue || minValue === maxValue || minValue < 0 || maxValue < 0

    useEffect(() => {
        if (maxValue !== 0 && value === maxValue) {
            setFlags({...flags, inc: true})
        }
        // eslint-disable-next-line
    }, [value])

    useEffect(() => {
        setValue(Number(minValue))
        if (conditionValue) {
            setFlags({...flags, set: true})
        }
        // eslint-disable-next-line
    }, [minValue, maxValue])

    return (
        <div className="App">
            <div className='view'>
                {flags.res && conditionValue
                    ? <h1 className={'redValue'}>Incorrect settings</h1>
                    : flags.res
                        ? <h1>press set</h1>
                        : <h1 className={value === maxValue ? 'redValue' : ''}>{value}</h1>
                }
                <button onClick={incHandler} disabled={flags.inc}>inc</button>
                <button onClick={resetHandler} disabled={flags.res}>reset</button>
            </div>
            <div className='set'>
                <div>
                    <span>min value </span>
                    <input type="number" name="minValue" value={minValue}
                           onChange={(e) => setSettingsValue(e)}/>
                </div>
                <div>
                    <span>max value </span>
                    <input type="number" name="maxValue" value={maxValue}
                           onChange={(e) => setSettingsValue(e)}/>
                </div>
                <button onClick={saveValuesOnLocalStorage} disabled={flags.set}>set
                </button>
            </div>
        </div>
    );
}

export default App;