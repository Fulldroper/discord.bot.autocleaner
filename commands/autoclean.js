const MAX_TIME = 7440

module.exports.info = {
  "name": "autoclean",
  "dm_permission": false,
  "type": 1,
  "description": "Вибрати канал для публікації пропозицій",
  "options": [{
    "name": "channel",
    "description": "Текстовий канал",
    "type": 7,
    "channel_types": 0,
    "required": true
  }, {
    "name": "time",
    "description": `Час очищення в секундах від 0 (одразу) до ${MAX_TIME.declension({
      one: "секунда",
      few: "секунди",
      many: "секунд"
    })}`,
    "type": 3,
    "channel_types": 0,
    "required": true
  }]
}

module.exports.run = async function(interaction) {
  if (interaction.member.permissions.serialize().Administrator) {
    const channel = interaction.options.get("channel").value
    const time = Number(interaction.options.get("time").value)
    // fix negative value
    time < 0 && (time = 0)
    // fix bigger value
    time > MAX_TIME && (time = MAX_TIME)
    // save in db
    this.db.set(`${this.user.username}:${interaction.guildId}:${channel}`, {channel, time})
    // alert
    interaction.reply({ content: `⏱️ У каналі <#${channel}>, встановлено очищення через ${time.declension({
      one: "секунда",
      few: "секунди",
      many: "секунд"
    })}.`, ephemeral: true }).catch(e => console.error(e));
  } else interaction.reply({ content: '❌ Ви маєте мати права адміністратора', ephemeral: true }).catch(e => console.error(e));
}