const fs = require('fs');
const path = require('path');

function updateStats(analysisResponse) {
    const statsPath = path.join(__dirname, '..', 'stats.json');
    
    // Read existing stats
    let existingStats = [];
    if (fs.existsSync(statsPath)) {
        const data = fs.readFileSync(statsPath, 'utf8');
        existingStats = JSON.parse(data);
    }

    // Update stats for each player in the response
    for (const player of analysisResponse) {
        const existingPlayer = existingStats.find(
            s => s.username.toLowerCase() === player.username.toLowerCase()
        );

        if (existingPlayer) {
            // Update existing player stats
            existingPlayer.kills += player.kills;
            existingPlayer.deaths += player.deaths;
            existingPlayer.assists += player.assists;
            existingPlayer.wins += player.win ? 1 : 0;
            existingPlayer.losses += player.win ? 0 : 1;
        } else {
            // Add new player
            existingStats.push({
                username: player.username,
                kills: player.kills,
                deaths: player.deaths,
                assists: player.assists,
                wins: player.win ? 1 : 0,
                losses: player.win ? 0 : 1
            });
        }
    }

    // Write updated stats back to file
    fs.writeFileSync(statsPath, JSON.stringify(existingStats, null, 4), 'utf8');
    
    return existingStats;
}

module.exports = { updateStats };