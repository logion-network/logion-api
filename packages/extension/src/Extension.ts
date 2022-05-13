import { web3AccountsSubscribe, web3Enable, isWeb3Injected } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

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
