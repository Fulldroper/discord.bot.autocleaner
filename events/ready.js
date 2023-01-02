module.exports = async function () {
  this.db.connect()
  let users_counter = 0
  
  await this.guilds.cache.forEach(async s => users_counter += s.memberCount )
  
  this.users_counter = users_counter
  
  // this.web = this.addons["httpPage"]
  // this.web(process.env.PORT || 80)

  console.log('[start] as ', this.user.tag, " at ", new Date);
  console.log(`[Addons](${Object.keys(this.addons).length}):`, Object.keys(this.addons))
  console.log(`[Commands](${Object.keys(this.cmds).length}):`, Object.keys(this.cmds));
  console.log(`[Servers](${this.guilds.cache.size})`);
  console.log(`[Users](${users_counter})`);
}