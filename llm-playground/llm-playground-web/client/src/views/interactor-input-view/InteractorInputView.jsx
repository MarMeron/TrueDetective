import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppState, useSetAppState } from '../../app-state/AppStateProvider';
import './interactor-input-styles.css';
import { SETTINGS } from '../../../settings';
import { useHandleStoryResponse } from '../../story/story-logic';

export default function InteractorInputView() {
    const { messages, status, inputMessage } = useAppState();
    const setAppState = useSetAppState();

    const handleResponse = useHandleStoryResponse();

    const send = useCallback(() => {
        const newMessages = [...messages, { role: 'user', content: inputMessage }];
        for (let i = 0; i < newMessages.length; i++) {
            if (newMessages[i].content === null) {
                newMessages[i].content = '';
            }
        }
        const msgsForApi = newMessages.map((msg) => {
            if (msg.role === 'storyEvent') return { ...msg, role: 'assistant' };
            else return msg;
        });
        setAppState({ messages: msgsForApi, status: 'loading', inputMessage: '' });
        console.log('Sending to api: ', msgsForApi);
        fetch(`${SETTINGS.SERVER_URL}/story-completions`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(msgsForApi),
        })
            .then((response) => response.json())
            .then((data) => {
                try {
                    let storytellerResponse = data.choices[0].message.content;
                    storytellerResponse = JSON.parse(storytellerResponse);

                    setAppState({ status: 'idle' });
                    handleResponse(msgsForApi, storytellerResponse);
                } catch {
                    (err) => {
                        throw err;
                    };
                }
            })
            .catch((err) => {
                console.error('Api error. Details: ', err);
                setAppState({ status: 'error' });
            });
    }, [messages, inputMessage]);

    return (
        <div
            id="interactor-box"
            style={{
                opacity: status === 'loading' ? 0.3 : 1,
                pointerEvents: status === 'loading' ? 'none' : 'auto',
                color: status === 'error' ? 'red' : 'auto',
            }}
        >
            <input
                id="interactor-text-input"
                value={inputMessage}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') send();
                }}
                onChange={(e) => setAppState({ inputMessage: e.target.value })}
            />
            <button onClick={send}>Send</button>
            {status === 'error' && 'Something is broken 😵‍💫'}
        </div>
    );
}
