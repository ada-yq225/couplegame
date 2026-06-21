const Voice = {
  _last: 0,

  isOn() {
    return profile.voiceEnabled !== false;
  },

  speak(text, priority = false) {
    if (!this.isOn() || !window.speechSynthesis) return;
    const now = Date.now();
    if (!priority && now - this._last < 800) return;
    this._last = now;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.92;
    u.pitch = 1.05;
    const voices = speechSynthesis.getVoices();
    const zh = voices.find((v) => v.lang.includes("zh"));
    if (zh) u.voice = zh;
    speechSynthesis.speak(u);
  },

  timerStart(sec) {
    this.speak(`限时 ${sec} 秒，开始`, true);
  },

  timerTick(n) {
    if (n === 10) this.speak("还剩十秒");
    else if (n <= 5 && n > 0) this.speak(String(n));
    else if (n === 0) this.speak("时间到", true);
  },

  roundStart(tag) {
    if (tag) this.speak(tag);
  },

  bossAlert() {
    this.speak("Boss 战", true);
  },

  pkJudge() {
    this.speak("谁更猛");
  },

  event(name) {
    this.speak(`随机事件，${name}`);
  },
};

if (window.speechSynthesis) {
  speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
}