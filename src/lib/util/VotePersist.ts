import type {Vote, Voting} from "../../vite-env";

export default class VotePersist {

    private static readonly VOTING_LIST: string = "VotingList";

    static persistVote(voting: string, vote: Vote){
        const store = localStorage.getItem(voting);
        if (store){
            const persistedVoting = <Voting>(JSON.parse(store));
            const candidate = persistedVoting.candidates.find(candidate => candidate.name === vote.name);
            if (candidate){
                candidate.votes.push(vote.vote);
                candidate.votes.sort((a,b) => {
                    return a.localeCompare(b);//ensure that we don't know the order of the voting - protects the secrecy of the voter
                })
                localStorage.setItem(voting, JSON.stringify(persistedVoting));
                return true;
            }else{
                return false;
            }
        }else {
            return false;
        }
    }

    static persistVoting(voting: string, candidates: string[], votes: number){
        const store = localStorage.getItem(voting);
        if (store){
            return false;
        }
        const persist: Voting = {
            name: voting,
            candidates: candidates.map(it => {return {name: it, votes: []}}),
            votes: votes
        };
        localStorage.setItem(voting, JSON.stringify(persist));
        VotePersist.addVoting(voting);
        return true;
    }

    static getVoting(voting: string){
        const store = localStorage.getItem(voting);
        if (store){
            return <Voting>(JSON.parse(store));
        }
    }

    static getVotingList(){
        const store = localStorage.getItem(VotePersist.VOTING_LIST);
        const votingList: Voting[] = [];
        if (store){
            const votingNameList = <string[]>(JSON.parse(store));
            votingNameList.forEach(votingName => {
                const voting = VotePersist.getVoting(votingName);
                if (voting){
                    votingList.push(voting);
                }
            });
        }
        return votingList;
    }

    private static addVoting(voting: string){
        const store = localStorage.getItem(VotePersist.VOTING_LIST);
        if (store){
            const votingList = <string[]>(JSON.parse(store));
            votingList.push(voting);
            localStorage.setItem(VotePersist.VOTING_LIST, JSON.stringify(votingList));
        }else{
            localStorage.setItem(VotePersist.VOTING_LIST, JSON.stringify([voting]));
        }
    }
}