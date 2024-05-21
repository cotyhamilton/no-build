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
  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsHost = window.location.hostname;
  const wsPort = window.location.port ? `:${window.location.port}` : "";
  const wsUrl = `${wsProtocol}//${wsHost}${wsPort}/ws`;
  const ws = new WebSocket(wsUrl);
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
