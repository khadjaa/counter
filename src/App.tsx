import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const [minValue, setMinValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(0)
    const [value, setValue] = useState<number>(0)
    const [flag, setFlag] = useState<boolean>(false)
    const [flagRes, setFlagRes] = useState<boolean>(false)

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
            setValue((prev) => prev + 1) // value smaller one ?
        }
        console.log('Value ', value)
    }

    useEffect(() => {
        if (maxValue !== 0 && value === maxValue) {
            setFlag(true)
        }
    }, [value])

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

    const setSettingsValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        if (name === "minValue") {
            setMinValue(Number(value));
        } else if (name === "maxValue") {
            setMaxValue(Number(value));
        }
        setFlagRes(true)
        setFlag(true)
    }

    const saveValuesOnLocalStorage = () => {
        localStorage.setItem('minValue', JSON.stringify(minValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        setFlagRes(false)
        setFlag(false)
    }

    return (
        <div className="App">
            <div className='view'>
                {flagRes && (minValue < 0 || maxValue < 0 || minValue === maxValue)
                    ? <h1 className={'redValue'}>Incorrect settings</h1>
                    : flagRes
                        ? <h1>press set</h1>
                        : <h1 className={value === maxValue ? 'redValue' : ''}>{value}</h1>
                }

                {/*{minValue < 0 || maxValue < 0 || minValue === maxValue*/}
                {/*    ? <h1 className={'redValue'}>Incorrect settings</h1>*/}
                {/*    : <h1 className={value === maxValue ? 'redValue' : ''}>{value}</h1>*/}
                {/*}*/}
                <button onClick={incHandler} disabled={flag}>inc</button>
                <button onClick={resetHandler} disabled={flagRes}>reset</button>
            </div>
            <div className='set'>
                <div>
                    <span>min </span>
                    <input type="number" name="minValue" value={minValue}
                           onChange={(e) => setSettingsValue(e)}/>
                </div>
                <div>
                    <span>max </span>
                    <input type="number" name="maxValue" value={maxValue}
                           onChange={(e) => setSettingsValue(e)}/>
                </div>
                <button onClick={saveValuesOnLocalStorage}>set
                </button>
            </div>
        </div>
    );
}

export default App;
