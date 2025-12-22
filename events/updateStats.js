require('dotenv').config();
const { Events } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        if (message.channel.id !== process.env.CHANNEL_ID) return;

        for (const attachment of message.attachments.values()) {
            const response = await fetch(attachment.url);
            const buffer = Buffer.from(await response.arrayBuffer());
            const imagePath = `./image/${attachment.name}`;

            fs.writeFileSync(imagePath, buffer);

            const analysisResponse = await LeagueScoreboardAnalyzer(imagePath);
            
            console.log(analysisResponse);
        }
    },
};