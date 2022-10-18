export interface UserIdentity {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
    company: boolean
}

export interface PostalAddress {
    line1: string,
    line2: string,
    postalCode: string,
    city: string,
    country: string
}

export interface LegalOfficerPostalAddress extends PostalAddress {
    company: string,
}

export interface LegalOfficer {
    userIdentity: UserIdentity;
    postalAddress: LegalOfficerPostalAddress;
    address: string;
    additionalDetails: string;
    node: string;
    name: string;
    logoUrl: string;
}

export type Language = 'en' | 'fr';
