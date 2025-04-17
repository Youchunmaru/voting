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

<div class="vote">
    <h1>{voting.name}</h1>

    {#if permitted}
    <form>
    {#each voteList as candidate}
        <Candidate name={candidate.name} bind:vote={candidate.vote} />
    {/each}
    <br>
        <button {onclick}>Submit</button>
    </form>
    {:else}
    <p>Your voting has been submitted!</p>
    {/if}
</div>

<style>
    .vote {
        display: grid;
        grid-template-columns: 1fr;
        margin: 1em;
        padding: 1em;
        border-radius: 1em;
        border-color: #646cff;
        border-style: solid;
        border-width: 1px;
    }
</style>
