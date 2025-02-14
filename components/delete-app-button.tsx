"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { deleteApp } from "@/app/actions/apps";
import { useState } from "react";
import { Trash } from "lucide-react";

interface DeleteAppButtonProps {
	appId: string;
	onAppDeleted?: (appId: string) => void;
}

export function DeleteAppButton({ appId, onAppDeleted }: DeleteAppButtonProps) {
	const [open, setOpen] = useState(false);
	const handleConfirmDelete = async () => {
		try {
			await deleteApp(appId);
			onAppDeleted?.(appId);
		} catch (error) {
			console.error("Failed to delete app:", error);
			// Handle error (e.g., show an error message to the user)
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive">
					<Trash />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form
					onSubmit={(event) => {
						handleConfirmDelete().then(() => setOpen(false));
						event.preventDefault();
					}}
				>
					<DialogHeader>
						<DialogTitle>Confirm Deletion</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this app? This action can&apos;t
							be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit">Delete</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
