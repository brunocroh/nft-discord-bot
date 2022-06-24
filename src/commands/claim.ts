import { SlashCommandBuilder } from '@discordjs/builders'
import { setTimeout as wait } from 'node:timers/promises'

import { ICommand } from '../interfaces/ICommand'
import { isValidAddress } from '../utils/isValidAddress';

export const claim: ICommand = {
  data: new SlashCommandBuilder()
    .setName('claim')
    .setDescription('Claim your NFT')
    .addStringOption(
      (option) =>
        option.setName('address')
          .setDescription('Wallet address of user')
          .setRequired(true)
    ),
  run: async (interaction) => {
      if (!interaction.isCommand()) return

      const { commandName } = interaction

      if (commandName === 'claim') {

        const address = interaction.options.getString('address') || ''

        const addressIsValid = isValidAddress(address)

        if (!addressIsValid) {
          console.log(`Invalid wallet address: ${address}`)
          return await interaction.reply({ content: 'Invalid wallet address', ephemeral: true })
        }

        console.log({
          command: 'claim',
          address: address,
          addressIsValid,
          /* tslint:disable-next-line */
          roles: (interaction?.member?.roles as any).member.roles.cache.map((r: any) => r.name),
        })

        await interaction.reply({ content: 'Processing your claim...', ephemeral: true })
        await wait(2000)
        await interaction.editReply('Your claim is done, see txns: blahblahblah');
      }
  }
}
