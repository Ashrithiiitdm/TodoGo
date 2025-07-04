import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function TodoForm({ input, onInputChange, onAdd, onEnter }) {
	return (
		<div className="flex items-center gap-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl px-4 py-3 shadow-md">
			<Input
				placeholder="Add a new task..."
				value={input}
				onChange={onInputChange}
				onKeyDown={onEnter}
				className="flex-1 text-lg bg-transparent border-none focus:ring-0 focus:outline-none"
			/>
			<Button
				onClick={onAdd}
				size="lg"
				className="rounded-full px-6 py-2 text-lg font-semibold shadow-md"
			>
				Add
			</Button>
		</div>
	);
}

export default TodoForm;
