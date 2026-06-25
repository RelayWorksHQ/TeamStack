"use client";

const CHANNEL_NAME = "teamstack-hub-chat";

export function createHubChatTransport(onEvent) {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) {
    return { publish() {}, close() {} };
  }

  const channel = new BroadcastChannel(CHANNEL_NAME);
  channel.onmessage = ({ data }) => onEvent(data);

  return {
    publish(event) {
      channel.postMessage(event);
    },
    close() {
      channel.close();
    }
  };
}

// Swap this adapter for a WebSocket, Supabase Realtime, or hosted pub/sub
// client when a backend is connected. The UI only depends on publish/events.
