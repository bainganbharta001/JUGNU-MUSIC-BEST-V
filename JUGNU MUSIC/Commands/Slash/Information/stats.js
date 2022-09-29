const { CommandInteraction , MessageEmbed , version} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");
let os = require("os");
let cpuStat = require("cpu-stat");

module.exports = {
  name: "stats",
  description: `see stats of bot`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["EMBED_LINKS"],
  category: "Information",
  cooldown: 5,
  type: "CHAT_INPUT",
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,

  /**
   *
   * @param {JUGNU} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    cpuStat.usagePercent(function (err, percent, seconds) {
        interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.config.embed.color)
              .setAuthor({
                name: client.user.username,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
              })
              .setTitle("__**Stats:**__")
              .addField(
                "⏳ Memory Usage",
                `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                  2
                )}\` / \`${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``
              )
              .addField(
                "⌚️ Uptime ",
                `<t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>`
              )
              .addField("📁 Users", `\`${client.guilds.cache.size.reduce((a,b) => a + b.memberCount,0)}\``, true)
              .addField("📁 Servers", `\`${client.guilds.cache.size}\``, true)
              .addField("📁 Channels", `\`${client.channels.cache.size}\``, true)
              .addField("👾 Discord.js", `\`v${version}\``, true)
              .addField("🤖 Node", `\`${process.version}\``, true)
              .addField("🏓 Ping", `\`${client.ws.ping}ms\``, true)
              .addField(
                "🤖 CPU",
                `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``
              )
              .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
              .addField("🤖 Arch", `\`${os.arch()}\``, true)
              // .addField("\u200b", `\u200b`)
              .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
              .setFooter(client.getFooter(interaction.user)),
          ],
        });
      });
  },
};
