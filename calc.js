let memory = 0;
        let lastResult = '';

        function appendToDisplay(value) {
            const display = document.getElementById('display');
            if (display.value === 'Error' || display.value === '0') {
                display.value = value;
            } else {
                display.value += value;
            }
        }

        function clearDisplay() {
            document.getElementById('display').value = '0';
        }

        function clearEntry() {
            document.getElementById('display').value = '0';
        }

        function backspace() {
            const display = document.getElementById('display');
            display.value = display.value.slice(0, -1) || '0';
        }

        function toggleSign() {
            const display = document.getElementById('display');
            if (display.value !== '0' && display.value !== 'Error') {
                display.value = display.value.startsWith('-') ? 
                    display.value.slice(1) : '-' + display.value;
            }
        }

        function calculatePercentage() {
            const display = document.getElementById('display');
            try {
                display.value = (eval(display.value) / 100).toString();
            } catch (error) {
                display.value = 'Error';
            }
        }

        function memoryStore() {
            const display = document.getElementById('display');
            try {
                memory = eval(display.value);
            } catch (error) {
                display.value = 'Error';
            }
        }

        function memoryRecall() {
            document.getElementById('display').value = memory.toString();
        }

        function memoryClear() {
            memory = 0;
        }

        function calculate() {
            try {
                const display = document.getElementById('display');
                const expression = display.value;
                const result = eval(expression);
                display.value = result;
                
                // Update history
                lastResult = `${expression} = ${result}`;
                document.getElementById('lastCalculation').textContent = lastResult;
            } catch (error) {
                document.getElementById('display').value = 'Error';
            }
        }

        // Add keyboard support
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            if (/[\d\+\-\*\/\(\)\.]/.test(key)) {
                event.preventDefault();
                appendToDisplay(key);
            } else if (key === 'Enter') {
                event.preventDefault();
                calculate();
            } else if (key === 'Escape') {
                event.preventDefault();
                clearDisplay();
            } else if (key === 'Backspace') {
                event.preventDefault();
                backspace();
            }
        });

        // Initialize display
        window.onload = () => {
            clearDisplay();
        }