// скопировано из материалов лекций purpleschool

// утильные функции для работы с localStorage в проектах с redux

export function loadState<T>(key: string) : T | undefined{
	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.error('Error loading state:', err);
		return undefined;
	}
}

export function saveState<T>(state: T, key: string) {
	const serializedState = JSON.stringify(state);
	localStorage.setItem(key, serializedState);
}