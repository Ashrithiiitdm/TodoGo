import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Hourglass, Trash2 } from "lucide-react";

const statusColors = {
	done: "bg-green-600 text-white",
	"in progress": "bg-yellow-500 text-black",
};

function TodoList({ tasks, onToggleStatus, onRemove }) {
	return (
		<div className="space-y-4">
			{tasks.map((task, idx) => (
				<Card
					key={idx}
					className="w-full mb-4 shadow-lg rounded-2xl p-4 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center"
				>
					<div className="flex-1 min-w-0">
						<span
							className={`text-lg font-medium break-words ${
								task.status === "done"
									? "line-through text-green-500"
									: "text-gray-900 dark:text-zinc-100"
							}`}
						>
							{task.text}
						</span>
					</div>
					<div className="flex items-center gap-3 mt-3 md:mt-0 md:ml-4">
						<Badge
							className={
								task.status === "done"
									? "bg-green-600 text-white"
									: "bg-yellow-500 text-black"
							}
						>
							{task.status}
						</Badge>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => onToggleStatus(idx)}
							title="Toggle status"
						>
							{task.status === "done" ? (
								<Check className="text-green-500" size={18} />
							) : (
								<Hourglass className="text-yellow-500" size={18} />
							)}
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => onRemove(idx)}
							title="Delete"
						>
							<Trash2 className="text-red-500" size={18} />
						</Button>
					</div>
				</Card>
			))}
		</div>
	);
}

export default TodoList;
