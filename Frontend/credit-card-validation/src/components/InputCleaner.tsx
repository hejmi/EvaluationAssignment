import { useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'
import { Button } from './ui/button'

export default function InputCleaner() {
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')

	const cleanText = (input: string) => {
		if (input.length < 4) return input
		const result = []
		let count = 1

		for (let i = 0; i < input.length; i++) {
			const current = input[i]
			const prev = input[i - 1]

			if (i > 0 && current === prev && /[a-z]/.test(current)) {
				count++
			} else {
				count = 1
			}

			if (/[a-z]/.test(current)) {
				if (count < 4) {
					result.push(current)
				}
			} else {
				result.push(current)
				count = 1
			}
		}
		return result.join('')
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInput(value)
		setOutput(cleanText(value))
	}

	return (
		<Card className="w-[300px] justify-center top-0">
			<form>
				<CardHeader>
					<CardTitle className="text-2xl pt-5">Input Cleaner</CardTitle>
					<CardDescription className="mb-3">
						The cleaner removes instances of four identical consecutive
						lowercase letters.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-3">
					<input
						type="text"
						value={input}
						onChange={handleChange}
						placeholder="Enter Value to Clean"
						className="border p-2 rounded w-full"
					/>
					<textarea
						rows={3}
						disabled={true}
						value={output}
						placeholder="Cleaned Output"
						className="border p-2 rounded w-full"
					/>
				</CardContent>
				<CardFooter className="flex flex-col gap-3 w-full mt-4">
					<Button variant="outline" className="w-full rounded">
						Clear Input
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}
