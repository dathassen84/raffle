const ticketGrid = document.getElementById('ticketGrid');
const walletButton = document.getElementById('walletButton');
const randomTicketButton = document.getElementById('randomTicketButton');
const gameNumberElement = document.getElementById('gameNumber');
const winningNumberElement = document.getElementById('winningNumber');

// Generate ticket buttons
for (let i = 1; i <= 25; i++) {
    const button = document.createElement('button');
    button.classList.add('ticket-button');
    button.innerText = i;
    button.dataset.ticketNumber = i;
    button.addEventListener('click', () => purchaseTicket(i));
    ticketGrid.appendChild(button);
}

// Connect Phantom Wallet
walletButton.addEventListener('click', async () => {
    try {
        const { solana } = window;
        if (solana && solana.isPhantom) {
            await solana.connect();
            const walletAddress = solana.publicKey.toString();
            walletButton.textContent = `Connected: ${walletAddress.slice(0, 6)}...`;
        } else {
            alert('Phantom Wallet not found!');
        }
    } catch (err) {
        console.error('Wallet connection failed:', err);
    }
});

// Purchase Ticket
function purchaseTicket(ticketNumber) {
    const button = document.querySelector(`[data-ticket-number="${ticketNumber}"]`);
    if (!button.classList.contains('sold')) {
        button.classList.add('sold');
        button.disabled = true;
        alert(`You purchased ticket #${ticketNumber}`);
    }
}

// Buy Random Ticket
randomTicketButton.addEventListener('click', () => {
    const availableTickets = Array.from(document.querySelectorAll('.ticket-button:not(.sold)'));
    if (availableTickets.length > 0) {
        const randomTicket = availableTickets[Math.floor(Math.random() * availableTickets.length)];
        purchaseTicket(randomTicket.dataset.ticketNumber);
    } else {
        alert('No tickets available');
    }
});

// Mock Game Info
setInterval(() => {
    gameNumberElement.textContent = Math.floor(Math.random() * 100);
    winningNumberElement.textContent = Math.floor(Math.random() * 25) + 1;
}, 5000);
