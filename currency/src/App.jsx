import { useState } from 'react';
import { InputBox } from './components'; // Ensure correct path
import useCurrencyInfo from './hooks/useCurrencyInfo'; // Ensure correct path

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState('usd');
    const [to, setTo] = useState('inr');
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);
    const options = currencyInfo ? Object.keys(currencyInfo) : [];

    const swap = () => {
        const currentFrom = from;
        const currentTo = to;
        const currentAmount = amount;
        const currentConvertedAmount = convertedAmount;

        setFrom(currentTo);
        setTo(currentFrom);
        setAmount(currentConvertedAmount);
        setConvertedAmount(currentAmount);
    };

    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        } else {
            console.error(`Currency information for ${to} not found`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/006/852/804/original/abstract-blue-background-simple-design-for-your-website-free-vector.jpg')` }}>
            <div className="w-full max-w-md mx-auto bg-white bg-opacity-30 shadow-lg rounded-lg p-5">
                <form onSubmit={(e) => { e.preventDefault(); convert(); }}>
                    <div className="mb-4">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            onAmountChange={(amt) => setAmount(amt)}
                            selectCurrency={from}
                        />
                    </div>
                    <div className="relative mb-4">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-1"
                            onClick={swap}
                        >
                            Swap
                        </button>
                    </div>
                    <div className="mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
