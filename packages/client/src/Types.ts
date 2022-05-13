export interface UserIdentity {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

export interface PostalAddress {
    company?: string,
    line1: string,
    line2: string,
    postalCode: string,
    city: string,
    country: string
}

export interface LegalOfficer {
    userIdentity: UserIdentity;
    postalAddress: PostalAddress;
    address: string;
    additionalDetails: string;
    node: string;
    name: string;
    logoUrl: string;
}
