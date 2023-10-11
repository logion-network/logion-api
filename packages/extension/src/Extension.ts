import { web3AccountsSubscribe, web3Enable, web3EnablePromise, web3Accounts } from '@polkadot/extension-dapp';
import initMetaMask from "@polkadot/extension-compat-metamask/bundle";
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types';

export async function isExtensionAvailable(appName: string): Promise<boolean> {
    const extensions = await web3Enable(appName);
    return extensions.length > 0;
}

export type InjectedAccount = InjectedAccountWithMeta;

export type InjectedAccountsConsumer = (accounts: InjectedAccount[]) => void;

export type InjectedAccountsConsumerRegister = (consumer: InjectedAccountsConsumer) => void;

export async function enableExtensions(appName: string, extensions?: string[]): Promise<InjectedAccountsConsumerRegister> {
    const extensionsList =
        web3EnablePromise === null ?
        await web3Enable(appName) :
        await web3EnablePromise;
    if (extensionsList === null || extensionsList.length === 0) {
        throw new Error("Failed to detect any web3 extensions");
    }
    return consumer => web3AccountsSubscribe(consumer, { extensions });
}

export const META_MASK_NAME = "Web3Source";

export async function enableMetaMask(appName: string): Promise<boolean> {
    const injectedExtensions: InjectedExtension[] = await web3Enable(appName, [ initMetaMask ]);
    return injectedExtensions.find(injectedExtension => injectedExtension.name === META_MASK_NAME) !== undefined
}

export async function allMetamaskAccounts(): Promise<InjectedAccount[]> {
    return await web3Accounts({ accountType: [ "ethereum" ] })
}
