import React, {useState} from 'react';
import './App.css';

function App() {

    const [value, setValue] = useState<number>(0)

    const incHandler = () => {
        setValue(value + 1)
    }
    const setToLocalStorage = () => {
        localStorage.setItem('counterValue', JSON.stringify(value))
    }
    const getFromLocalStorage = () => {
        let valueAsString = localStorage.getItem('counterValue')
        if (valueAsString) {
            let newValue = JSON.parse(valueAsString)
            setValue(newValue)
        }
    }

    return (
        <div className="App">
            <h1>{value}</h1>
            <button onClick={incHandler}>inc</button>
            <button onClick={setToLocalStorage}>setToLocalStorage</button>
            <button onClick={getFromLocalStorage}>getFromLocalStorage</button>
        </div>
    );
}

export default App;
