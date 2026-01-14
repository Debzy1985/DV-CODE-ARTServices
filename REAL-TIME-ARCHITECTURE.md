# Real-time Architecture for Live Tracking

## System Overview
The ART Services platform uses a hybrid real-time architecture combining **Supabase Realtime** for database subscriptions and **WebSockets** for bidirectional communication, enabling live GPS tracking and instant updates.

## Architecture Diagram

┌─────────────┐ WebSocket ┌─────────────┐
│ Client │◄────────────────►│ Node.js │
│ (Browser) │ Connection │ WS Server │
└─────────────┘ └─────────────┘
│ │
│ HTTP REST │ Database
│ Supabase Realtime │ Changes
▼ ▼
┌─────────────┐ ┌─────────────┐
│ Supabase │ │ PostgreSQL │
│ Client │ │ │
└─────────────┘ └─────────────┘
text


## Component Breakdown

### 1. Supabase Realtime for Database Changes
**Implementation:**
```typescript
// Frontend subscription to request status changes
import { supabase } from './lib/supabase';

const requestId = 'req_123';

const subscription = supabase
  .channel(`request-${requestId}`)
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'service_requests',
      filter: `id=eq.${requestId}`
    },
    (payload) => {
      console.log('Request updated:', payload.new);
      updateUI(payload.new);
    }
  )
  .subscribe();

2. WebSocket Server for Direct Communication

Server Implementation (Node.js with Socket.io):
javascript

// server/websocket/socketServer.js
const { Server } = require('socket.io');

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL }
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId;
    const userRole = socket.handshake.auth.role;

    // Join room for their current active request
    socket.on('join:request', (requestId) => {
      socket.join(`request:${requestId}`);
    });

    // Operator sends location updates
    socket.on('location:update', (data) => {
      const { requestId, lat, lng } = data;
      
      // Broadcast to everyone in the request room
      io.to(`request:${requestId}`).emit('operator:location', {
        lat,
        lng,
        timestamp: Date.now()
      });

      // Also store in database for history
      storeLocationUpdate(requestId, lat, lng);
    });

    // Customer can also share their location
    socket.on('customer:location', (data) => {
      io.to(`request:${data.requestId}`).emit('customer:location', data);
    });
  });

  return io;
};

3. Frontend Real-time Integration

React Hook for Real-time Features:
typescript

// src/hooks/useRealtimeTracking.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useRealtimeTracking = (requestId: string | null) => {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (!requestId) return;

    // Connect to WebSocket server
    socketRef.current = io(process.env.WS_URL, {
      auth: {
        token: localStorage.getItem('auth_token'),
        requestId
      }
    });

    // Listen for operator location updates
    socketRef.current.on('operator:location', (data) => {
      updateOperatorMarkerOnMap(data);
      calculateAndDisplayETA(data);
    });

    // Listen for request status changes
    socketRef.current.on('request:status:updated', (newStatus) => {
      showStatusNotification(newStatus);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [requestId]);

  const sendCustomerLocation = (lat: number, lng: number) => {
    socketRef.current?.emit('customer:location', {
      requestId,
      lat,
      lng
    });
  };

  return { sendCustomerLocation };
};

Data Flow for Live Tracking

    Operator updates location → WebSocket event emitted

    Server receives update → Broadcasts to all connected clients in request room

    Customer's browser receives update → Updates map marker in real-time

    Simultaneously → Update stored in database via Supabase

    Admin dashboard subscribes to database changes → Sees live status

Fallback Strategy

If WebSocket connection fails:

    Client automatically falls back to HTTP polling every 5 seconds

    Supabase Realtime continues working via PostgreSQL changes

    Connection automatically restores when network improves

Performance Considerations

    Connection Pooling: WebSocket connections are pooled and reused

    Debouncing: Location updates debounced to 2-second intervals

    Binary Data: GPS coordinates sent as binary data for efficiency

    Scale Strategy: Ready for horizontal scaling with Redis adapter
