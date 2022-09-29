const { mongodb } = require("../settings/config");
const Josh = require("@joshdb/core");
// enable it if using mongo db
// const provider = require("@joshdb/mongo");
const { Client } = require("discord.js");
const provider = require("@joshdb/json");

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  // music
  client.music = new Josh({
    name: "music",
    provider: provider,
    providerOptions: {
      url: mongodb,
      collection: "music",
      dbName: client.user.username.replace(" ", ""),
    },
  });
  // queue
  client.queue = new Josh({
    name: "queue",
    provider: provider,
    providerOptions: {
      url: mongodb,
      collection: "queue",
      dbName: client.user.username.replace(" ", ""),
    },
  });
  // autoresume
  client.autoresume = new Josh({
    name: "autoresume",
    provider: provider,
    providerOptions: {
      url: mongodb,
      collection: "autoresume",
      dbName: client.user.username.replace(" ", ""),
    },
  });

  // delete data if guild left
  client.on("guildDelete", async (guild) => {
    if (!guild) return;
    let music = await client.music.get(guild.id);
    if (!music) return;
    let requestchannel = guild.channels.cache.get(music?.music.channel);
    if (requestchannel) {
      await requestchannel.delete(`reset setting`).catch((e) => null);
    }
    await client.music.delete(guild.id);
  });
};
