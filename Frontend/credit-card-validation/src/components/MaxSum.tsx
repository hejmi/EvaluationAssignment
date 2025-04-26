import { useState } from 'react'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from './ui/card'

export default function MaxSum() {
	const [input, setInput] = useState('')
	const [result, setResult] = useState<number | null>(null)

	const calculate = (arr: number[]) => {
		let maxEven = Number.NEGATIVE_INFINITY
		let maxOdd = Number.NEGATIVE_INFINITY

		for (const num of arr) {
			if (num % 2 === 0) {
				maxEven = Math.max(maxEven, num)
			} else {
				maxOdd = Math.max(maxOdd, num)
			}
		}

		if (
			maxEven === Number.NEGATIVE_INFINITY ||
			maxOdd === Number.NEGATIVE_INFINITY
		) {
			return null
		}

		return maxEven + maxOdd
	}

	const handleSubmit = () => {
		try {
			const numbers = input
				.split(',')
				.map((n) => parseInt(n.trim(), 10))
				.filter((n) => !isNaN(n))

			setResult(calculate(numbers))
		} catch {
			setResult(null)
		}
	}

	return (
		<Card className="w-[320px] justify-center top-0">
			<CardHeader>
				<CardTitle className="text-2xl pt-5">Maximum Odd Sum</CardTitle>
				<CardDescription>
					Takes an array of numbers and returns the maximum sum of two numbers
					where their total sum is odd.
					<br />
					Enter numbers separated by commas
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Enter numbers like 19, 2, 42, 18"
					className="border p-2 rounded w-full"
				/>
				<button
					onClick={handleSubmit}
					className="bg-blue-500 text-white px-4 py-2 rounded">
					Calculate
				</button>
				<input
					type="text"
					disabled={true}
					value={result ?? ''}
					placeholder="Max sum"
					className="border p-2 rounded w-full"
				/>
			</CardContent>
		</Card>
	)
}
