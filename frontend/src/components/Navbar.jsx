import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navbar({ dark, setDark }) {
	return (
		<nav className="flex items-center justify-between mb-6">
			<div className="flex items-center gap-3 text-2xl font-bold">
				<img src="/react.png" alt="React Logo" className="h-12 w-12" />
				<span>+</span>
				<img src="/go.png" alt="Go Logo" className="h-12 w-12" />
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">Daily Tasks</span>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setDark((d) => !d)}
					className="bg-black text-white hover:bg-gray-800 hover:text-white border border-black"
					title="Toggle dark mode"
				>
					{dark ? <Sun size={20} /> : <Moon size={20} />}
				</Button>
			</div>
		</nav>
	);
}

export default Navbar;
