import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IMaskInput } from 'react-imask'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'
import { useState } from 'react'
import creditCardType from 'credit-card-type'
import CreditCard from './CreditCard'

const cardSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	number: z
		.string()
		.regex(
			/^\d{4} \d{4} \d{4} \d{4}$/,
			'Invalid format, use 0000 0000 0000 0000'
		),
	expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid format'),
	cvv: z.string().length(3, 'CVV must be 3 digits'),
})

type CardData = z.infer<typeof cardSchema>

export default function CreditCardForm() {
	const {
		handleSubmit,
		setValue,
		trigger,
		watch,
		formState: { errors },
	} = useForm<CardData>({
		resolver: zodResolver(cardSchema),
	})

	const [cardType, setCardType] = useState<string>('')

	const creditCardName = watch('name')
	const creditCardNumber = watch('number')
	const creditCardExpiry = watch('expiry')
	const creditCardCvv = watch('cvv')

	const handleCardNumberInput = (val: string) => {
		setValue('number', val)
		const cleanNumber = val.replace(/\s/g, '')
		const types = creditCardType(cleanNumber)
		setCardType(types.length ? types[0].niceType : '')
	}

	const onSubmit: SubmitHandler<CardData> = (data) => {
		console.log('Card data submitted:', data)
	}

	return (
		<div className="flex flex-row gap-5">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-2xl">Pay with credit card</CardTitle>
					<CardDescription>Enter your card details to pay</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="mb-4 mt-4">
							<IMaskInput
								mask={/^[a-zA-Z\s'-]*$/}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Name on Card"
								onAccept={(value: string) => {
									setValue('name', value, {
										shouldDirty: true,
										shouldTouch: true,
									})
								}}
								onBlur={(event) => {
									setValue('name', event.target.value)
									trigger('name')
								}}
							/>
							{errors.name && (
								<span className="text-red-500 text-xs ml-2 pb-4">
									{errors.name.message}
								</span>
							)}
						</div>
						<div className="mb-4 mt-4">
							<IMaskInput
								mask="0000 0000 0000 0000"
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Card Number"
								onAccept={handleCardNumberInput}
								onBlur={(event) => {
									setValue('number', event.target.value)
									trigger('number')
								}}
							/>
							{errors.number && (
								<span className="text-red-500 text-xs ml-2 pb-4">
									{errors.number.message}
								</span>
							)}
						</div>
						<div className="mb-4 mt-4 grid grid-cols-2 gap-x-4">
							<IMaskInput
								mask={'00/00'}
								onAccept={(value: string) => {
									setValue('expiry', value, {
										shouldDirty: true,
										shouldTouch: true,
									})
								}}
								onBlur={(event) => {
									setValue('expiry', event.target.value)
									trigger('expiry')
								}}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="MM/YY"
							/>
							<IMaskInput
								mask={'000'}
								onAccept={(value: string) => {
									setValue('cvv', value, {
										shouldDirty: true,
										shouldTouch: true,
									})
								}}
								onBlur={(event) => {
									setValue('cvv', event.target.value)
									trigger('cvv')
								}}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="CVV"
							/>

							<span className="text-red-500 text-xs ml-2 pb-0">
								{errors.expiry && errors.expiry.message}
							</span>

							<span className="text-red-500 text-xs ml-2 pb-0">
								{errors.cvv && errors.cvv.message}
							</span>
						</div>
						<CardFooter className="flex justify-between p-0">
							<Button variant="outline">Cancel</Button>
							<Button onClick={handleSubmit(onSubmit)}>Submit</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
			<div className="flex top-0 items-start">
				<CreditCard
					name={creditCardName}
					number={creditCardNumber}
					expiry={creditCardExpiry}
					cvv={creditCardCvv}
					cardType={cardType}
				/>
			</div>
		</div>
	)
}
