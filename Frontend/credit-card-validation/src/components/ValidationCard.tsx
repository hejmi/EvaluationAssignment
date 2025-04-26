import { Verification } from 'card-validator/dist/types'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

export default function ValidationCard({
	cardValidation,
}: {
	cardValidation: Verification[] | null
}) {
	// const valid = cardValidation?.every((validation) => validation.isValid)
	console.log(cardValidation)
	return (
		<Dialog open={true}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">Validation</div>
					<div className="grid grid-cols-4 items-center gap-4"></div>
				</div>
				<DialogFooter>
					<Button>Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
