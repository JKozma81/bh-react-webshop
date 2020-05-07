import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootReducer from './reducers/RootReducer';

const store = createStore(RootReducer);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);
