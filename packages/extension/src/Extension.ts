import { web3AccountsSubscribe, web3Enable, isWeb3Injected, web3Accounts } from '@polkadot/extension-dapp';
import initMetaMask from "@polkadot/extension-compat-metamask/bundle";
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types';

export function isExtensionAvailable(): boolean {
    return isWeb3Injected;
}

export type InjectedAccount = InjectedAccountWithMeta;

type InjectedAccountsConsumer = (accounts: InjectedAccount[]) => void;

type InjectedAccountsConsumerRegister = (consumer: InjectedAccountsConsumer) => void;

export async function enableExtensions(appName: string): Promise<InjectedAccountsConsumerRegister> {
    await web3Enable(appName);
    return consumer => web3AccountsSubscribe(consumer);
}

export async function enableMetaMask(appName: string): Promise<boolean> {
    const injectedExtensions: InjectedExtension[] = await web3Enable(appName, [ initMetaMask ]);
    return injectedExtensions.find(injectedExtension => injectedExtension.name === "Web3Source") !== undefined
}

export async function allMetamaskAccounts(): Promise<InjectedAccount[]> {
    return await web3Accounts({ accountType: [ "ethereum" ] })
}
