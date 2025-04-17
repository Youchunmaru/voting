<script lang="ts">
  import VotingCreation from "./lib/VotingCreation.svelte";
  import VotePersist from "./lib/util/VotePersist";
  import type {Voting as V} from "./vite-env";
  import Voting from "./lib/Voting.svelte";
  import {VoteEnum} from "./lib/util/VoteEnum";

  let votingList = $state(VotePersist.getVotingList());

  let voteInProgress: V | undefined = $state();
  const startVoting = (voting: V) => {
    return function (evt: MouseEvent) {
      voteInProgress = voting;
    }
  }

  const finished = () => {
    if (voteInProgress){
      voteInProgress = undefined;
      votingList = VotePersist.getVotingList();
    }
  }

  const onCreation = () => {
    votingList = VotePersist.getVotingList();
    isCreating = false;
  }

  const createNewVoting = function (evt: MouseEvent) {
    isCreating = true;
  }

  const isVotingFinished = function (voting: V) {
    return voting.votes <= voting.candidates[0].votes.length;
  }

  let isCreating = $state(false);

</script>

<main>

{#if voteInProgress}
  <Voting voting={voteInProgress} {finished}/>
  {:else if isCreating}
    <VotingCreation {onCreation}/>
  {:else}
  <div class="votingList">
    {#each votingList as voting}
      {#if isVotingFinished(voting)}
        <div class="voting-result">
          <p>Voting-Name: {voting.name}</p>
          <p>Votes: {voting.votes}</p>
          {#each voting.candidates as candidate}
            <div class="candidate-result">
              <p>{candidate.name}</p>
              <p>: </p>
              <p>{candidate.votes.filter(vote => vote === VoteEnum.YES).length}</p>
              <p> / </p>
              <p>{candidate.votes.filter(vote => vote === VoteEnum.NO).length}</p>
              <p> / </p>
              <p>{candidate.votes.filter(vote => vote === VoteEnum.REFRAIN).length}</p>
            </div>
          {/each}
        </div>
      {:else}
        <div class="voting-open">
          <p>Voting-Name: {voting.name}</p>
          <p>Votes: {voting.candidates[0].votes.length} / {voting.votes}</p>
          <button onclick={startVoting(voting)}>Resume</button>
        </div>
      {/if}
    {/each}
  </div>
  <button onclick={createNewVoting}>Create new voting</button>
{/if}


</main>

<style>
.votingList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.voting-result {
  display: grid;
  grid-template-columns: 1fr;
  background-color: #1a1a1a;
  border-radius: 1em;
  margin: 1em;
  padding: 1em;
  text-align: left;
}
.candidate-result {
  display: grid;
  grid-auto-flow: column;
}
.voting-open {
  display: grid;
  grid-template-columns: 1fr;
  text-align: left;
  margin: 1em;
  padding: 1em;
  border-radius: 1em;
  border-color: #646cff;
  border-style: solid;
  border-width: 1px;
}
</style>
