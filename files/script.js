// --- Core Audio Function ---
function playAudio(path) {
    // This is a placeholder function. In a real scenario,
    // you would have different audio files for each item.
    const audio = new Audio(path);
    audio.play().catch(e => console.error("Audio playback failed:", e));
}

// --- Event Listeners - Run when the DOM is fully loaded ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Instructions Module: Button Flash Animation ---
    const instructionButtons = document.querySelectorAll('.instruction-item');
    instructionButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('flash');
            // Remove the class after the animation completes
            setTimeout(() => {
                button.classList.remove('flash');
            }, 500);
        });
    });

    // --- Colours & Numbers Module: Number Highlight ---
    const numberButtons = document.querySelectorAll('.number-item button');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const numberItem = button.parentElement;
            numberItem.classList.add('highlight');
            // Remove highlight after a short delay
            setTimeout(() => {
                numberItem.classList.remove('highlight');
            }, 500);
        });
    });

    // --- Quiz Module: Activity A (Classification) ---
    const classificationItems = document.querySelectorAll('.classification-activity .item');
    const classificationBoxes = document.querySelectorAll('.classification-activity .box');
    let selectedItem = null;

    classificationItems.forEach(item => {
        item.addEventListener('click', () => {
            // Deselect if clicking the same item
            if (item.classList.contains('selected')) {
                item.classList.remove('selected');
                selectedItem = null;
            } else {
                // Remove selection from others and select the new one
                classificationItems.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                selectedItem = item;
            }
        });
    });

    classificationBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (selectedItem) {
                // Move the item to the box (visually)
                box.appendChild(selectedItem);
                selectedItem.classList.remove('selected');
                selectedItem = null; // Reset selection
            }
        });
    });


    // --- Quiz Module: Activity B (Matching) ---
    const matchingImages = document.querySelectorAll('.matching-images img');
    const matchingWords = document.querySelectorAll('.matching-words .word');
    let selectedImage = null;
    let selectedWord = null;

    const resetSelections = () => {
        selectedImage = null;
        selectedWord = null;
        matchingImages.forEach(el => el.classList.remove('selected', 'correct', 'incorrect'));
        matchingWords.forEach(el => el.classList.remove('selected', 'correct', 'incorrect'));
    };

    const checkMatch = () => {
        if (selectedImage && selectedWord) {
            const isMatch = selectedImage.dataset.match === selectedWord.dataset.match;

            if (isMatch) {
                selectedImage.classList.add('correct');
                selectedWord.classList.add('correct');
            } else {
                selectedImage.classList.add('incorrect');
                selectedWord.classList.add('incorrect');
            }

            // After a delay, reset the borders and selections
            setTimeout(() => {
                if(isMatch) {
                    // Visually disable or hide matched items
                    selectedImage.style.opacity = '0.5';
                    selectedWord.style.opacity = '0.5';
                    selectedImage.classList.remove('correct', 'selected');
                    selectedWord.classList.remove('correct', 'selected');
                } else {
                     resetSelections();
                }
            }, 1000);
        }
    };

    matchingImages.forEach(img => {
        img.addEventListener('click', () => {
            if (img.style.opacity === '0.5') return; // Already matched
            selectedImage = img;
            matchingImages.forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
            checkMatch();
        });
    });

    matchingWords.forEach(word => {
        word.addEventListener('click', () => {
            if (word.style.opacity === '0.5') return; // Already matched
            selectedWord = word;
            matchingWords.forEach(w => w.classList.remove('selected'));
            word.classList.add('selected');
            checkMatch();
        });
    });

});