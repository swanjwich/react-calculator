import { useState, useEffect } from "react";

export default function Calculator() {
    const [expression, setExpression] = useState('');
    const [current, setCurrent] = useState('');
    const [evaluated, setEvaluated] = useState(false);
    const [awaitingSecondOperand, setAwaitingSecondOperand] = useState(false);

    const handleClick = (value) => {
        if (!isNaN(value) || value === '.' || value === "00") {
            if (evaluated) {
                setCurrent(value);
                setExpression('');
                setEvaluated(false);
                return;
            }

            if (awaitingSecondOperand) {
                setCurrent(value);
                setAwaitingSecondOperand(false);
            } else {
                setCurrent((prev) => prev + value);
            }
        }

        else if (["+", "-", "×", "÷", "%"].includes(value)) {
            if (current === '') return;

            if (evaluated) {
                setExpression(current + ' ' + value + ' ');
                setEvaluated(false);
            } else {
                setExpression((prev) => prev + current + ' ' + value + ' ');
            }
            setAwaitingSecondOperand(true);
        }

        else if (value === '=') {
            if (current === '') return;
            const fullExpr = expression + current;
            const jsExpr = fullExpr.replace(/×/g, '*').replace(/÷/g, '/');
            try {
                const result = eval(jsExpr);
                setExpression(fullExpr + ' =');
                setCurrent(result.toString());
                setEvaluated(true);
            } catch {
                setCurrent('Error');
                setEvaluated(true);
            }
        }

        else if (value === 'C') {
            setCurrent('');
            setExpression('');
        } else if (value === 'CE') {
            setCurrent('');
        } else {
            setCurrent("Error");
        }
    };

    useEffect(() => {
        const handleKey = (e) => {
            const key = e.key;
            if (/\d/.test(key)) {
                handleClick(key);
            }
            else if (['.', 'Enter', '/', '=', '+', '-', '*', 'Escape', 'Backspace'].includes(key)) {
                switch (key) {
                    case 'Enter':
                    case '=': handleClick('='); break;
                    case '*': handleClick('×'); break;
                    case '/': handleClick('÷'); break;
                    case 'Escape': handleClick('C'); break;
                    case 'Backspace': handleClick('CE'); break;
                    default: handleClick(key);
                }
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    });

    const buttons = [
        "C", "CE", "%", "÷",
        "7", "8", "9", "×",
        "4", "5", "6", "+",
        "1", "2", "3", "-",
        ".", "0", "00", "=",
    ];
    return (
        <>
            <div className="mb-4 text-right font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <p className="text-md text-gray-500 dark:text-gray-300 break-words">{expression || '0'}</p>
                <p className="text-4xl font-bold text-gray-800 dark:text-white break-words">{current || '0'}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {buttons.map((key) => (
                    <button
                        key={key}
                        onClick={() => handleClick(key)}
                        className={`cursor-pointer p-3 rounded text-lg font-bold transition-all
                  ${key === '='
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500'
                            }`}
                    >
                        {key}
                    </button>
                ))}
            </div>
        </>
    );
}