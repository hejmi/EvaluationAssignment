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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { useState } from 'react'
import creditCardType from 'credit-card-type'
import valid from 'card-validator'
import CreditCard from './CreditCard'
import { Verification } from 'card-validator/dist/types'
import { PiCheckBold, PiX } from 'react-icons/pi'

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

interface validationI {
	number: Verification
	expiryMonth: Verification
	expiryYear: Verification
	cvv: Verification
	cardHolderName: Verification
}

type CardData = z.infer<typeof cardSchema>

export default function CreditCardForm() {
	const {
		handleSubmit,
		setValue,
		getValues,
		trigger,
		watch,
		formState: { errors },
	} = useForm<CardData>({
		resolver: zodResolver(cardSchema),
	})

	const [cardType, setCardType] = useState<string>('')
	const [cardValidation, setCardValidation] = useState<validationI | null>(null)

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

	const onSubmit: SubmitHandler<CardData> = () => {
		const unmaskedData = getValues()
		validateCard(unmaskedData)
	}

	const validateCard = (card: CardData) => {
		const number = card.number.replace(/\s/g, '')
		const expiryYear = card.expiry.split('/')[1]
		const expiryMonth = card.expiry.split('/')[0]
		const cvv = card.cvv
		const name = card.name
		setCardValidation({
			number: valid.number(number),
			expiryYear: valid.expirationYear(expiryYear),
			expiryMonth: valid.expirationMonth(expiryMonth),
			cvv: valid.cvv(cvv),
			cardHolderName: valid.cardholderName(name),
		})
	}

	return (
		<>
			<Dialog
				modal={false}
				open={cardValidation !== null}
				onOpenChange={() => setCardValidation(null)}>
				<DialogContent className="sm:max-w-[305px] bg-white justify-center">
					<DialogHeader className="justify-center items-center">
						<DialogTitle>Card Validation</DialogTitle>
						<DialogDescription className="text-center">
							Please check the following information to ensure your card is
							valid.
						</DialogDescription>
						<div className="flex mt-5 justify-start self-start items-center gap-4">
							{cardValidation?.cardHolderName.isValid ? (
								<PiCheckBold color="green" />
							) : (
								<PiX color="red" />
							)}
							Card Holder Name
						</div>
						<div className="flex justify-start self-start items-center gap-4">
							{cardValidation?.number.isValid ? (
								<PiCheckBold color="green" />
							) : (
								<PiX color="red" />
							)}
							Card Number
						</div>
						<div className="flex justify-start self-start items-center gap-4">
							{cardValidation?.expiryMonth.isValid &&
							cardValidation?.expiryYear.isValid ? (
								<PiCheckBold color="green" />
							) : (
								<PiX color="red" />
							)}
							Expiry
						</div>

						<div className="flex justify-start self-start items-center gap-4">
							{cardValidation?.cvv.isValid ? (
								<PiCheckBold color="green" />
							) : (
								<PiX color="red" />
							)}
							CVV
						</div>
						<div className="mt-4 mb-0 justify-center self-center items-center text-center">
							{cardValidation?.cvv.isValid &&
							cardValidation?.expiryYear.isValid &&
							cardValidation?.expiryMonth.isValid &&
							cardValidation?.number.isValid &&
							cardValidation?.cardHolderName.isValid ? (
								<>
									<span className="text-green-600 font-bold">
										Your card details are valid
									</span>
									<br />
									Thank you!
								</>
							) : (
								<>
									<span className="text-red-600 font-bold">
										Your card details are invalid
									</span>
									<br />
									Please check your card details and try again.
								</>
							)}
						</div>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={() => setCardValidation(null)}>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<div className="flex flex-col gap-0 items-center">
				<div className="flex top-4 relative flex-col h-full ">
					<CreditCard
						name={creditCardName}
						number={creditCardNumber}
						expiry={creditCardExpiry}
						cvv={creditCardCvv}
						cardType={cardType}
					/>
				</div>
				<Card className="w-[300px] justify-center top-0">
					<CardHeader>
						<CardTitle className="text-2xl pt-5">
							Pay with credit card
						</CardTitle>
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
										setValue('name', value)
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
										setValue('expiry', value)
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
									type="password"
									onAccept={(value: string) => {
										setValue('cvv', value)
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
			</div>
		</>
	)
}
