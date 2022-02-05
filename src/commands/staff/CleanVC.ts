import {ArgumentType, BaseCommand, ICommandContext, ICommandInfo} from "../BaseCommand";
import {VoiceChannel} from "discord.js";
import {GlobalFgrUtilities} from "../../utilities/fetch-get-request/GlobalFgrUtilities";
import {Logger} from "../../utilities/Logger";
import {DungeonUtilities} from "../../utilities/DungeonUtilities";
const LOGGER: Logger = new Logger(__filename, false);
export class CleanVC extends BaseCommand {
    public constructor() {
        const cmi: ICommandInfo = {
            cmdCode: "CLEAN_VC_CMD",
            formalCommandName: "Clean VC",
            botCommandName: "clean",
            description: "Removes all members from a VC.",
            rolePermissions: [
                "Security",
                "Officer",
                "Moderator",
                "RaidLeader",
                "HeadRaidLeader",
                "VeteranRaidLeader"
            ],
            generalPermissions: [],
            botPermissions: ["MOVE_MEMBERS"],
            commandCooldown: 3 * 1000,
            argumentInfo: [
                {
                    displayName: "VC to Remove Members from",
                    argName: "vc",
                    desc: "The voice channel that should be cleaned.",
                    type: ArgumentType.Channel,
                    prettyType: "Voice Channel",
                    required: true,
                    example: ["Raid 1"]
                }
            ],
            guildOnly: true,
            botOwnerOnly: false
        };

        super(cmi);
    }

    /**
     * @inheritDoc
     */
    public async run(ctx: ICommandContext): Promise<number> {
        const guildDoc = ctx.guildDoc;
        const channel = ctx.interaction.options.getChannel("vc", true);
        const member = ctx.member;

        if(!member) {
            await ctx.interaction.reply({
                content: "An unknown error occurred.",
                ephemeral: true
            });
            return -1;   
        }

        if(!guildDoc) {
            await ctx.interaction.reply({
                content: "An unknown error occurred.",
                ephemeral: true
            });
            return -1;   
        }

        if (!(channel instanceof VoiceChannel)) {
            await ctx.interaction.reply({
                content: "You must select a voice channel for this to work.",
                ephemeral: true
            });
            return -1;
        }
                
        LOGGER.info(`${member.displayName} used CleanVC on ${channel}`);
        await ctx.interaction.deferReply();

        let ct = 0;
        const teamRoleId = guildDoc.roles.staffRoles.teamRoleId;

        await Promise.all(
            channel.members.map(async x => {
                await GlobalFgrUtilities.tryExecuteAsync(async () => {
                    // Do not clean staff members
                    if (x.roles.cache.has(teamRoleId)) {
                        return;
                    }
                    await x.voice.disconnect();
                    ct++;
                });
            })
        );
        
        LOGGER.info(`${ctx.member?.displayName} used CleanVC to remove ${ct} users from ${channel}`);
        await ctx.interaction.editReply({
            content: `Disconnected ${ct} members from ${channel}.`
        });

        return 0;
    }
}