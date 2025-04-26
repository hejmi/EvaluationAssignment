import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreditCardForm from './CreditCardForm'
import '@testing-library/jest-dom'

describe('CreditCardForm', () => {
	it('Form renders correctly', () => {
		render(<CreditCardForm />)

		expect(screen.getByPlaceholderText('Name on Card')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Card Number')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('MM/YY')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('CVV')).toBeInTheDocument()
	})

	it('Opens validation dialog after submit, validation succeeds', async () => {
		render(<CreditCardForm />)

		fireEvent.input(screen.getByTestId('name-input'), {
			target: { value: 'John Doe' },
		})
		fireEvent.input(screen.getByTestId('card-number-input'), {
			target: { value: '4242 4242 4242 4242' },
		})
		fireEvent.input(screen.getByTestId('expiry-input'), {
			target: { value: '12/25' },
		})
		fireEvent.input(screen.getByTestId('cvv-input'), {
			target: { value: '123' },
		})

		fireEvent.click(screen.getByTestId('card-submit-button'))

		expect(
			await screen.findByText('Your card details are valid')
		).toBeInTheDocument()
	})

	it('Opens validation dialog after submit, validation fails', async () => {
		render(<CreditCardForm />)

		fireEvent.input(screen.getByTestId('name-input'), {
			target: { value: 'John Doe' },
		})
		fireEvent.input(screen.getByTestId('card-number-input'), {
			target: { value: '4242 4242 4242 4242' },
		})
		fireEvent.input(screen.getByTestId('expiry-input'), {
			target: { value: '12/24' },
		})
		fireEvent.input(screen.getByTestId('cvv-input'), {
			target: { value: '123' },
		})

		fireEvent.click(screen.getByTestId('card-submit-button'))

		expect(
			await screen.findByText('Your card details are invalid')
		).toBeInTheDocument()
	})
})
