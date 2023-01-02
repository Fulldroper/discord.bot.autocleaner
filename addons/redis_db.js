module.exports = class {
  constructor(url) {
    try {
      this.obj = require('redis').createClient({url})
    } catch (error) {
      console.log('!!redis module not found!!');
    }
  
    this.isConnected = false
    
    this.obj.on("connect", () => console.log('[redis]: connected'))
    this.obj.on("ready", () => console.log('[redis]: ready'))
    this.obj.on("end", () => console.log('[redis]: connection closed'))
    this.obj.on("error", e => console.log('[redis-error]: ', e))
    this.obj.on("reconnecting", () => console.log('[redis]: reconnecting'))
  }
  async get(key) {
    return JSON.parse(await this.obj.get(key))
  }
  async set(key, value) {
    const o = JSON.parse(await this.obj.get(key)) || {};

    for (const key in value) {
      o[key] = value[key]
    }

    this.obj.set(key, JSON.stringify(o))
  }
  connect() {
    if (this.isConnected) return;
    this.obj.connect()
    this.isConnected = true
  }
}