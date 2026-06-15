import * as roll from '../commands/roll.js';
import * as lotto from '../commands/lotto.js';
import * as exchange from '../commands/exchangeRate.js';
import * as tests from '../commands/test-commands.js';
import * as setChannel from '../commands/set-channel.js';
import * as exporter from '../commands/export-video.js';

export async function handleCommand(interaction){

    const { commandName } = interaction;

    if (commandName === 'test') {
        await tests.humbleTest(interaction)
    }

    if (commandName === 'lotto') {
        await lotto.generateLottoNumbers(interaction);
    }
    if (commandName === 'roll') {
        await roll.rollTheDice(interaction)
    }

    if (commandName === 'exchange') {
        await exchange.getExchangeRate(interaction)
    }

    if (commandName === 'set-channel'){
        await setChannel.setDefaultNotificationChannel(interaction)
    }

    if (commandName === 'export') {
        await exporter.extractVideoLink(interaction);
    }

}