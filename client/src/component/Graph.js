import React, { useEffect, useState } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';

const Graph = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		// Sample data for testing
		const sampleData = [
			{ name: 'Jan', uv: 4000, pv: 2400 },
			{ name: 'Feb', uv: 3000, pv: 1398 },
			{ name: 'Mar', uv: 2000, pv: 9800 },
			{ name: 'Apr', uv: 2780, pv: 3908 },
			{ name: 'May', uv: 1890, pv: 4800 },
			{ name: 'Jun', uv: 2390, pv: 3800 },
			{ name: 'Jul', uv: 3490, pv: 4300 }
		];
		setData(sampleData);
	}, []);

	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="pv" fill="#8884d8" />
				<Bar dataKey="uv" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default Graph;

const Graph = () => {
	const [numQuestions, setNumQuestions] = useState(1);
	const [locality, setLocality] = useState('');
	const [excuses, setExcuses] = useState(Array.from({ length: 1 }, () => ''));

// import React, { useState } from 'react';
// import axios from 'axios';
// import './Excuse.css'; // Assuming you have a CSS file for styling

// const Graph = () => {
// 	const [numQuestions, setNumQuestions] = useState(1);
// 	const [excuses, setExcuses] = useState(Array.from({ length: 1 }, () => ''));

	const handleSubmit = () => {
		// Handle submission logic here
		console.log('Submitted excuses:', excuses);
		try {
			const request = axios.post("http://localhost:5000/ivr-call/initiate", {
				excuses, locality
			});
			return;
		} catch (error) {
			console.log(error);
			return;
		}
	};

	return (
		<div className="excuse-form">
		<input type="text" value={locality} onChange={e=> setLocality( e.target.value)}/>
			<label htmlFor="num-questions">Select number of excuses:</label>
			<select id="num-questions" value={numQuestions} onChange={handleNumQuestionsChange}>
				{[...Array(10).keys()].map((num) => (
					<option key={num + 1} value={num + 1}>
						{num + 1}
					</option>
				))}
			</select>
			{excuses.map((excuse, index) => (
				<input
					key={index}
					type="text"
					placeholder={`Excuse ${index + 1}`}
					value={excuse}
					onChange={(e) => handleExcuseChange(index, e)}
				/>
			))}
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
};


// 	const handleSubmit = () => {
// 		// Handle submission logic here
// 		console.log('Submitted excuses:', excuses);
// 		try {
// 			const request = axios.post("http://localhost:5000/ivr-call", {
// 				excuses
// 			});
// 			return;
// 		} catch (error) {
// 			console.log(error);
// 			return;
// 		}
// 	};

// 	return (
// 		<div className="excuse-form">
// 			<label htmlFor="num-questions">Select number of excuses:</label>
// 			<select id="num-questions" value={numQuestions} onChange={handleNumQuestionsChange}>
// 				{[...Array(10).keys()].map((num) => (
// 					<option key={num + 1} value={num + 1}>
// 						{num + 1}
// 					</option>
// 				))}
// 			</select>
// 			{excuses.map((excuse, index) => (
// 				<input
// 					key={index}
// 					type="text"
// 					placeholder={`Excuse ${index + 1}`}
// 					value={excuse}
// 					onChange={(e) => handleExcuseChange(index, e)}
// 				/>
// 			))}
// 			<button onClick={handleSubmit}>Submit</button>
// 		</div>
// 	);
// };

// export default Graph;
