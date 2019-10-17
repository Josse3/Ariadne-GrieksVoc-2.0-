import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
// CSS
import './AddTool.css';
import '../../styles/vocabulariumlist.css';
// Components
import Header from '../Header/Header';
// Util
import Ariadne from '../../util/Ariadne';
import { encode } from 'punycode';

function AddTool() {
    // Authentication page
    const [enteredPass, setEnteredPass] = useState('');
    const [authenticationFailed, setAuthenticationFailed] = useState(false);
    // Edit interface
    const [dictionary, setDictionary] = useState([]);
    const [selectedInputField, setSelectedInputField] = useState('subst1');
    const inputFields = {
        subst1: ['word', 'genus', 'translation', 'page'],
        subst2: ['word', 'genus', 'genitive', 'translation', 'page']
    }
    const [formInput, setFormInput] = useState({});
    // Phase
    const [phase, setPhase] = useState('editing');

    // Sends request to backend which replies with boolean defining whether or not the authentication was succesful
    const authenticate = () => {
        fetch(`/authentication/addtool?password=${enteredPass}`)
            .then(response => {
                if (!response.ok) throw Error('Failed checking password in backend.');
                return response.json();
            })
            .then(jsonResponse => jsonResponse === true ? setPhase('editing') : setAuthenticationFailed(true));
    };

    // Fetches the dictionary data as soon as the user gets access to the edit interface
    useEffect(() => {
        if (phase === 'editing') {
            fetch('/db/full')
                .then(response => {
                    if (!response.ok) throw Error('Failed fetching dictionary data from backend.');
                    return response.json();
                })
                .then(setDictionary);
        }
    }, [phase])

    // Adding a word to the database
    const addWord = event => {
        event && event.preventDefault();
        const queryObject = JSON.parse(JSON.stringify(formInput));
        delete queryObject.word;
        const queryString =
            encodeURIComponent(formInput.word) +
            '?' +
            'id=' +
            (dictionary.length + 1) +
            '&' +
            Object.entries(queryObject).map(([key, value]) => {
                return key + '=' + encodeURIComponent(value);
            })
                .join('&')
                .replace(/,/g, '=') +
            '&type=subst1';


        fetch(`/db/add/${queryString}`, { method: 'PUT' })
            .then(response => {
                if (!response.ok) throw Error('Failed adding word to the database');
                return response.json();
            });
    }

    return (
        <div className="add-tool">
            <Header />
            {phase === 'authenticating' && (
                <div className="auth-form">
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Voer authenticatie-code in"
                        onChange={e => setEnteredPass(e.target.value)}
                        onKeyPress={e => { if (e.key === 'Enter') authenticate() }}
                    />
                    <button className="auth-btn" onClick={authenticate}>
                        Meld aan
                    </button>
                    {authenticationFailed && <div className="error">Het paswoord dat u invoerde was incorrect, gelieve het opnieuw te proberen.</div>}
                </div>
            )}

            {phase === 'editing' && (
                <div className="edit-interface">
                    <Link
                        to="form-scroll-anchor"
                        duraction={250}
                        smooth={true}
                    >
                        <button>Voeg woorden toe</button>
                    </Link>
                    <h1>Substantieven eerste vervoeging</h1>
                    <div className="vocabularium-list-grid vocabularium-list-subst1">
                        <div className="subst1-header">
                            <p>#</p>
                            <p>Woord</p>
                            <p>Genus</p>
                            <p>Vertaling</p>
                            <p>Pagina</p>
                        </div>
                        {dictionary.map(wordObj => {
                            return (
                                <div className="word-item-subst1" key={`word-item-${wordObj.word}`}>
                                    {Object.entries(wordObj).map(([key, value]) => {
                                        let displayedParameter = value;
                                        if (key === 'word') {
                                            displayedParameter = Ariadne.toGreek(value);
                                        }
                                        if (key === 'genus') {
                                            displayedParameter = Ariadne.renderGenus(value);
                                        }
                                        return <p key={key}>{displayedParameter}</p>
                                    })}
                                </div>
                            )
                        })}
                    </div>

                    <form className="addtool-form addtool-form-subst1" id="form-scroll-anchor" onSubmit={addWord}>
                        <select value={selectedInputField} onChange={e => setSelectedInputField(e.target.value)}>
                            {Object.keys(inputFields).map(inputField => {
                                return <option value={inputField} key={inputField}>{inputField}</option>
                            })}
                        </select>
                        {inputFields[selectedInputField].map(inputField => {
                            return (
                                <input
                                    type={inputField === 'page' ? 'number' : 'text'}
                                    name={inputField}
                                    key={inputField}
                                    placeholder={Ariadne.toDutch(inputField)}
                                    autoComplete="off"
                                    onChange={e => setFormInput({ ...formInput, [e.target.name]: e.target.value })}
                                    onKeyPress={inputField === 'page' ? (e => { if (e.key === 'Enter') addWord() }) : undefined}
                                />
                            );
                        })}
                        <button>Voeg toe</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AddTool;