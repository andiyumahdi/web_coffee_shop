let playerScore = 0;
let computerScore = 0;

function updateScore(result) {
    if (result === "You Win!") {
        playerScore++;
        document.getElementById('player-score').textContent = playerScore;
    } else if (result === "Computer Wins!") {
        computerScore++;
        document.getElementById('computer-score').textContent = computerScore;
    }
}


const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(button => {
    button.addEventListener('change', function() {
        const id = this.id;
        let result;

        if (id.includes('rock-paper') || id.includes('paper-scissors') || id.includes('scissors-rock')) {
            result = "Computer Wins!";
        } else if (id.includes('paper-rock') || id.includes('scissors-paper') || id.includes('rock-scissors')) {
            result = "You Win!";
        } else {
            result = "You Tied!";
        }

        updateScore(result);
    });
});

// Refresh round (hanya mereset pilihan, bukan skor)
document.querySelector('input[type="reset"]').addEventListener('click', function(e) {
    // Mencegah reset default yang akan menghapus semua input
    e.preventDefault();
    
    // Menghapus pilihan radio yang dipilih
    radioButtons.forEach(button => {
        button.checked = false;
    });

    // Menghapus pesan hasil
    document.querySelector('#message h2').textContent = '';
});

// Reset total skor (hanya dipanggil saat halaman dimuat)
function resetTotalScore() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('player-score').textContent = '0';
    document.getElementById('computer-score').textContent = '0';
}

// Reset total skor ketika halaman dimuat
window.onload = resetTotalScore;

// Tambahkan event listener untuk form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form submission
});