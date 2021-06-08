import * as React from 'react';
import * as cipher from './cipher/index';
import './style.css';

/**
 * Handle change in input value as form events.
 * @param event  type: React.FormEvent, to be passed 
 *               by the method inside onChange attribute
 * @returns      the input value as a string
 */
function eventHandler(event: React.FormEvent<HTMLInputElement> 
                           | React.FormEvent<HTMLDivElement>): string {
    return (event.target as HTMLInputElement).value;
}

/**
 * Handle submitting by user.
 * @param key       The number that is in use
 * @param input     Plaintext/Ciphertext
 * @param encrypt   {@code true} if encryption is to be performed
 * @param setter    The function that will change the state of the resulting value 
 * @returns 
 */
function submitHandler(key: number, input: string, encrypt: boolean, setter: React.Dispatch<React.SetStateAction<string>>) {
    if (encrypt) {
        setter(cipher.encrypt(key, input));
        return;
    }
    setter(cipher.decrypt(key, input));
}

/**
 * Parse boolean out of the input value.
 * Had to write this since there was no in-built support for parsing boolean.
 * This function does not cover all the edge cases. It is intended to be used
 * only by the {@code div} in the App component below.
 * @param value The input value received from the eventHandler function
 * @returns     {@code true} if the input string is "true"
 */
function parseBoolean(value: string): boolean {
    return (value === 'true');
}

/**
 * The component that displays the input fields and submit button for CRYPY
 */
function App(): JSX.Element {
    const [toggle, alter] = React.useState<boolean>(true);
    const [num, setNum] = React.useState<number>(0);
    const [input, setInput] = React.useState<string>('');
    const [result, setResult] = React.useState<string>(' ');

    return (
        <div className="app">
            <p id="logo">CRYPY</p>
            <div id="toggle" onChange={(event) => alter(parseBoolean(eventHandler(event)))}>
                <label>Choose your weapon: </label>
                <input type="radio" name="toggle" value="true" />Encrypt
                <input type="radio" name="toggle" value="false" />Decrypt
            </div>
            <div id="formdiv">
                <label>Enter your number</label>
                <input id="number" placeholder="number" value={num} onInput={event => setNum(parseInt(eventHandler(event)) || 0)}></input>

                <label>Enter your text</label>
                <input id="input" placeholder="text" value={input} onInput={event => setInput(eventHandler(event))}></input>
                <button type="submit" onClick={() => submitHandler(num, input, toggle, setResult)}>Submit</button>
            </div>
            <p id="result">{result}</p>
        </div>
    );
}

export default App;