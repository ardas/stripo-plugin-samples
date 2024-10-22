const styles = `
        .control-button {
            border-radius: 17px;
            padding: 5px 10px;
            border-color: grey;
        }
        .color-picker-container {
            display: none;
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            padding: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }
        .transparent-option.selected,
        .color-option.selected {
            border: 2px solid #000;
        }
        .color-option {
            width: 20px;
            height: 20px;
            margin: 2px;
            cursor: pointer;
            display: inline-block;
        }
        .transparent-option {
            width: 20px;
            height: 20px;
            margin: 2px;
            cursor: pointer;
            display: inline-block;
            background: repeating-linear-gradient(
                    45deg,
                    #ccc,
                    #ccc 10px,
                    #fff 10px,
                    #fff 20px
            );
        }
`;

(function () {
    let colorPickerContainer;
    function createColorPickerAndStyles(document) {
        colorPickerContainer = document.createElement('div');
        colorPickerContainer.id = 'externalColorPicker';
        colorPickerContainer.className = 'color-picker-container';
        document.body.appendChild(colorPickerContainer);
        if (!document.querySelector('#externalColorPickerStyles')) {
            const style = document.createElement('style');
            style.id = 'externalColorPickerStyles';
            style.innerHTML = styles;
            document.head.appendChild(style);
        }

    }

    function open(params, callback) {
        const {currentValue, transparentEnabled, inputElement, isTextColor } = params;

        createColorPickerAndStyles(inputElement.ownerDocument);
        const currentColor = currentValue === 'rgba(0, 0, 0, 0)' ? 'transparent' : (currentValue || '').toUpperCase();

        colorPickerContainer.innerHTML = '';

        const backgroundColors = [
            '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
            '#FF00FF', '#00FFFF', '#000000', '#FFFFFF',
        ];

        const textColors = [
            '#000000', '#333333', '#00FF00', '#999999',
            '#9900FF', '#FF00FF', '#FF0066', '#663300',
        ];

        const colors = isTextColor ? [...textColors] : [...backgroundColors];
        if (transparentEnabled) {
            colors.unshift('transparent');
        }

        if (!colors.includes(currentColor)) {
            colors.unshift(currentColor);
        }

        colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = color === 'transparent' ? 'transparent-option' : 'color-option';
            colorOption.style.backgroundColor = color;

            // Highlight the currentValue color
            if (color === currentColor) {
                colorOption.classList.add('selected');
            }

            colorOption.addEventListener('click', (e) => {
                const shouldLeaveColorPickerOpened = false;
                callback(color, shouldLeaveColorPickerOpened);
            });
            colorPickerContainer.appendChild(colorOption);
        });

        const rect = inputElement.getBoundingClientRect();
        colorPickerContainer.style.top = `${rect.bottom}px`;
        colorPickerContainer.style.left = `${rect.left}px`;
        colorPickerContainer.style.display = 'block';

        return colorPickerContainer;
    }

    function close() {
        if (colorPickerContainer) {
            colorPickerContainer.remove();
        }
    }

    window.ExternalColorPicker = { open, close };
})();
