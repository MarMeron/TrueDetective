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

        if ((response.goalProgress == 0.3 || response.goalProgress == 0.6) && response.storyEvent) {
            newMessages.push({ role: 'storyEvent', content: response.storyEvent });
        }

        setAppState({ messages: [...newMessages] });

        console.log('goal progress: ', response.goalProgress);

        // If the player is idle for a long period, add some content or a hint to push the story forward.
        idleTimer.current = new Timer(15000, () => {
            if (response.storyEvent && Math.random() > 0.7) {
                // Trigger an independent story event:
                newMessages.push({ role: 'storyEvent', content: response.storyEvent });
                setAppState({ messages: [...newMessages] });
            }
        });
        idleTimer.current.start();
    }

    return handleStoryResponse;
}
