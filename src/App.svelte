<script lang="ts">
  import VotingCreation from "./lib/VotingCreation.svelte";
  import VotePersist from "./lib/util/VotePersist";
  import type {Voting as V} from "./vite-env";
  import Voting from "./lib/Voting.svelte";

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
  }

</script>

<main>
  {#if voteInProgress}
    <Voting voting={voteInProgress} {finished}/>
  {:else}
    {#each votingList as voting}
      {#if voting.votes > voting.candidates[0].votes.length}
        <button onclick={startVoting(voting)}>{voting.name} - {voting.candidates[0].votes.length} / {voting.votes}</button>
      {:else}
        <p>{voting.name} - Finished</p>
      {/if}
    {/each}
    <VotingCreation {onCreation}/>
  {/if}

</main>

<style>

</style>
