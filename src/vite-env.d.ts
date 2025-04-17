/// <reference types="svelte" />
/// <reference types="vite/client" />

import type {VoteEnum} from "./lib/util/VoteEnum";

interface Vote{
    name: string;
    vote: VoteEnum;
}

interface Voting{
    name: string;
    candidates: Candidate[];
    votes: number;
}

interface Candidate{
    name: string;
    votes: VoteEnum[]
}