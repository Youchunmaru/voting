<script lang="ts">

    import Candidate from "./components/Candidate.svelte";
    import {VoteEnum} from "./util/VoteEnum";
    import VotePersist from "./util/VotePersist";
    import type {Candidate as C, Vote, Voting} from "../vite-env";

    let {voting, finished} : {voting: Voting, finished: () => void} = $props()
    let voteList: Vote[] = voting.candidates.map((it : C) => {
        const vote = $state(VoteEnum.REFRAIN)
        return {name: it.name, vote: vote}
    });
    let permitted = $state(true);
    let counter = $state(voting.candidates[0].votes.length);
    const onclick = (evt: MouseEvent) => {
        voteList.forEach(vote => {
           VotePersist.persistVote(voting.name, vote);
           vote.vote = VoteEnum.REFRAIN;
        });
        counter++;
        if (voting.votes > counter){
            permitted = false;
            setTimeout(() => { permitted = true; }, 10000);
        }else {
            finished();
        }
    }

</script>


<h1>{voting.name}</h1>

{#if permitted}
<form>
{#each voteList as candidate}
    <Candidate name={candidate.name} bind:vote={candidate.vote} />
{/each}
<br>
<input {onclick} type="reset" value="Submit">
</form>
{:else}
<p>Your voting has been submitted!</p>
{/if}

