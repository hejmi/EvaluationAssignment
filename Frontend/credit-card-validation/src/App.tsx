import CreditCardForm from './components/CreditCardForm'
import InputCleaner from './components/InputCleaner'
import MaxSum from './components/MaxSum'

function App() {
	return (
		<div className="flex-col flex items-center justify-center">
			<CreditCardForm />
			<div className="mt-10 mb-10 flex flex-row gap-5 justify-start items-start">
				<InputCleaner />
				<MaxSum />
			</div>
		</div>
	)
}

export default App
