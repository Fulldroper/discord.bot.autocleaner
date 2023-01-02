module.exports.info = {
  "name": "disable",
  "dm_permission": false,
  "type": 1,
  "description": "Вибрати канал для анулювання автоочищення",
  "options": [{
    "name": "channel",
    "description": "Текстовий канал",
    "type": 7,
    "channel_types": 0,
    "required": true
  }]
}

module.exports.run = async function(interaction) {
  if (interaction.member.permissions.serialize().Administrator) {
    const channel = interaction.options.get("channel").value
    // save in db
    this.db.clear(`${this.user.username}:${interaction.guildId}:${channel}`)
    // alert
    interaction.reply({ content: `⏱️ У каналі <#${channel}>, анулюванно очищення.`, ephemeral: true }).catch(e => console.error(e));
  } else interaction.reply({ content: '❌ Ви маєте мати права адміністратора', ephemeral: true }).catch(e => console.error(e));
}