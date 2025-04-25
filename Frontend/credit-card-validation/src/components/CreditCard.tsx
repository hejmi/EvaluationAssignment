import {
	SiVisa,
	SiMastercard,
	SiAmericanexpress,
	SiDiscover,
	SiJcb,
	SiDinersclub,
} from 'react-icons/si'
import { PiRectangleDashedThin } from 'react-icons/pi'
import blankCard from '@/assets/blank_card.png'

const cardIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
	visa: SiVisa,
	mastercard: SiMastercard,
	americanexpress: SiAmericanexpress,
	discover: SiDiscover,
	dinersclub: SiDinersclub,
	jcb: SiJcb,
	unknown: PiRectangleDashedThin,
}

interface CreditCardProps {
	name: string
	number: string
	expiry: string
	cvv: string
	cardType: string
}

const maskCardNumber = (input: string): string => {
	if (!input) return ''
	const cleanedInput = input.replace(/\D/g, '')

	const first4 = cleanedInput.slice(0, 4)
	let masked = ''

	for (let i = 4; i < cleanedInput.length && i < 12; i++) {
		if (i % 4 === 0 && i !== 4) masked += ' '
		masked += '*'
	}
	const last4 = cleanedInput.slice(12, cleanedInput.length)

	if (cleanedInput.length <= 4) {
		return first4
	} else if (cleanedInput.length <= 12) {
		return `${first4} ${masked}`
	} else {
		return `${first4} ${masked} ${last4}`
	}
}

export default function CreditCard({
	name,
	number,
	expiry,
	cvv,
	cardType,
}: CreditCardProps) {
	const Icon =
		cardIconMap[cardType?.replace('-', '').toLowerCase()] || cardIconMap.unknown
	return (
		<div className="relative w-[350px] h-[220px]">
			<img
				src={blankCard}
				alt="Blank Credit Card"
				className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg"
			/>

			<div className="absolute inset-0 p-6 pt-3 flex flex-col ml-3">
				<div className="justify-items-end">
					<Icon size={48} />
				</div>
				<div className="w-full max-w-sm">
					<div className="items-center mt-15 h-10">
						<div className="text-2xl font-mono">{maskCardNumber(number)}</div>
						<div className="text-xs font-mono text-black">
							{number?.substring(0, 4)}
						</div>
					</div>

					<div className="text-sm font-mono h-7 pl-40">
						{expiry?.replace('/', ' ')}
					</div>

					<div className="flex justify-between">
						<div className="text-sm font-mono text-black">
							{name?.toUpperCase()}
						</div>
						<div className="text-sm font-mono text-black">
							{cvv?.replace(/./g, '*')}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
