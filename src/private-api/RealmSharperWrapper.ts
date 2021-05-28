import {OneLifeBot} from "../OneLifeBot";
import {PrivateApiDefinitions as PAD} from "./PrivateApiDefinitions";

export namespace RealmSharperWrapper {
    /**
     * Checks whether the online API is online. This should be called before any operations are done on the API.
     * @returns {Promise<boolean>} True if the API is online; false otherwise.
     */
    export async function isOnline(): Promise<boolean> {
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi + "/" + config.privateApiLinks.pingOnline;
        try {
            const resp = await OneLifeBot.AxiosClient.get<PAD.IApiStatus>(url);
            return resp.data.online;
        } catch (e) {
            return false;
        }
    }

    /**
     * Gets the proper return type. This will return the correct type if data is available and null if not.
     * @param {PrivateApiDefinitions.IRealmEyePlayerResponse} resp The response data.
     * @returns {T | null} T if the data is available. Null otherwise.
     * @private
     */
    function getProperReturnType<T extends PAD.IRealmEyePlayerResponse>(resp: PAD.IRealmEyePlayerResponse): T | null {
        return !resp.profileIsPrivate && !resp.sectionIsPrivate ? resp as T : null;
    }

    /**
     * Gets the person's name history.
     * @param {string} name The name of the person to check.
     * @returns {Promise<PrivateApiDefinitions.INameHistory | null>} The person's name history, or null if the data
     * is private.
     */
    export async function getNameHistory(name: string): Promise<PAD.INameHistory | null> {
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi + "/" + config.privateApiLinks.realmEye.nameHistory + "/" + name;
        const resp = await OneLifeBot.AxiosClient.get<PAD.INameHistory>(url);
        return getProperReturnType<PAD.INameHistory>(resp.data);
    }

    /**
     * Gets the person's rank history.
     * @param {string} name The name of the person to check.
     * @returns {Promise<PrivateApiDefinitions.IRankHistory | null>} The person's rank history, or null if the data
     * is private.
     */
    export async function getRankHistory(name: string): Promise<PAD.IRankHistory | null> {
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi + "/" + config.privateApiLinks.realmEye.rankHistory + "/" + name;
        const resp = await OneLifeBot.AxiosClient.get<PAD.IRankHistory>(url);
        return getProperReturnType<PAD.IRankHistory>(resp.data);
    }

    /**
     * Gets the person's guild history.
     * @param {string} name The name of the person to check.
     * @returns {Promise<PrivateApiDefinitions.IGuildHistory | null>} The person's guild history, or null if the data is
     * private.
     */
    export async function getGuildHistory(name: string): Promise<PAD.IGuildHistory | null> {
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi + "/" + config.privateApiLinks.realmEye.guildHistory + "/" + name;
        const resp = await OneLifeBot.AxiosClient.get<PAD.IGuildHistory>(url);
        return getProperReturnType<PAD.IGuildHistory>(resp.data);
    }

    /**
     * Gets the person's exaltation statistics.
     * @param {string} name The name of the person to check.
     * @returns {Promise<PrivateApiDefinitions.IExaltation | null>} The person's exaltation, or null if the data
     * is private.
     */
    export async function getExaltation(name: string): Promise<PAD.IExaltation | null> {
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi + "/" + config.privateApiLinks.realmEye.exaltations + "/" + name;
        const resp = await OneLifeBot.AxiosClient.get<PAD.IExaltation>(url);
        return getProperReturnType<PAD.IExaltation>(resp.data);
    }

    /**
     * Gets the person's graveyard.
     * @param {string} name The name of the person to check.
     * @param {number} [amount = 1] The number of entries to fetch.
     * @returns {Promise<PrivateApiDefinitions.IGraveyard | null>} The person's graveyard, or null if the data is
     * private.
     */
    export async function getGraveyard(name: string, amount: number = 1): Promise<PAD.IGraveyard | null> {
        if (amount > 100) amount = 100;
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi
            + "/" + config.privateApiLinks.realmEye.graveyard
            + "/" + name
            + "/" + amount;
        const resp = await OneLifeBot.AxiosClient.get<PAD.IGraveyard>(url);
        return getProperReturnType<PAD.IGraveyard>(resp.data);
    }

    /**
     * Gets the person's graveyard summary.
     * @param {string} name The name of the person to check.
     * @returns {Promise<PrivateApiDefinitions.IGraveyardSummary | null>} The person's graveyard, or null if the
     * data is private.
     */
    export async function getGraveyardSummary(name: string): Promise<PAD.IGraveyardSummary | null> {
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi
            + "/" + config.privateApiLinks.realmEye.graveyardSummary
            + "/" + name;
        const resp = await OneLifeBot.AxiosClient.get<PAD.IGraveyardSummary>(url);
        return getProperReturnType<PAD.IGraveyardSummary>(resp.data);
    }

    /**
     * Gets the person's pet yard data.
     * @param {string} name The name of the person to check.
     * @returns {Promise<PrivateApiDefinitions.IPetYard | null>} The person's pet yard, or null if the data is private.
     */
    export async function getPetYard(name: string): Promise<PAD.IPetYard | null> {
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi
            + "/" + config.privateApiLinks.realmEye.petyard
            + "/" + name;
        const resp = await OneLifeBot.AxiosClient.get<PAD.IPetYard>(url);
        return getProperReturnType<PAD.IPetYard>(resp.data);
    }

    /**
     * Gets the person's general player stats.
     * @param {string} name The name of the person to check.
     * @returns {Promise<PrivateApiDefinitions.IPlayerData | null>} The person's player stats, or null if the data
     * is empty.
     */
    export async function getPlayerInfo(name: string): Promise<PAD.IPlayerData | null> {
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi
            + "/" + config.privateApiLinks.realmEye.playerBasics
            + "/" + name;
        const resp = await OneLifeBot.AxiosClient.get<PAD.IPlayerData>(url);
        return getProperReturnType<PAD.IPlayerData>(resp.data);
    }

    /**
     * Parses a /who screenshot for names.
     * @param {{url: string}} link An object containing the URL to the screenshot.
     * @returns {Promise<string[]>} The list of names found.
     */
    export async function parseWhoScreenshot(link: { Url: string; }): Promise<string[]> {
        const config = OneLifeBot.BotInstance.config;
        const url = config.privateApiLinks.baseApi + "/raidutil/parsewho";
        const resp = await OneLifeBot.AxiosClient.get<string[]>(url, {
            data: link
        });
        return resp.data;
    }
}