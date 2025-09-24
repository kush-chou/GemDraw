# **App Name**: CogniCanvas

## Core Features:

- Excalidraw Canvas: Display a full-screen Excalidraw canvas for collaborative drawing.
- Chat Panel: Provide a chat panel for real-time communication and tool usage next to the canvas.

## Style Guidelines:

- Primary color: Sky blue (#87CEEB), use for the Chat Panel header and primary action buttons.
- Background color: Light grey (#F0F0F0), use for the main application background, surrounding the primary components.
- Accent color: Soft teal (#66CDAA), use for the Send button in the chat panel and other key interactive UI elements like focus rings or active state indicators.
- Text & Borders (#333333 & #DDDDDD): Use a dark grey for body text for high readability and a lighter grey for borders between layout sections.
- Font: 'Inter', sans-serif, for all text content (headlines and body).
- Overall Structure: The main layout in app/page.tsx will be a full-viewport flex container (className="flex h-screen bg-gray-100").
- Canvas Container: A flexible container that expands to fill available space (className="flex-grow").
- Chat Panel Container: A fixed-width container on the right side (className="w-96 flex flex-col bg-white border-l").