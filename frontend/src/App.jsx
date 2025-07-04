import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import axios from "../axios.js";

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");
	// Initialize dark mode from localStorage
	const [dark, setDark] = useState(() => {
		const stored = localStorage.getItem("theme");
		return stored === "dark";
	});

	// Fetch tasks from backend on mount
	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await axios.get("/api/todos");
				if (response.status === 200) {
					console.log("Fetched todos successfully:", response.data);
					setTasks(response.data);
				}
			} catch (err) {
				console.error("Failed to fetch todos", err);
			}
		};

		fetchTasks();
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
		localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);

	const addTask = async () => {
		if (input.trim()) {
			try {
				const response = await axios.post("/api/todos", {
					body: input,
					completed: false,
				});
				setTasks((prev) => [...prev, response.data]);
				setInput("");
			} catch (err) {
				console.error("Failed to add todo", err);
			}
		}
	};

	const removeTask = async (idx) => {
		const todo = tasks[idx];
		try {
			const response = await axios.delete(`/api/todos/${todo._id}`);
			if (response.status === 200) {
				console.log("Todo deleted successfully:", response.data);
				setTasks((prev) => prev.filter((_, i) => i !== idx));
			}
		} catch (err) {
			console.error("Failed to delete todo", err);
		}
	};

	const toggleStatus = async (idx) => {
		const todo = tasks[idx];
		try {
			const response = await axios.patch(`/api/todos/${todo._id}`);
			if (response.status === 200) {
				console.log("Todo updated successfully:", response.data);
				setTasks((prev) =>
					prev.map((t, i) =>
						i === idx ? { ...t, completed: !t.completed } : t
					)
				);
			}
		} catch (err) {
			console.error("Failed to update todo", err);
		}
	};

	return (
		<div
			className={`min-h-screen w-full relative transition-colors duration-500 ${
				dark ? "dark" : ""
			}`}
			style={{
				background: dark
					? "linear-gradient(135deg, #232526 0%, #414345 100%)"
					: "#fff",
			}}
		>
			<div className="container mx-auto px-4 py-8">
				<div className="w-full max-w-2xl mx-auto space-y-8">
					<Navbar dark={dark} setDark={setDark} />
					<h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
						Today's Tasks
					</h1>
					<TodoForm
						input={input}
						onInputChange={(e) => setInput(e.target.value)}
						onAdd={addTask}
						onEnter={(e) => e.key === "Enter" && addTask()}
					/>
					<TodoList
						tasks={tasks.map((t) => ({
							text: t.body,
							status: t.completed ? "done" : "in progress",
							_id: t._id,
						}))}
						onToggleStatus={toggleStatus}
						onRemove={removeTask}
					/>
				</div>
			</div>
		</div>
	);
}
