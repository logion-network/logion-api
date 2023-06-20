import type { DefinitionsCall } from '@polkadot/types/types';

// Custom runtime api call must be (temporarily) manually added here:
export const runtime: DefinitionsCall = {
    FeesApi: [
        {
            methods: {
                query_file_storage_fee: {
                    description: "Query expected fees for submitting given files",
                    params: [{
                        name: "numOfEntries",
                        type: "u32",
                    }, {
                        name: "totSize",
                        type: "u32",
                    }],
                    type: "Balance",
                },
                query_legal_fee: {
                    description: "Query expected legal fees for creating a LOC",
                    params: [{
                        name: "locType",
                        type: "LocType",
                    }],
                    type: "Balance",
                },
                query_certificate_fee: {
                    description: "Query expected certificate fees for creating a Collection Item",
                    params: [{
                        name: "tokenIssuance",
                        type: "TokenIssuance",
                    }],
                    type: "Balance",
                },
            },
            version: 1
        }
    ]
}
