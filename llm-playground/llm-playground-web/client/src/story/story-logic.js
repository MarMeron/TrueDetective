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
        if (!response) return;

        const newMessages = [...messages];

        if (response.storyText) {
            newMessages.push({ role: 'assistant', content: response.storyText });
        }

        setAppState({ messages: [...newMessages] });
    }

    return handleStoryResponse;
}
