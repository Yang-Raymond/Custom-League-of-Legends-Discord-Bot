const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder().setName('stats').setDescription('Get player\'s stats!').addStringOption(option =>
        option.setName('username')
            .setDescription('The username of the player')
            .setRequired(true)),
    async execute(interaction) {
        const stats = JSON.parse(fs.readFileSync('stats.json'));
        stats.forEach(player => {
            if (player.username === interaction.options.getString('username')) {
                interaction.reply(`Stats for **${player.username}**:\nWins: ${player.wins}\nLosses: ${player.losses}\nGames Played: ${player.wins + player.losses}\nWinrate: ${(player.wins / (player.wins + player.losses) * 100).toFixed(2)}%\nKills: ${player.kills}\nDeaths: ${player.deaths}\nAssists: ${player.assists}\nKA/D: ${((player.kills + player.assists) / player.deaths).toFixed(2)}`);
                return;
            } else {
                interaction.reply(`Player ${interaction.options.getString('username')} not found.`);
            }
        });
    }
}