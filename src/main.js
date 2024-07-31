import App from './App.svelte';
import axios from 'axios';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;