// Global audio playback function
function playAudio(audioSrc) {
    const audio = new Audio(audioSrc);
    audio.play()
        .catch(e => console.error("Audio playback failed:", e));
}

// Quiz functionality
document.addEventListener('DOMContentLoaded', () => {
    const quizItems = document.querySelectorAll('.quiz-item');
    if (quizItems.length === 0) return;

    let selectedItem = null;

    quizItems.forEach(item => {
        item.addEventListener('click', () => {
            // Prevent interaction after a pair is correctly matched
            if (item.classList.contains('correct')) {
                return;
            }

            // Deselect if clicking the same item again
            if (item === selectedItem) {
                item.classList.remove('selected');
                selectedItem = null;
                return;
            }

            // If nothing is selected, select the current item
            if (!selectedItem) {
                // Prevent selecting from the same column twice
                const parentCol = item.closest('.quiz-col');
                const anotherSelected = parentCol.querySelector('.selected');
                if (anotherSelected) {
                    anotherSelected.classList.remove('selected');
                }

                item.classList.add('selected');
                selectedItem = item;
            } else {
                // An item is already selected, so this is the second selection
                const firstItem = selectedItem;
                const secondItem = item;

                // Ensure selection is from different columns
                if (firstItem.closest('.quiz-col') === secondItem.closest('.quiz-col')) {
                    firstItem.classList.remove('selected');
                    secondItem.classList.add('selected');
                    selectedItem = secondItem;
                    return;
                }

                // Check for a match
                if (firstItem.dataset.matchId === secondItem.dataset.matchId) {
                    firstItem.classList.add('correct');
                    secondItem.classList.add('correct');
                    firstItem.classList.remove('selected');
                    selectedItem = null;
                } else {
                    firstItem.classList.add('incorrect');
                    secondItem.classList.add('incorrect');

                    // Reset after a short delay for the user to see the result
                    setTimeout(() => {
                        firstItem.classList.remove('incorrect', 'selected');
                        secondItem.classList.remove('incorrect');
                        selectedItem = null;
                    }, 1000);
                }
            }
        });
    });
});
