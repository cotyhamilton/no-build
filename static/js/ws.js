const STATUS = {
  CONNECTING: "connecting",
  CONNECTED: "connected",
  RETRYING: "retrying",
};

/**
 * @param {number} count
 * @param {STATUS} status
 */
export const wsConnect = (count = 0, status = STATUS.CONNECTING) => {
  const ws = new WebSocket("ws://localhost:8000/ws");

  ws.onopen = (_event) => {
    status = STATUS.CONNECTED;
    document.getElementById("socket-status").innerHTML = status;
  };

  ws.onmessage = (_event) => {
    document.getElementById("server-msg-count").innerHTML = ++count;
  };

  ws.onclose = (_event) => {
    status = STATUS.RETRYING;
    console.log("WebSocket closed. Attempting to reconnect...");
    document.getElementById("socket-status").innerHTML = status;
    setTimeout(() => {
      wsConnect(count, status);
    }, 1000);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
    ws.close();
  };
};
