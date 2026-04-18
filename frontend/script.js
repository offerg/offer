// Supabase client setup
// Replace with your actual Supabase URL and anon key
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Example conversation ID - replace with actual conversation
const currentConversationId = 'example-conversation-id'

// DOM elements
const messagesDiv = document.getElementById('messages')
const messageInput = document.getElementById('messageInput')

// Fetch messages by conversation
async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }

  return data
}

// Display messages
function displayMessages(messages) {
  messagesDiv.innerHTML = ''
  messages.forEach(message => {
    const messageDiv = document.createElement('div')
    messageDiv.textContent = `${message.sender_id}: ${message.text}`
    messagesDiv.appendChild(messageDiv)
  })
}

// Send a message
async function sendMessage() {
  const text = messageInput.value.trim()
  if (!text) return

  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        conversation_id: currentConversationId,
        sender_id: 'user-id', // Replace with actual user ID
        text: text
      }
    ])

  if (error) {
    console.error('Error sending message:', error)
  } else {
    messageInput.value = ''
  }
}

// Load initial messages
async function loadMessages() {
  const messages = await getMessages(currentConversationId)
  displayMessages(messages)
}

// Realtime subscription for live chat
supabase
  .channel('chat')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${currentConversationId}`
    },
    (payload) => {
      console.log('New message:', payload.new)
      // Reload messages to show the new one
      loadMessages()
    }
  )
  .subscribe()

// Initialize
loadMessages()