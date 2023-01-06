module.exports = async function (msg) {
  const d = await this.db.get(`${this.user.username}:${msg.guildId}:${msg.channelId}`)
  if (!d || d.time < 0) return
  setTimeout(() => {
    msg.delete()
  }, time * 1000);
}