// DOM Elements
const messagesContainer = document.getElementById('messagesContainer');
const weatherForm = document.getElementById('weatherForm');
const weatherInput = document.getElementById('weatherInput');
const submitBtn = document.getElementById('submitBtn');

// State
let isLoading = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  weatherForm.addEventListener('submit', handleSubmit);
  weatherInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  });
});

/**
 * Handle form submission
 */
async function handleSubmit(e) {
  e.preventDefault();

  const message = weatherInput.value.trim();

  if (!message || isLoading) {
    return;
  }

  // Add user message to chat
  addMessage(message, 'user');

  // Clear input
  weatherInput.value = '';
  weatherInput.focus();

  // Show loading state
  setLoading(true);

  try {
    // Send request to server
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get weather information');
    }

    const data = await response.json();

    // Add bot response to chat
    addMessage(data.response, 'bot');
  } catch (error) {
    // Add error message
    addMessage(`❌ Error: ${error.message}`, 'error');
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
}

/**
 * Add a message to the chat
 * @param {string} text - Message text
 * @param {string} sender - 'user', 'bot', or 'error'
 */
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = text;

  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);

  // Scroll to bottom
  scrollToBottom();
}

/**
 * Scroll chat container to bottom
 */
function scrollToBottom() {
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 0);
}

/**
 * Set loading state
 * @param {boolean} loading - Loading state
 */
function setLoading(loading) {
  isLoading = loading;
  submitBtn.disabled = loading;

  const submitText = submitBtn.querySelector('span:first-child');
  const loadingSpan = submitBtn.querySelector('.loading');

  if (loading) {
    submitText.style.display = 'none';
    loadingSpan.style.display = 'inline';
  } else {
    submitText.style.display = 'inline';
    loadingSpan.style.display = 'none';
  }
}

/**
 * Send suggestion
 * @param {string} suggestion - Suggestion text
 */
function sendSuggestion(suggestion) {
  weatherInput.value = suggestion;
  weatherForm.dispatchEvent(new Event('submit'));
}
