import { useCallback, useEffect, useRef } from 'react';
import { useAppState, useSetAppState } from '../app-state/AppStateProvider';
import Timer from '../utils/timer';

export function useHandleStoryResponse() {
    const { inputMessage } = useAppState();
    const setAppState = useSetAppState();
    const idleTimer = useRef();

    useEffect(() => {
        idleTimer.current?.cancel();
    }, [inputMessage]);

    function handleStoryResponse(messages, response) {
        // console.log('response', response);

        if (!response) return;

        const newMessages = [...messages];

        if (response.storyText) {
            if (response.storyText.includes('basement')) {
                setAppState({ messages: [...newMessages], emotion: response.emotion, Done: true });
            }
            newMessages.push({ role: 'assistant', content: response.storyText });
        }
        console.log(response);
        setAppState({ messages: [...newMessages] ,emotion: response.emotion});
    }

    return handleStoryResponse;
}
