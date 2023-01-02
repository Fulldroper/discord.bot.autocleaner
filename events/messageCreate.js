module.exports = async function (msg) {
  const {time = -1} = await this.db.get(`${this.user.username}:${msg.guildId}:${msg.channelId}`)
  if (time < 0) return
  setTimeout(() => {
    msg.delete()
  }, time * 1000);
}