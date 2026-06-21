const RoomSync = {
  peer: null,
  conn: null,
  role: null,
  roomCode: null,
  connected: false,
  _applying: false,

  genCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  },

  peerId(code) {
    return `miyu-${code}`;
  },

  setStatus(text, ok) {
    const el = $("#sync-status");
    if (!el) return;
    el.textContent = text;
    el.classList.toggle("online", !!ok);
    el.classList.remove("hidden");
  },

  hideStatus() {
    $("#sync-status")?.classList.add("hidden");
  },

  destroy() {
    this.conn?.close();
    this.peer?.destroy();
    this.conn = null;
    this.peer = null;
    this.role = null;
    this.roomCode = null;
    this.connected = false;
    this.hideStatus();
  },

  createRoom(code) {
    return new Promise((resolve, reject) => {
      this.destroy();
      this.role = "host";
      this.roomCode = code || this.genCode();
      const id = this.peerId(this.roomCode);

      if (typeof Peer === "undefined") {
        reject(new Error("no_peer"));
        return;
      }

      this.peer = new Peer(id, { debug: 0 });
      this.peer.on("open", () => {
        this.setStatus(`同房 ${this.roomCode} · 等待加入`, false);
        resolve(this.roomCode);
      });
      this.peer.on("connection", (c) => {
        this.conn = c;
        this.bindConn();
        this.setStatus(`同房 ${this.roomCode} · 已连接`, true);
        unlockAchievement("sync_room");
        onSyncPeerConnected?.();
        this.broadcast();
      });
      this.peer.on("error", (e) => reject(e));
    });
  },

  joinRoom(code) {
    return new Promise((resolve, reject) => {
      this.destroy();
      this.role = "guest";
      this.roomCode = code.toUpperCase().trim();
      if (typeof Peer === "undefined") {
        reject(new Error("no_peer"));
        return;
      }
      this.peer = new Peer(undefined, { debug: 0 });
      this.peer.on("open", () => {
        this.conn = this.peer.connect(this.peerId(this.roomCode), { reliable: true });
        this.bindConn();
        this.setStatus(`同房 ${this.roomCode} · 连接中…`, false);
      });
      this.peer.on("error", () => reject(new Error("join_fail")));
      setTimeout(() => {
        if (!this.connected) reject(new Error("timeout"));
      }, 12000);
      this._joinResolve = resolve;
    });
  },

  bindConn() {
    if (!this.conn) return;
    this.conn.on("open", () => {
      this.connected = true;
      if (this.role === "guest" && this._joinResolve) {
        this._joinResolve();
        this._joinResolve = null;
        this.setStatus(`同房 ${this.roomCode} · 已同步`, true);
      }
      if (this.role === "host") this.broadcast();
    });
    this.conn.on("data", (data) => this.onMessage(data));
    this.conn.on("close", () => {
      this.connected = false;
      this.setStatus("连接断开", false);
    });
  },

  onMessage(data) {
    if (!data || this._applying) return;
    if (data.type === "state" && this.role === "guest") {
      applySyncState?.(data.payload);
    }
    if (data.type === "action" && this.role === "host") {
      if (data.action === "done") onDone?.();
      if (data.action === "skip") onSkip?.();
      if (data.action === "flip") flipCard?.();
      if (data.action === "roll") rollDice?.();
      if (data.action === "spin") spinWheel?.();
      if (data.action === "mystery") pickMystery?.(data.value);
      if (data.action === "pk") resolvePk?.(data.value);
      if (data.action === "chapter_start") { showScreen?.("game", true); startRound?.(); }
      if (data.action === "next_chapter") $("#btn-next-chapter")?.click();
    }
  },

  broadcast() {
    if (this.role !== "host" || !this.connected || !this.conn?.open) return;
    if (typeof buildSyncPayload !== "function") return;
    this.conn.send({ type: "state", payload: buildSyncPayload() });
  },

  sendAction(action, value) {
    if (this.role !== "guest" || !this.connected) return;
    this.conn?.send({ type: "action", action, value });
  },

  isGuest() {
    return this.role === "guest";
  },

  isHost() {
    return this.role === "host";
  },

  isActive() {
    return !!this.role && this.connected;
  },
};